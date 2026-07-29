export class EngineeringOperationsSystem {
  constructor(
    robot,
    zoneManager,
    interfaceManager,
    spaceEventSystem,
    autonomousDroneSystem
  ) {
    this.robot = robot;
    this.zoneManager = zoneManager;
    this.interface = interfaceManager;
    this.spaceEventSystem = spaceEventSystem;
    this.autonomousDroneSystem =
      autonomousDroneSystem;

    this.activeService = null;
    this.serviceProgress = 0;
    this.serviceDuration = 0;
    this.previousOpenPressed = false;

    this.interface.onRepairRequested = () =>
      this.requestRepair();

    this.interface.onRechargeRequested = () =>
      this.requestRecharge();

    this.interface.onDiagnosticsRequested = () =>
      this.runDiagnostics();

    this.interface.onEventResponseRequested = () =>
      this.respondToEvent();
  }

  update(delta, inputManager) {
    if (inputManager.consumePress("KeyO")) {
      this.interface.openOperationsPanel();
    }

    this.interface.updateOperationsState({
      hull: this.robot.hullIntegrity,
      energy: this.robot.energy,
      landed: this.robot.isLanded(),
      service: this.activeService
    });

    if (!this.activeService) {
      this.interface.setOperationsStatus(
        this.robot.isLanded()
          ? "SERVICES READY"
          : "STANDBY"
      );
      return;
    }

    this.serviceProgress +=
      delta / this.serviceDuration;

    this.interface.setOperationsStatus(
      `${this.activeService.toUpperCase()} ${Math.min(
        100,
        Math.round(this.serviceProgress * 100)
      )}%`
    );

    if (this.serviceProgress >= 1) {
      this.completeService();
    }
  }

  canUseStationService() {
    if (!this.robot.isLanded()) {
      this.interface.showGuide(
        "Station service unavailable",
        "Land at any destination before requesting engineering services."
      );
      return false;
    }

    if (this.activeService) {
      this.interface.showGuide(
        "Service already active",
        `The ${this.activeService} operation must finish first.`
      );
      return false;
    }

    return true;
  }

  requestRepair() {
    if (!this.canUseStationService()) {
      return;
    }

    if (this.robot.hullIntegrity >= 100) {
      this.interface.showGuide(
        "Hull already optimal",
        "No repair action is required."
      );
      return;
    }

    this.startService("repair", 4.5);
    this.interface.setDiagnosticOutput(
      "MAINTENANCE DRONES DEPLOYED",
      "Repair drones are restoring damaged hull sections."
    );
  }

  requestRecharge() {
    if (!this.canUseStationService()) {
      return;
    }

    if (this.robot.energy >= 100) {
      this.interface.showGuide(
        "Energy already full",
        "The craft power system is fully charged."
      );
      return;
    }

    this.startService("recharge", 3.8);
    this.interface.setDiagnosticOutput(
      "POWER LINK ESTABLISHED",
      "Destination-grid energy is charging the craft."
    );
  }

  startService(type, duration) {
    this.activeService = type;
    this.serviceDuration = duration;
    this.serviceProgress = 0;
    this.interface.showMessage(
      `${type} service initiated.`
    );
  }

  completeService() {
    if (this.activeService === "repair") {
      this.robot.restoreHull(100);
      this.interface.showAchievement({
        title: "Field Repaired",
        description:
          "Maintenance drones restored the craft to full hull integrity."
      });
    }

    if (this.activeService === "recharge") {
      this.robot.rechargeEnergy(100);
      this.interface.showAchievement({
        title: "Grid Recharged",
        description:
          "The craft energy system has returned to full capacity."
      });
    }

    this.interface.setDiagnosticOutput(
      "SERVICE COMPLETE",
      `${this.activeService.toUpperCase()} operation completed successfully.`
    );

    this.interface.showMessage(
      `${this.activeService} service complete.`
    );

    this.activeService = null;
    this.serviceProgress = 0;
  }

  runDiagnostics() {
    const droneReport =
      this.autonomousDroneSystem.getStatusReport();

    const status = [
      `Hull integrity: ${Math.round(
        this.robot.hullIntegrity
      )}%`,
      `Energy reserve: ${Math.round(
        this.robot.energy
      )}%`,
      `Flight mode: ${this.robot.flightMode}`,
      `Autopilot: ${
        this.robot.autopilotEnabled
          ? "ACTIVE"
          : "OFF"
      }`,
      `Scout drones online: ${
        droneReport.SCOUT || 0
      }`,
      `Maintenance drones online: ${
        droneReport.MAINTENANCE || 0
      }`
    ].join(" • ");

    this.interface.setDiagnosticOutput(
      "SYSTEM DIAGNOSTICS COMPLETE",
      status
    );

    this.interface.showMessage(
      "Engineering diagnostics complete."
    );
  }

  respondToEvent() {
    const event =
      this.spaceEventSystem.activeEvent;

    if (!event) {
      this.interface.showGuide(
        "No active response task",
        "Engineering response becomes available during a compatible dynamic event."
      );
      return;
    }

    if (
      event.id !== "distress-beacon" &&
      event.id !== "signal-blackout"
    ) {
      this.interface.showGuide(
        "Observation event",
        `${event.title} does not currently require direct engineering intervention.`
      );
      return;
    }

    if (!this.robot.consumeEnergy(8)) {
      this.interface.showGuide(
        "Insufficient energy",
        "At least 8% energy is required for an engineering response."
      );
      return;
    }

    this.interface.setDiagnosticOutput(
      "EVENT RESPONSE TRANSMITTED",
      `${event.title} response packet accepted by the EES network.`
    );

    this.interface.showAchievement({
      title: "Engineering Responder",
      description:
        `Successfully responded to ${event.title}.`
    });

    this.interface.showMessage(
      "Engineering response completed."
    );
  }
}
