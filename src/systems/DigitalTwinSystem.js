export class DigitalTwinSystem {
  constructor(
    robot,
    zoneManager,
    interfaceManager,
    progressStore
  ) {
    this.robot = robot;
    this.zoneManager = zoneManager;
    this.interface = interfaceManager;
    this.progressStore = progressStore;

    this.selectedScenario = "baseline";
    this.running = false;
    this.progress = 0;
    this.duration = 4;
    this.currentZone = null;
    this.runState = this.loadRunState();

    this.interface.onTwinScenarioSelected =
      (scenario) => {
        this.selectedScenario = scenario;
      };

    this.interface.onTwinRunRequested = () =>
      this.startSimulation();

    this.interface.onTwinResetRequested = () =>
      this.resetModel();
  }

  loadRunState() {
    const state = this.progressStore.load();

    return state.digitalTwinRuns || {};
  }

  saveRunState() {
    const state = this.progressStore.load();
    state.digitalTwinRuns = this.runState;
    this.progressStore.save(state);
  }

  update(delta, inputManager) {
    if (inputManager.consumePress("KeyY")) {
      this.openPanel();
    }

    this.currentZone =
      this.zoneManager.activeZone ||
      this.zoneManager.nearestZone ||
      null;

    this.interface.updateTwinAccess({
      landed: this.robot.isLanded(),
      zone: this.currentZone,
      running: this.running
    });

    if (!this.running) {
      return;
    }

    this.progress = Math.min(
      1,
      this.progress + delta / this.duration
    );

    const telemetry = this.calculateTelemetry(
      this.currentZone,
      this.selectedScenario,
      this.progress
    );

    this.interface.updateTwinTelemetry(
      telemetry,
      this.progress
    );

    if (this.progress >= 1) {
      this.completeSimulation(telemetry);
    }
  }

  openPanel() {
    this.interface.openDigitalTwinPanel(
      this.currentZone,
      this.runState
    );
  }

  startSimulation() {
    if (!this.robot.isLanded()) {
      this.interface.showGuide(
        "Digital twin unavailable",
        "Land at a destination before running its engineering model."
      );
      return;
    }

    if (!this.currentZone) {
      this.interface.showGuide(
        "No twin target",
        "A destination must be active before its digital twin can run."
      );
      return;
    }

    if (this.running) {
      this.interface.showGuide(
        "Simulation already running",
        "Wait for the active digital-twin scenario to complete."
      );
      return;
    }

    if (!this.robot.consumeEnergy(4)) {
      this.interface.showGuide(
        "Insufficient energy",
        "At least 4% craft energy is required to initialize the twin."
      );
      return;
    }

    this.running = true;
    this.progress = 0;
    this.duration =
      this.selectedScenario === "fault"
        ? 5.2
        : 4;

    this.interface.setTwinStatus("RUNNING");
    this.interface.setTwinOutput(
      "SIMULATION INITIALIZED",
      `${this.selectedScenario.toUpperCase()} scenario is now executing.`
    );
  }

  calculateTelemetry(
    zone,
    scenario,
    progress
  ) {
    const baseSeed =
      zone
        ? zone.id
            .split("")
            .reduce(
              (sum, char) =>
                sum + char.charCodeAt(0),
              0
            )
        : 100;

    const wave =
      Math.sin(progress * Math.PI * 3);

    let load =
      54 + (baseSeed % 18) + wave * 5;

    let stability =
      88 - (baseSeed % 9) - Math.abs(wave) * 3;

    let throughput =
      62 + (baseSeed % 22) + wave * 4;

    let risk =
      8 + (baseSeed % 8);

    if (scenario === "load") {
      load += progress * 32;
      throughput += progress * 18;
      stability -= progress * 12;
      risk += progress * 14;
    }

    if (scenario === "fault") {
      const faultPoint =
        progress > 0.45
          ? (progress - 0.45) / 0.55
          : 0;

      stability -= faultPoint * 46;
      throughput -= faultPoint * 28;
      risk += faultPoint * 58;
      load += faultPoint * 12;
    }

    if (scenario === "optimize") {
      stability += progress * 10;
      throughput += progress * 22;
      risk -= progress * 7;
      load -= progress * 8;
    }

    return {
      load: this.clamp(load),
      stability: this.clamp(stability),
      throughput: this.clamp(throughput),
      risk: this.clamp(risk),
      efficiency: this.clamp(
        (
          stability +
          throughput +
          (100 - risk) +
          (100 - Math.abs(load - 70))
        ) / 4
      )
    };
  }

  clamp(value) {
    return Math.max(
      0,
      Math.min(100, Math.round(value))
    );
  }

  completeSimulation(telemetry) {
    this.running = false;

    const zoneId = this.currentZone.id;

    const existing =
      this.runState[zoneId] || {
        runs: 0,
        bestEfficiency: 0,
        scenarios: []
      };

    existing.runs += 1;

    existing.bestEfficiency = Math.max(
      existing.bestEfficiency,
      telemetry.efficiency
    );

    if (
      !existing.scenarios.includes(
        this.selectedScenario
      )
    ) {
      existing.scenarios.push(
        this.selectedScenario
      );
    }

    this.runState[zoneId] = existing;
    this.saveRunState();

    const result =
      this.selectedScenario === "fault"
        ? telemetry.stability >= 50
          ? "Fault contained successfully."
          : "Critical instability detected."
        : this.selectedScenario === "optimize"
          ? "Optimization improved operating efficiency."
          : "Simulation completed within modeled parameters.";

    this.interface.setTwinStatus("COMPLETE");

    this.interface.setTwinOutput(
      "SIMULATION COMPLETE",
      `${result} Efficiency score: ${telemetry.efficiency}%.`
    );

    this.interface.updateTwinRunSummary(
      existing
    );

    if (
      this.selectedScenario === "optimize" &&
      telemetry.efficiency >= 80
    ) {
      this.interface.showAchievement({
        title: "Twin Optimizer",
        description:
          "Achieved an engineering efficiency score of 80% or higher."
      });
    }

    this.interface.showMessage(
      `Digital twin complete: ${telemetry.efficiency}% efficiency`
    );
  }

  resetModel() {
    if (this.running) {
      this.interface.showGuide(
        "Reset unavailable",
        "Wait for the current simulation to finish."
      );
      return;
    }

    this.progress = 0;
    this.selectedScenario = "baseline";

    this.interface.resetTwinInterface();
    this.interface.setTwinStatus(
      this.robot.isLanded()
        ? "READY"
        : "OFFLINE"
    );
  }
}
