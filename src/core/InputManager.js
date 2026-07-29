export class InputManager {
  constructor() {
    this.keys = new Set();
    this.pressed = new Set();
    this.enabled = false;

    this.handleKeyDown =
      this.handleKeyDown.bind(this);
    this.handleKeyUp =
      this.handleKeyUp.bind(this);
    this.handleWindowBlur =
      this.handleWindowBlur.bind(this);

    window.addEventListener(
      "keydown",
      this.handleKeyDown
    );

    window.addEventListener(
      "keyup",
      this.handleKeyUp
    );

    window.addEventListener(
      "blur",
      this.handleWindowBlur
    );
  }

  setEnabled(enabled) {
    this.enabled = enabled;

    if (!enabled) {
      this.keys.clear();
      this.pressed.clear();
    }
  }

  handleKeyDown(event) {
    if (!this.enabled) {
      return;
    }

    const blockedKeys = [
      "KeyW",
      "KeyA",
      "KeyS",
      "KeyD",
      "KeyQ",
      "KeyE",
      "KeyF",
      "KeyL",
      "KeyP",
      "KeyT",
      "Space",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    ];

    if (blockedKeys.includes(event.code)) {
      event.preventDefault();
    }

    if (!this.keys.has(event.code)) {
      this.pressed.add(event.code);
    }

    this.keys.add(event.code);
  }

  handleKeyUp(event) {
    this.keys.delete(event.code);
  }

  handleWindowBlur() {
    this.keys.clear();
    this.pressed.clear();
  }

  pressVirtualKey(code) {
    if (!this.enabled) return;
    if (!this.keys.has(code)) this.pressed.add(code);
    this.keys.add(code);
  }

  releaseVirtualKey(code) {
    this.keys.delete(code);
  }

  tapVirtualKey(code, duration = 90) {
    this.pressVirtualKey(code);
    window.setTimeout(() => this.releaseVirtualKey(code), duration);
  }

  isPressed(code) {
    return (
      this.enabled &&
      this.keys.has(code)
    );
  }

  consumePress(code) {
    if (
      !this.enabled ||
      !this.pressed.has(code)
    ) {
      return false;
    }

    this.pressed.delete(code);
    return true;
  }

  destroy() {
    window.removeEventListener(
      "keydown",
      this.handleKeyDown
    );

    window.removeEventListener(
      "keyup",
      this.handleKeyUp
    );

    window.removeEventListener(
      "blur",
      this.handleWindowBlur
    );
  }
}
