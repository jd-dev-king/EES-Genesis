import * as THREE from "three";

export class CameraDirectorSystem {
  constructor({
    camera,
    robot,
    zoneManager,
    discoverySystem,
    interfaceManager
  }) {
    this.camera = camera;
    this.robot = robot;
    this.zoneManager = zoneManager;
    this.discoverySystem = discoverySystem;
    this.interface = interfaceManager;

    this.enabled = true;
    this.started = false;
    this.elapsed = 0;
    this.context = "flight";
    this.previousContext = "";
    this.baseOffset = new THREE.Vector3(0, 48, 118);
    this.targetOffset = this.baseOffset.clone();
    this.lookTarget = new THREE.Vector3();
    this.desiredPosition = new THREE.Vector3();
    this.temp = new THREE.Vector3();
  }

  start() {
    this.started = true;
    this.interface.updateCameraDirectorState(
      this.context,
      this.enabled
    );
  }

  update(delta) {
    if (
      !this.started ||
      !this.enabled ||
      document.documentElement.classList.contains(
        "ees-motion-reduced"
      ) ||
      document.documentElement.classList.contains(
        "command-center-active"
      )
    ) {
      return;
    }

    this.elapsed += delta;

    const nextContext =
      this.determineContext();

    if (nextContext !== this.context) {
      this.previousContext = this.context;
      this.context = nextContext;
      this.interface.updateCameraDirectorState(
        this.context,
        this.enabled
      );
    }

    this.applyCamera(delta);
  }

  determineContext() {
    if (this.robot.isLanded()) {
      return "docked";
    }

    const zone =
      this.zoneManager.activeZone ||
      this.zoneManager.nearestZone ||
      null;

    if (zone) {
      const landingPoint =
        zone.position
          .clone()
          .add(zone.landingOffset);

      const distance =
        this.robot
          .getPosition()
          .distanceTo(landingPoint);

      if (
        distance <
        Math.max(
          zone.approachRadius || 150,
          150
        )
      ) {
        return "approach";
      }
    }

    if (
      this.discoverySystem.nearestScannable &&
      Number.isFinite(
        this.discoverySystem
          .nearestScannableDistance
      ) &&
      this.discoverySystem
        .nearestScannableDistance < 180
    ) {
      return "scanning";
    }

    return "flight";
  }

  applyCamera(delta) {
    const robotPosition =
      this.robot.getPosition();

    const smoothing =
      1 - Math.pow(
        0.001,
        Math.min(delta, 0.05)
      );

    if (this.context === "flight") {
      const driftX =
        Math.sin(this.elapsed * 0.18) * 7;

      const driftY =
        Math.cos(this.elapsed * 0.22) * 3;

      this.targetOffset.set(
        driftX,
        48 + driftY,
        118
      );

      this.lookTarget.copy(
        robotPosition
      );
      this.lookTarget.y += 10;
    }

    if (this.context === "scanning") {
      const signal =
        this.discoverySystem.nearestScannable;

      this.targetOffset.set(
        34,
        42,
        96
      );

      if (signal?.position) {
        this.lookTarget
          .copy(robotPosition)
          .lerp(signal.position, 0.34);
      } else {
        this.lookTarget.copy(robotPosition);
      }
    }

    if (this.context === "approach") {
      const zone =
        this.zoneManager.activeZone ||
        this.zoneManager.nearestZone;

      this.targetOffset.set(
        22,
        34,
        82
      );

      if (zone) {
        this.lookTarget
          .copy(robotPosition)
          .lerp(zone.position, 0.42);
      } else {
        this.lookTarget.copy(robotPosition);
      }
    }

    if (this.context === "docked") {
      const zone =
        this.zoneManager.activeZone ||
        this.zoneManager.nearestZone;

      this.targetOffset.set(
        -28,
        30,
        72
      );

      if (zone) {
        this.lookTarget.copy(zone.position);
        this.lookTarget.y += 18;
      } else {
        this.lookTarget.copy(robotPosition);
      }
    }

    this.desiredPosition
      .copy(robotPosition)
      .add(this.targetOffset);

    this.camera.position.lerp(
      this.desiredPosition,
      smoothing * 0.28
    );

    this.temp.copy(this.lookTarget);
    this.camera.lookAt(this.temp);
  }

  setEnabled(enabled) {
    this.enabled = Boolean(enabled);

    this.interface.updateCameraDirectorState(
      this.context,
      this.enabled
    );
  }

  reset() {
    this.elapsed = 0;
    this.context = "flight";
    this.previousContext = "";
  }
}
