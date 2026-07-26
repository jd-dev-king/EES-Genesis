export class AuraOperationsSystem {
  constructor({
    robot,
    zoneManager,
    missionSystem,
    discoverySystem,
    scannerModeSystem,
    interfaceManager
  }) {
    this.robot = robot;
    this.zoneManager = zoneManager;
    this.missionSystem = missionSystem;
    this.discoverySystem = discoverySystem;
    this.scannerModeSystem = scannerModeSystem;
    this.interface = interfaceManager;

    this.elapsed = 0;
    this.idleElapsed = 0;
    this.analysisElapsed = 0;
    this.lastRecommendationKey = "";
    this.observations = [];
    this.started = false;
  }

  start() {
    this.started = true;
    this.interface.setAuraOperationsVisible(true);
    this.analyze(true);
  }

  update(delta) {
    if (!this.started) return;

    this.elapsed += delta;
    this.analysisElapsed += delta;

    const speed = Math.abs(
      Number(this.robot.currentSpeed) || 0
    );

    if (
      speed < 0.35 &&
      !this.robot.isLanded()
    ) {
      this.idleElapsed += delta;
    } else {
      this.idleElapsed = 0;
    }

    if (this.analysisElapsed >= 1.25) {
      this.analysisElapsed = 0;
      this.analyze(false);
    }
  }

  analyze(force) {
    const mission =
      this.missionSystem.getActiveMission();

    const scannerMode =
      this.scannerModeSystem.getMode();

    const nearestSignal =
      this.discoverySystem.nearestScannable;

    const signalDistance =
      this.discoverySystem
        .nearestScannableDistance;

    const zone =
      this.zoneManager.activeZone ||
      this.zoneManager.waypointZone ||
      this.zoneManager.nearestZone ||
      null;

    const hull = Math.round(
      this.robot.hullIntegrity
    );

    const energy = Math.round(
      this.robot.energy
    );

    const recommendation =
      this.selectRecommendation({
        mission,
        scannerMode,
        nearestSignal,
        signalDistance,
        zone,
        hull,
        energy
      });

    this.interface.updateAuraOperations({
      recommendation,
      mission,
      scannerMode,
      hull,
      energy,
      landed: this.robot.isLanded(),
      autopilot:
        this.robot.autopilotEnabled,
      idleElapsed: this.idleElapsed
    });

    if (
      force ||
      recommendation.key !==
        this.lastRecommendationKey
    ) {
      this.lastRecommendationKey =
        recommendation.key;

      this.addObservation(
        recommendation.title
      );

      if (
        recommendation.priority ===
        "high"
      ) {
        this.interface.showGuide(
          "AURA Operations",
          recommendation.reason
        );
      }
    }
  }

  selectRecommendation({
    mission,
    scannerMode,
    nearestSignal,
    signalDistance,
    zone,
    hull,
    energy
  }) {
    if (hull < 35) {
      return {
        key: "critical-hull",
        title:
          "Land at the nearest facility for hull restoration.",
        reason:
          `Hull integrity is ${hull}%. Continued flight presents elevated operational risk.`,
        confidence: 99,
        focus: "CRAFT SAFETY",
        priority: "high"
      };
    }

    if (energy < 18) {
      return {
        key: "low-energy",
        title:
          "Reduce thrust and establish a facility approach.",
        reason:
          `Explorer energy is ${energy}%. A controlled landing will restore operational margin.`,
        confidence: 97,
        focus: "ENERGY MANAGEMENT",
        priority: "high"
      };
    }

    if (
      this.robot.isLanded() &&
      zone
    ) {
      return {
        key: `landed-${zone.id}`,
        title:
          `Review ${zone.title} command and portal systems.`,
        reason:
          "Facility Operations is connected and local destination resources are available.",
        confidence: 96,
        focus: "FACILITY OPERATIONS",
        priority: "normal"
      };
    }

    if (
      nearestSignal &&
      Number.isFinite(signalDistance) &&
      signalDistance < 180
    ) {
      return {
        key:
          `signal-${nearestSignal.id || nearestSignal.title}`,
        title:
          "Align the scanner and recover the nearby signal.",
        reason:
          `${nearestSignal.title || "An engineering artifact"} is approximately ${Math.round(signalDistance)} units away in ${scannerMode} mode.`,
        confidence: 94,
        focus: "DISCOVERY",
        priority: "normal"
      };
    }

    if (
      mission &&
      this.idleElapsed > 18
    ) {
      return {
        key: `idle-${mission.id}`,
        title:
          `Resume navigation toward ${mission.targetZoneId.replaceAll("-", " ")}.`,
        reason:
          "The explorer has remained stationary while an active mission is awaiting progress.",
        confidence: 91,
        focus: "MISSION RECOVERY",
        priority: "high"
      };
    }

    if (
      mission &&
      !this.zoneManager.waypointZone
    ) {
      return {
        key: `waypoint-${mission.id}`,
        title:
          "Activate the mission destination waypoint.",
        reason:
          `${mission.title} is active, but no waypoint is currently guiding the explorer.`,
        confidence: 93,
        focus: "NAVIGATION",
        priority: "normal"
      };
    }

    if (
      mission &&
      scannerMode === "navigation" &&
      mission.completionType === "discover"
    ) {
      return {
        key: `scanner-${mission.id}`,
        title:
          "Cycle to the scanner mode compatible with the active mission.",
        reason:
          "The current discovery objective requires signal acquisition rather than navigation-only scanning.",
        confidence: 89,
        focus: "SCANNER ALIGNMENT",
        priority: "normal"
      };
    }

    if (mission) {
      return {
        key: `mission-${mission.id}`,
        title:
          mission.objective,
        reason:
          `${mission.title} remains the highest-priority Genesis directive.`,
        confidence: 88,
        focus: "MISSION EXECUTION",
        priority: "normal"
      };
    }

    return {
      key: "free-exploration",
      title:
        "Continue free Engineering Verse exploration.",
      reason:
        "The Genesis campaign is complete. Facilities, artifacts, digital twins, and engineering operations remain available.",
      confidence: 86,
      focus: "FREE EXPLORATION",
      priority: "normal"
    };
  }

  addObservation(message) {
    this.observations.unshift({
      message,
      time: this.elapsed
    });

    this.observations =
      this.observations.slice(0, 4);

    this.interface.updateAuraObservations(
      this.observations
    );
  }

  reset() {
    this.elapsed = 0;
    this.idleElapsed = 0;
    this.analysisElapsed = 0;
    this.lastRecommendationKey = "";
    this.observations = [];
    this.interface.updateAuraObservations([]);
  }
}
