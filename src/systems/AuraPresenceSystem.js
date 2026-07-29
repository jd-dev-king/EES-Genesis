export class AuraPresenceSystem {
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

    this.started = false;
    this.enabled = true;
    this.elapsed = 0;
    this.analysisElapsed = 0;
    this.lastMessageKey = "";
    this.lastContext = "";
    this.dismissElapsed = 0;
  }

  start() {
    if (this.started) {
      this.interface.setAuraPresenceVisible(
        this.enabled
      );
      return;
    }

    this.started = true;
    this.interface.setAuraPresenceVisible(
      this.enabled
    );

    this.publish({
      key: "aura-online",
      status: "ONBOARD INTELLIGENCE",
      title: "AURA online.",
      message:
        "Flight, mission, scanner, and destination guidance is active.",
      confidence: 98,
      priority: "normal"
    });
  }

  update(delta) {
    if (
      !this.started ||
      !this.enabled
    ) {
      return;
    }

    this.elapsed += delta;
    this.analysisElapsed += delta;
    this.dismissElapsed += delta;

    if (this.analysisElapsed < 0.8) {
      return;
    }

    this.analysisElapsed = 0;

    const guidance =
      this.evaluate();

    if (
      guidance.key !==
      this.lastMessageKey
    ) {
      this.publish(guidance);
    } else if (
      this.dismissElapsed > 9 &&
      guidance.priority !== "high"
    ) {
      this.interface.setAuraPresenceExpanded(
        false
      );
    }
  }

  evaluate() {
    const hull =
      Math.round(
        Number(
          this.robot.hullIntegrity
        ) || 0
      );

    const energy =
      Math.round(
        Number(
          this.robot.energy
        ) || 0
      );

    const zone =
      this.zoneManager.activeZone ||
      this.zoneManager.nearestZone ||
      null;

    const mission =
      this.missionSystem.getActiveMission();

    const nearest =
      this.discoverySystem.nearestScannable;

    const distance =
      this.discoverySystem
        .nearestScannableDistance;

    const scannerMode =
      this.scannerModeSystem
        .getMode();

    if (hull < 35) {
      return {
        key: "hull-critical",
        status: "SAFETY ADVISORY",
        title: "Hull integrity critical.",
        message:
          `Integrity is ${hull}%. Establish the nearest controlled landing.`,
        confidence: 99,
        priority: "high"
      };
    }

    if (energy < 18) {
      return {
        key: "energy-low",
        status: "ENERGY ADVISORY",
        title: "Energy reserve is low.",
        message:
          `Reserve is ${energy}%. Reduce thrust and begin a facility approach.`,
        confidence: 98,
        priority: "high"
      };
    }

    if (
      this.robot.isLanded() &&
      zone
    ) {
      return {
        key: `docked-${zone.id}`,
        status: "FACILITY LINK",
        title:
          `Welcome to ${zone.title}.`,
        message:
          "Destination command and facility systems are connected.",
        confidence: 98,
        priority: "normal"
      };
    }

    if (
      zone &&
      this.isApproaching(zone)
    ) {
      return {
        key: `approach-${zone.id}`,
        status: "FINAL APPROACH",
        title:
          `${zone.title} landing solution available.`,
        message:
          "Reduce speed, align with the docking link, and confirm landing.",
        confidence: 95,
        priority: "normal"
      };
    }

    if (
      nearest &&
      Number.isFinite(distance) &&
      distance < 180
    ) {
      return {
        key:
          `signal-${nearest.id || nearest.title}`,
        status: "SIGNAL DETECTED",
        title:
          "Engineering signal within scanner range.",
        message:
          `${nearest.title || "Unknown signal"} is ${Math.round(distance)} units away in ${scannerMode} mode.`,
        confidence: 94,
        priority: "normal"
      };
    }

    if (mission) {
      return {
        key: `mission-${mission.id}`,
        status: "MISSION GUIDANCE",
        title:
          mission.title,
        message:
          mission.objective,
        confidence: 91,
        priority: "normal"
      };
    }

    return {
      key: "free-exploration",
      status: "VERSE GUIDANCE",
      title:
        "Free exploration authorized.",
      message:
        "Destinations, facilities, artifacts, and engineering systems remain available.",
      confidence: 88,
      priority: "normal"
    };
  }

  isApproaching(zone) {
    const landingPoint =
      zone.position
        .clone()
        .add(
          zone.landingOffset
        );

    const distance =
      this.robot
        .getPosition()
        .distanceTo(
          landingPoint
        );

    return (
      distance <
      Math.max(
        zone.approachRadius || 150,
        150
      )
    );
  }

  publish(guidance) {
    this.lastMessageKey =
      guidance.key;

    this.dismissElapsed = 0;

    this.interface.updateAuraPresence(
      guidance
    );

    this.interface.setAuraPresenceExpanded(
      true
    );
  }

  setEnabled(enabled) {
    this.enabled =
      Boolean(enabled);

    this.interface.setAuraPresenceVisible(
      this.enabled
    );
  }

  reset() {
    this.elapsed = 0;
    this.analysisElapsed = 0;
    this.dismissElapsed = 0;
    this.lastMessageKey = "";
  }
}
