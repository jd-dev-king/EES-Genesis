export class DiscoverySystem {
  constructor(
    zones,
    robot,
    interfaceManager,
    initialDiscoveredIds = null,
    hiddenObjectsSystem = null,
    initialArtifactIds = []
  ) {
    this.zones = zones;
    this.robot = robot;
    this.interface = interfaceManager;
    this.hiddenObjectsSystem =
      hiddenObjectsSystem;

    this.discovered = new Set(
      initialDiscoveredIds &&
      initialDiscoveredIds.length
        ? initialDiscoveredIds
        : zones
            .filter(
              (zone) =>
                zone.initiallyDiscovered
            )
            .map((zone) => zone.id)
    );

    this.discoveredArtifacts = new Set(
      initialArtifactIds || []
    );

    this.scanTarget = null;
    this.nearestScannable = null;
    this.nearestScannableDistance = Infinity;
    this.scanProgress = 0;
    this.scanDuration = 2.4;
    this.destinationScanRange = 260;
    this.scannerMode = "SIGNAL";

    this.onDiscoveryCompleted = null;
    this.onDiscoveryStateChanged = null;
    this.onArtifactDiscovered = null;
    this.onArtifactStateChanged = null;

    if (this.hiddenObjectsSystem) {
      this.hiddenObjectsSystem.restoreDiscovered(
        [...this.discoveredArtifacts]
      );
    }

    this.refreshInterface();
  }

  refreshInterface() {
    this.interface.updateDiscoveryCount(
      this.discovered.size,
      this.zones.length
    );

    this.interface.applyDiscoveryState(
      this.discovered
    );

    const totalArtifacts =
      this.hiddenObjectsSystem
        ? this.hiddenObjectsSystem
            .getScannables().length
        : 0;

    this.interface.updateArtifactCount(
      this.discoveredArtifacts.size,
      totalArtifacts
    );

    if (this.hiddenObjectsSystem) {
      this.interface.updateArtifactArchive(
        this.hiddenObjectsSystem
          .getScannables(),
        this.discoveredArtifacts
      );
    }
  }

  setScannerMode(mode) {
    this.scannerMode = mode;
    this.updateNearestScannable();
  }

  modeAcceptsTarget(target) {
    if (!target) return false;

    if (this.scannerMode === "SIGNAL") {
      return target.kind === "destination";
    }

    if (this.scannerMode === "ARTIFACT") {
      return target.kind === "artifact";
    }

    if (this.scannerMode === "ENGINEERING") {
      return (
        target.kind === "artifact" &&
        [
          "ENGINEERING BEACON",
          "ENGINEERING BLUEPRINT",
          "ACCESS KEY"
        ].includes(target.data.category)
      );
    }

    if (this.scannerMode === "ENERGY") {
      return (
        target.kind === "artifact" &&
        target.data.category === "CORE ARTIFACT"
      );
    }

    if (this.scannerMode === "STRUCTURAL") {
      return (
        target.kind === "artifact" &&
        [
          "DATA FRAGMENT",
          "LEADERSHIP ARCHIVE"
        ].includes(target.data.category)
      );
    }

    return true;
  }

  update(delta, inputManager) {
    this.updateNearestScannable();

    this.interface.updateScannerAvailability(
      this.nearestScannable,
      this.nearestScannableDistance,
      this.getTargetScanRange(
        this.nearestScannable
      ),
      Boolean(this.scanTarget)
    );

    if (
      inputManager.consumePress("KeyF")
    ) {
      this.requestScan();
    }

    if (!this.scanTarget) {
      return;
    }

    this.scanProgress = Math.min(
      this.scanProgress +
        delta / this.scanDuration,
      1
    );

    this.interface.updateScanProgress(
      this.scanTarget,
      this.scanProgress
    );

    if (this.scanProgress >= 1) {
      this.completeScan();
    }
  }

  getTargetScanRange(target) {
    if (!target) {
      return this.destinationScanRange;
    }

    return target.kind === "artifact"
      ? target.data.scanRange
      : this.destinationScanRange;
  }

  updateNearestScannable() {
    const position =
      this.robot.getPosition();

    let nearest = null;
    let nearestDistance = Infinity;

    this.zones.forEach((zone) => {
      if (this.discovered.has(zone.id)) {
        return;
      }

      const candidate = {
        id: zone.id,
        title: zone.signalName ||
          "Unknown Signal",
        kind: "destination",
        position: zone.position
          .clone()
          .add(zone.landingOffset),
        data: zone
      };

      if (!this.modeAcceptsTarget(candidate)) {
        return;
      }

      const landingPoint = zone.position
        .clone()
        .add(zone.landingOffset);

      const distance =
        position.distanceTo(landingPoint);

      if (distance < nearestDistance) {
        nearest = candidate;

        nearestDistance = distance;
      }
    });

    if (this.hiddenObjectsSystem) {
      this.hiddenObjectsSystem
        .getScannables()
        .forEach((artifact) => {
          if (
            this.discoveredArtifacts.has(
              artifact.id
            )
          ) {
            return;
          }

          const candidate = {
            id: artifact.id,
            title: "Hidden Object",
            kind: "artifact",
            position: artifact.position,
            data: artifact
          };

          if (!this.modeAcceptsTarget(candidate)) {
            return;
          }

          const distance =
            position.distanceTo(
              artifact.position
            );

          if (distance < nearestDistance) {
            nearest = candidate;

            nearestDistance = distance;
          }
        });
    }

    this.nearestScannable = nearest;
    this.nearestScannableDistance =
      nearestDistance;
  }

  requestScan() {
    if (this.scanTarget) {
      this.interface.showGuide(
        "Scanner busy",
        "The current scan is still in progress."
      );
      return false;
    }

    this.updateNearestScannable();

    if (!this.nearestScannable) {
      this.interface.showGuide(
        "Scanner sweep clear",
        "No undiscovered signals or hidden objects are currently detectable."
      );
      return false;
    }

    const scanRange =
      this.getTargetScanRange(
        this.nearestScannable
      );

    if (
      this.nearestScannableDistance >
      scanRange
    ) {
      this.interface.showGuide(
        "Signal outside scanner range",
        `${Math.round(
          this.nearestScannableDistance
        )} units away. Move within ${
          scanRange
        } units to scan.`
      );

      this.interface.setScannerStatus(
        "OUT OF RANGE"
      );

      return false;
    }

    this.scanTarget =
      this.nearestScannable;

    this.scanProgress = 0;

    this.interface.openScan(
      this.scanTarget
    );

    this.interface.setScannerStatus(
      "SCANNING"
    );

    return true;
  }

  completeScan() {
    const target = this.scanTarget;

    if (!target) {
      return;
    }

    if (target.kind === "destination") {
      this.completeDestinationScan(
        target.data
      );
    } else {
      this.completeArtifactScan(
        target.data
      );
    }

    this.scanTarget = null;
    this.scanProgress = 0;

    this.updateNearestScannable();

    window.setTimeout(() => {
      this.interface.setScannerStatus(
        "STANDBY"
      );
    }, 1600);
  }

  completeDestinationScan(zone) {
    this.discovered.add(zone.id);
    zone.signalName = zone.title;

    this.interface.closeScan();
    this.interface.setScannerStatus(
      "WORLD IDENTIFIED"
    );

    this.interface.showGuide(
      `${zone.title} discovered`,
      "The destination is now available for waypoint, autopilot, and warp."
    );

    if (
      typeof this.onDiscoveryCompleted ===
      "function"
    ) {
      this.onDiscoveryCompleted(zone);
    }

    if (
      typeof this
        .onDiscoveryStateChanged ===
      "function"
    ) {
      this.onDiscoveryStateChanged(
        this.discovered
      );
    }

    this.refreshInterface();
  }

  completeArtifactScan(artifact) {
    this.discoveredArtifacts.add(
      artifact.id
    );

    this.hiddenObjectsSystem.reveal(
      artifact.id
    );

    this.interface.closeScan();
    this.interface.setScannerStatus(
      "ARTIFACT RECOVERED"
    );

    this.interface.showGuide(
      artifact.title,
      `${artifact.description} +${artifact.xp} discovery XP`
    );

    if (
      typeof this.onArtifactDiscovered ===
      "function"
    ) {
      this.onArtifactDiscovered(
        artifact
      );
    }

    if (
      typeof this.onArtifactStateChanged ===
      "function"
    ) {
      this.onArtifactStateChanged(
        this.discoveredArtifacts
      );
    }

    this.refreshInterface();
  }

  isDiscovered(zone) {
    return this.discovered.has(zone.id);
  }
}
