export class ScannerModeSystem {
  constructor(interfaceManager, onModeChanged = null) {
    this.interface = interfaceManager;
    this.modes = [
      "SIGNAL",
      "ARTIFACT",
      "ENGINEERING",
      "ENERGY",
      "STRUCTURAL"
    ];
    this.index = 0;
    this.onModeChanged = onModeChanged;
    this.previousToggle = false;
    this.applyMode();
  }

  update(inputManager) {
    const pressed =
      inputManager.consumePress("KeyR");

    if (pressed) {
      this.cycleMode();
    }
  }

  cycleMode() {
    this.index =
      (this.index + 1) % this.modes.length;

    this.applyMode();
  }

  applyMode() {
    const mode = this.getMode();

    this.interface.setScannerMode(mode);

    if (
      typeof this.onModeChanged === "function"
    ) {
      this.onModeChanged(mode);
    }

    this.interface.showMessage(
      `Scanner mode: ${mode}`
    );
  }

  getMode() {
    return this.modes[this.index];
  }
}
