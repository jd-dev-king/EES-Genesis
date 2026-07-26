export class AuraIntelligenceSystem {
  constructor({
    robot,
    zoneManager,
    missionSystem,
    discoverySystem,
    scannerModeSystem,
    spaceEventSystem,
    digitalTwinSystem,
    engineeringOperationsSystem,
    interfaceManager
  }) {
    this.robot = robot;
    this.zoneManager = zoneManager;
    this.missionSystem = missionSystem;
    this.discoverySystem = discoverySystem;
    this.scannerModeSystem = scannerModeSystem;
    this.spaceEventSystem = spaceEventSystem;
    this.digitalTwinSystem = digitalTwinSystem;
    this.engineeringOperationsSystem =
      engineeringOperationsSystem;
    this.interface = interfaceManager;

    this.interface.onAuraCommand = (command) =>
      this.handleCommand(command);

    this.interface.onAuraQuickCommand =
      (command) =>
        this.handleCommand(command);
  }

  update(inputManager) {
    if (inputManager.consumePress("KeyC")) {
      this.interface.openAuraPanel();
    }

    this.interface.updateAuraContext(
      this.getContext()
    );
  }

  getContext() {
    const activeMission =
      this.missionSystem.getActiveMission();

    const zone =
      this.zoneManager.activeZone ||
      this.zoneManager.waypointZone ||
      this.zoneManager.nearestZone ||
      null;

    return {
      zone,
      mission: activeMission,
      hull: Math.round(
        this.robot.hullIntegrity
      ),
      energy: Math.round(
        this.robot.energy
      ),
      flightMode: this.robot.flightMode,
      autopilot:
        this.robot.autopilotEnabled,
      scannerMode:
        this.scannerModeSystem.getMode(),
      event:
        this.spaceEventSystem.activeEvent,
      landed: this.robot.isLanded(),
      waypoint:
        this.zoneManager.waypointZone,
      twinRunning:
        this.digitalTwinSystem.running,
      operation:
        this.engineeringOperationsSystem
          .activeService
    };
  }

  handleCommand(rawCommand) {
    const command = String(rawCommand || "")
      .trim()
      .toLowerCase();

    if (!command) {
      return;
    }

    this.interface.addAuraMessage(
      "user",
      rawCommand
    );

    const context = this.getContext();
    const response =
      this.generateResponse(
        command,
        context
      );

    window.setTimeout(() => {
      this.interface.addAuraMessage(
        "aura",
        response.message
      );

      if (response.action) {
        this.executeAction(
          response.action,
          context
        );
      }
    }, 280);
  }

  generateResponse(command, context) {
    if (
      command === "recommend" ||
      command.includes("recommend") ||
      command.includes("next")
    ) {
      return {
        message:
          this.recommendNextAction(context)
      };
    }

    if (
      command === "status" ||
      command.includes("status") ||
      command.includes("diagnostic")
    ) {
      return {
        message:
          `Hull ${context.hull}%, energy ${context.energy}%, flight mode ${context.flightMode}, scanner ${context.scannerMode}, autopilot ${context.autopilot ? "active" : "off"}, and ${context.event ? `active event ${context.event.title}` : "no active space event"}.`
      };
    }

    if (
      command === "mission" ||
      command.includes("mission") ||
      command.includes("objective")
    ) {
      return {
        message:
          context.mission
            ? `Current mission: ${context.mission.title}. Objective: ${context.mission.objective}.`
            : "The Genesis campaign is complete. Continue exploring artifacts, digital twins, and engineering events."
      };
    }

    if (
      command === "scan" ||
      command.includes("scan") ||
      command.includes("artifact") ||
      command.includes("signal")
    ) {
      return {
        message:
          `Scanner mode is ${context.scannerMode}. ${this.getScannerAdvice(context)}`
      };
    }

    if (
      command === "repair" ||
      command.includes("repair") ||
      command.includes("hull")
    ) {
      if (context.hull >= 100) {
        return {
          message:
            "Hull integrity is already at 100%. No maintenance action is required."
        };
      }

      if (context.landed) {
        return {
          message:
            "The craft is landed and eligible for maintenance. I can open Engineering Operations.",
          action: "open-operations"
        };
      }

      return {
        message:
          "Land at any destination, then open Engineering Operations and request Hull Restoration."
      };
    }

    if (
      command === "twin" ||
      command.includes("digital twin") ||
      command.includes("simulation") ||
      command.includes("optimize")
    ) {
      if (!context.zone) {
        return {
          message:
            "Approach a destination first. Each world has its own digital twin model."
        };
      }

      if (!context.landed) {
        return {
          message:
            `The ${context.zone.title} twin is available, but simulations require landing first.`
        };
      }

      return {
        message:
          `The ${context.zone.title} twin is ready. Begin with Baseline, then compare Load Test, Fault Injection, and Optimize.`,
        action: "open-twin"
      };
    }

    if (
      command.includes("autopilot")
    ) {
      if (!context.waypoint) {
        return {
          message:
            "Set a waypoint before engaging autopilot."
        };
      }

      return {
        message:
          `Autopilot can navigate to ${context.waypoint.title}.`,
        action: "toggle-autopilot"
      };
    }

    if (
      command.includes("operations")
    ) {
      return {
        message:
          "Opening the Engineering Operations console.",
        action: "open-operations"
      };
    }

    if (
      command.includes("discoveries")
    ) {
      return {
        message:
          "Opening the EES Sensor Archive.",
        action: "open-discoveries"
      };
    }

    if (
      command.includes("missions")
    ) {
      return {
        message:
          "Opening the Genesis Mission Log.",
        action: "open-missions"
      };
    }

    if (
      command.includes("take off") ||
      command.includes("takeoff")
    ) {
      if (!context.landed) {
        return {
          message:
            "The craft is already in flight."
        };
      }

      return {
        message:
          "Initiating takeoff.",
        action: "takeoff"
      };
    }

    return {
      message:
        "I can provide system status, mission guidance, scanner recommendations, repair advice, digital-twin guidance, navigation support, or open EES consoles."
    };
  }

  recommendNextAction(context) {
    if (context.hull < 55) {
      return context.landed
        ? "Hull integrity is low. Request repair from Engineering Operations before continuing."
        : "Hull integrity is low. Land at the nearest destination for maintenance.";
    }

    if (context.energy < 25) {
      return context.landed
        ? "Energy is low. Recharge from the destination grid."
        : "Energy is low. Land soon and recharge before using warp or simulations.";
    }

    if (context.event) {
      if (
        context.event.id ===
          "distress-beacon" ||
        context.event.id ===
          "signal-blackout"
      ) {
        return "A live engineering event requires attention. Open Operations and respond to the event.";
      }

      return `Observe the active ${context.event.title} event and maintain safe separation.`;
    }

    if (context.mission) {
      return `Continue the active mission: ${context.mission.objective}`;
    }

    if (
      this.discoverySystem
        .discoveredArtifacts.size <
      this.discoverySystem
        .hiddenObjectsSystem
        .getScannables().length
    ) {
      return `Cycle scanner modes and search for remaining hidden artifacts. Current mode: ${context.scannerMode}.`;
    }

    if (context.zone && context.landed) {
      return `Run the ${context.zone.title} digital twin and compare an Optimize scenario against Baseline.`;
    }

    return "Explore another destination, inspect its portal, and run its digital twin model.";
  }

  getScannerAdvice(context) {
    const advice = {
      SIGNAL:
        "Use this mode to identify unknown worlds.",
      ARTIFACT:
        "Use this mode for general hidden-object recovery.",
      ENGINEERING:
        "Use this mode for beacons, blueprints, and access keys.",
      ENERGY:
        "Use this mode for EES core and power signatures.",
      STRUCTURAL:
        "Use this mode for archives, records, and structural data."
    };

    return (
      advice[context.scannerMode] ||
      "Move closer to the target before scanning."
    );
  }

  executeAction(action) {
    if (action === "open-operations") {
      this.interface.openOperationsPanel();
    }

    if (action === "open-twin") {
      this.digitalTwinSystem.openPanel();
    }

    if (action === "open-discoveries") {
      this.interface.openPanel(
        this.interface.discoveriesPanel
      );
    }

    if (action === "open-missions") {
      this.interface.openPanel(
        this.interface.missionLogPanel
      );
    }

    if (action === "toggle-autopilot") {
      this.zoneManager.toggleAutopilot();
    }

    if (action === "takeoff") {
      this.zoneManager.takeOff();
    }
  }
}
