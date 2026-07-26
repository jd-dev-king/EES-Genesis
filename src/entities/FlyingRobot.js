import * as THREE from "three";

export class FlyingRobot {
  constructor(scene, inputManager) {
    this.scene = scene;
    this.input = inputManager;

    this.group = new THREE.Group();
    this.visualGroup = new THREE.Group();
    this.group.add(this.visualGroup);

    this.velocity = new THREE.Vector3();
    this.forward = new THREE.Vector3();
    this.targetVelocity = new THREE.Vector3();

    this.maxSpeed = 36;
    this.boostSpeed = 58;
    this.reverseSpeed = 15;
    this.acceleration = 4.2;
    this.drag = 2.4;
    this.turnSpeed = 1.55;
    this.verticalSpeed = 22;
    this.minimumAltitude = 6;
    this.maximumAltitude = 330;
    this.currentSpeed = 0;
    this.flightMode = "FLYING";
    this.landingTarget = new THREE.Vector3();
    this.landingStart = new THREE.Vector3();
    this.landingProgress = 0;
    this.landingDuration = 2.8;
    this.currentLandingZone = null;
    this.autopilotTarget = null;
    this.autopilotEnabled = false;
    this.autopilotArrivalDistance = 52;
    this.collisionRadius = 5.5;
    this.hullIntegrity = 100;
    this.energy = 100;
    this.energyDrainRate = 0.42;
    this.collisionCooldown = 0;
    this.impactFlash = 0;

    this.thrusters = [];
    this.arms = [];

    this.createRobot();
    this.group.position.set(0, 22, 30);
    this.scene.add(this.group);
  }

  createRobot() {
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827, metalness: 0.78, roughness: 0.28
    });

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155, metalness: 0.82, roughness: 0.23
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, emissive: 0x075985, emissiveIntensity: 2.2,
      metalness: 0.4, roughness: 0.2
    });

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe, emissive: 0x0284c7, emissiveIntensity: 4,
      metalness: 0.2, roughness: 0.1
    });

    const body = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2, 1), bodyMaterial);
    body.scale.set(1.25, 0.78, 1.55);
    body.castShadow = true;
    body.receiveShadow = true;
    this.visualGroup.add(body);

    const bodyRing = new THREE.Mesh(new THREE.TorusGeometry(3.7, 0.22, 10, 36), accentMaterial);
    bodyRing.rotation.x = Math.PI / 2;
    bodyRing.scale.set(1, 1.3, 1);
    this.visualGroup.add(bodyRing);

    const core = new THREE.Mesh(new THREE.SphereGeometry(1.15, 24, 24), coreMaterial);
    core.position.z = -2.65;
    this.visualGroup.add(core);

    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.45, 18, 18), coreMaterial);
    eye.scale.set(1.4, 0.7, 0.45);
    eye.position.set(0, 0.2, -4.1);
    this.visualGroup.add(eye);

    const topFin = new THREE.Mesh(new THREE.ConeGeometry(0.7, 2.4, 5), darkMaterial);
    topFin.position.set(0, 3.05, 0.6);
    topFin.rotation.z = Math.PI;
    this.visualGroup.add(topFin);

    this.createArms(darkMaterial, bodyMaterial, accentMaterial);
    this.createThrusters(darkMaterial, coreMaterial);
  }

  createArms(darkMaterial, bodyMaterial, accentMaterial) {
    const armAngles = [
      Math.PI / 2,
      Math.PI / 2 + (Math.PI * 2) / 3,
      Math.PI / 2 + (Math.PI * 4) / 3
    ];

    armAngles.forEach((angle, index) => {
      const armPivot = new THREE.Group();
      armPivot.rotation.z = angle;
      this.visualGroup.add(armPivot);

      const upperArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.62, 4.8, 8),
        bodyMaterial
      );
      upperArm.position.y = 4.4;
      upperArm.castShadow = true;
      armPivot.add(upperArm);

      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.76, 12, 12), accentMaterial);
      elbow.position.y = 6.85;
      armPivot.add(elbow);

      const lowerArmPivot = new THREE.Group();
      lowerArmPivot.position.y = 6.85;
      lowerArmPivot.rotation.z = index % 2 === 0 ? 0.28 : -0.28;
      armPivot.add(lowerArmPivot);

      const lowerArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.36, 0.46, 3.5, 8),
        darkMaterial
      );
      lowerArm.position.y = 1.75;
      lowerArm.castShadow = true;
      lowerArmPivot.add(lowerArm);

      const tool = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), accentMaterial);
      tool.position.y = 3.75;
      tool.scale.set(0.75, 1.25, 0.75);
      lowerArmPivot.add(tool);

      this.arms.push({
        pivot: armPivot,
        lowerPivot: lowerArmPivot,
        animationOffset: index * 2
      });
    });
  }

  createThrusters(darkMaterial, glowMaterial) {
    const thrusterPositions = [
      new THREE.Vector3(-2.3, -2, 2.3),
      new THREE.Vector3(2.3, -2, 2.3),
      new THREE.Vector3(0, -2.2, -0.6)
    ];

    thrusterPositions.forEach((position) => {
      const thrusterGroup = new THREE.Group();
      thrusterGroup.position.copy(position);

      const housing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.52, 1.8, 12),
        darkMaterial
      );
      housing.rotation.x = Math.PI / 2;
      thrusterGroup.add(housing);

      const glow = new THREE.Mesh(new THREE.ConeGeometry(0.48, 2.2, 12), glowMaterial);
      glow.rotation.x = -Math.PI / 2;
      glow.position.z = 1.65;
      glow.scale.set(1, 1, 0.25);
      thrusterGroup.add(glow);

      this.visualGroup.add(thrusterGroup);
      this.thrusters.push(glow);
    });
  }

  update(delta, elapsed) {
    this.collisionCooldown = Math.max(0, this.collisionCooldown - delta);
    this.impactFlash = Math.max(0, this.impactFlash - delta * 2.8);
    this.updateEnergy(delta);
    if (this.flightMode === "LANDING") {
      this.updateLanding(delta);
    } else if (this.flightMode === "TAKING_OFF") {
      this.updateTakeoff(delta);
    } else if (this.flightMode === "FLYING") {
      if (this.autopilotEnabled && this.autopilotTarget) {
        this.updateAutopilot(delta);
      } else {
        this.updateMovement(delta);
      }
    }

    this.updateVisuals(elapsed);
  }

  updateEnergy(delta) {
    if (this.flightMode !== "FLYING") {
      return;
    }

    let drain = this.energyDrainRate;

    if (this.autopilotEnabled) {
      drain += 0.22;
    }

    const boosting =
      this.input.isPressed("ShiftLeft") ||
      this.input.isPressed("ShiftRight");

    if (boosting) {
      drain += 0.65;
    }

    this.energy = Math.max(
      0,
      this.energy - drain * delta
    );

    if (this.energy <= 0) {
      this.disableAutopilot();
      this.velocity.multiplyScalar(
        Math.exp(-2.5 * delta)
      );
    }
  }

  consumeEnergy(amount) {
    if (this.energy < amount) {
      return false;
    }

    this.energy = Math.max(
      0,
      this.energy - amount
    );

    return true;
  }

  rechargeEnergy(amount = 100) {
    this.energy = THREE.MathUtils.clamp(
      this.energy + amount,
      0,
      100
    );
  }

  resolveCollision(normal, penetration, severity = 1) {
    if (this.flightMode !== "FLYING" && this.flightMode !== "TAKING_OFF") {
      return;
    }

    if (this.collisionCooldown > 0) {
      return;
    }

    const safeNormal = normal.clone().normalize();
    const pushDistance = Math.min(Math.max(penetration, 0.45), 4.5);

    this.group.position.addScaledVector(safeNormal, pushDistance);

    const incoming = this.velocity.clone();
    const inwardVelocity = incoming.dot(safeNormal);

    if (inwardVelocity < 0) {
      const reflected = incoming.reflect(safeNormal);
      const bounceStrength = THREE.MathUtils.clamp(
        0.56 + severity * 0.07,
        0.58,
        0.8
      );

      this.velocity.copy(reflected).multiplyScalar(bounceStrength);

      if (this.velocity.length() < 10) {
        this.velocity.copy(safeNormal).multiplyScalar(10 + severity * 2);
      }
    } else {
      this.velocity.addScaledVector(safeNormal, 9 + severity * 2);
    }

    this.disableAutopilot();

    const damage = Math.max(1, Math.min(10, Math.round(severity * 3)));
    this.hullIntegrity = Math.max(0, this.hullIntegrity - damage);
    this.collisionCooldown = 0.5;
    this.impactFlash = 1;
    this.currentSpeed = this.velocity.length();
  }

  applyBoundaryPushback(direction, strength = 18) {
    if (this.flightMode !== "FLYING") return;

    this.disableAutopilot();

    const push = direction.clone().normalize().multiplyScalar(strength);
    this.velocity.lerp(push, 0.72);
    this.group.position.addScaledVector(direction, 1.5);
    this.currentSpeed = this.velocity.length();
  }

  restoreHull(amount = 100) {
    this.hullIntegrity = THREE.MathUtils.clamp(
      this.hullIntegrity + amount,
      0,
      100
    );
  }

  setAutopilotTarget(zone) {
    this.autopilotTarget = zone;
    this.autopilotEnabled = true;
    this.velocity.set(0, 0, 0);
  }

  disableAutopilot() {
    this.autopilotEnabled = false;
    this.autopilotTarget = null;
    this.velocity.multiplyScalar(0.35);
  }

  updateAutopilot(delta) {
    const targetPoint = this.autopilotTarget.position
      .clone()
      .add(this.autopilotTarget.landingOffset)
      .add(new THREE.Vector3(0, 18, 24));

    const toTarget = targetPoint.clone().sub(this.group.position);
    const distance = toTarget.length();

    if (distance <= this.autopilotArrivalDistance) {
      this.velocity.multiplyScalar(Math.exp(-4.5 * delta));
      this.currentSpeed = this.velocity.length();

      const faceTarget = this.autopilotTarget.position
        .clone()
        .sub(this.group.position);

      const targetYaw = Math.atan2(-faceTarget.x, -faceTarget.z);
      this.group.rotation.y = THREE.MathUtils.lerp(
        this.group.rotation.y,
        targetYaw,
        1 - Math.exp(-3.8 * delta)
      );

      this.visualGroup.rotation.z = THREE.MathUtils.lerp(
        this.visualGroup.rotation.z,
        0,
        1 - Math.exp(-5 * delta)
      );

      return;
    }

    toTarget.normalize();

    const desiredYaw = Math.atan2(-toTarget.x, -toTarget.z);
    let yawDifference = desiredYaw - this.group.rotation.y;
    yawDifference = Math.atan2(Math.sin(yawDifference), Math.cos(yawDifference));

    this.group.rotation.y += yawDifference * (1 - Math.exp(-2.8 * delta));

    const speedScale = THREE.MathUtils.clamp(distance / 180, 0.32, 1);
    const desiredSpeed = this.boostSpeed * speedScale;

    const desiredVelocity = toTarget.multiplyScalar(desiredSpeed);
    this.velocity.lerp(desiredVelocity, 1 - Math.exp(-2.6 * delta));

    this.group.position.addScaledVector(this.velocity, delta);
    this.group.position.y = THREE.MathUtils.clamp(
      this.group.position.y,
      this.minimumAltitude,
      this.maximumAltitude
    );

    this.currentSpeed = this.velocity.length();

    this.visualGroup.rotation.z = THREE.MathUtils.lerp(
      this.visualGroup.rotation.z,
      THREE.MathUtils.clamp(-yawDifference * 0.7, -0.38, 0.38),
      1 - Math.exp(-4 * delta)
    );

    this.visualGroup.rotation.x = THREE.MathUtils.lerp(
      this.visualGroup.rotation.x,
      -0.08,
      1 - Math.exp(-4 * delta)
    );
  }

  beginLanding(zone) {
    if (this.flightMode !== "FLYING") return false;

    this.disableAutopilot();
    this.flightMode = "LANDING";
    this.currentLandingZone = zone;
    this.landingStart.copy(this.group.position);
    this.landingTarget.copy(zone.position).add(zone.landingOffset);
    this.landingProgress = 0;
    this.velocity.set(0, 0, 0);
    return true;
  }

  updateLanding(delta) {
    this.landingProgress = Math.min(
      this.landingProgress + delta / this.landingDuration,
      1
    );

    const t = this.smoothStep(this.landingProgress);
    const arc = Math.sin(Math.PI * t) * 18;

    this.group.position.lerpVectors(this.landingStart, this.landingTarget, t);
    this.group.position.y += arc;

    const direction = new THREE.Vector3()
      .subVectors(this.currentLandingZone.position, this.group.position);

    if (direction.lengthSq() > 0.001) {
      const targetYaw = Math.atan2(-direction.x, -direction.z);
      this.group.rotation.y = THREE.MathUtils.lerp(
        this.group.rotation.y,
        targetYaw,
        0.06
      );
    }

    this.currentSpeed = 0;

    if (this.landingProgress >= 1) {
      this.group.position.copy(this.landingTarget);
      this.visualGroup.rotation.set(0, 0, 0);
      this.flightMode = "LANDED";
    }
  }

  beginTakeoff() {
    if (this.flightMode !== "LANDED") return false;

    this.disableAutopilot();
    this.flightMode = "TAKING_OFF";
    this.landingStart.copy(this.group.position);
    this.landingTarget.copy(this.group.position).add(new THREE.Vector3(0, 28, -18));
    this.landingProgress = 0;
    return true;
  }

  updateTakeoff(delta) {
    this.landingProgress = Math.min(
      this.landingProgress + delta / 1.8,
      1
    );

    const t = this.smoothStep(this.landingProgress);
    this.group.position.lerpVectors(this.landingStart, this.landingTarget, t);
    this.currentSpeed = 8 * t;

    if (this.landingProgress >= 1) {
      this.flightMode = "FLYING";
      this.currentLandingZone = null;
    this.autopilotTarget = null;
    this.autopilotEnabled = false;
    this.autopilotArrivalDistance = 52;
    this.collisionRadius = 5.5;
    this.hullIntegrity = 100;
    this.energy = 100;
    this.energyDrainRate = 0.42;
    this.collisionCooldown = 0;
    this.impactFlash = 0;
      this.velocity.set(0, 0, -4).applyQuaternion(this.group.quaternion);
    }
  }

  smoothStep(value) {
    return value * value * (3 - 2 * value);
  }

  isLanded() {
    return this.flightMode === "LANDED";
  }

  isLanding() {
    return this.flightMode === "LANDING";
  }

  isTakingOff() {
    return this.flightMode === "TAKING_OFF";
  }

  updateMovement(delta) {
    let thrustInput = 0;
    if (this.input.isPressed("KeyW")) thrustInput += 1;
    if (this.input.isPressed("KeyS")) thrustInput -= 0.55;

    let turnInput = 0;
    if (this.input.isPressed("KeyA") || this.input.isPressed("ArrowLeft")) turnInput += 1;
    if (this.input.isPressed("KeyD") || this.input.isPressed("ArrowRight")) turnInput -= 1;

    let verticalInput = 0;
    if (this.input.isPressed("KeyE") || this.input.isPressed("ArrowUp")) verticalInput += 1;
    if (this.input.isPressed("KeyQ") || this.input.isPressed("ArrowDown")) verticalInput -= 1;

    const boosting = this.input.isPressed("ShiftLeft") || this.input.isPressed("ShiftRight");
    const selectedMaxSpeed = boosting ? this.boostSpeed : this.maxSpeed;

    this.group.rotation.y += turnInput * this.turnSpeed * delta;

    this.forward.set(0, 0, -1).applyQuaternion(this.group.quaternion).normalize();

    const forwardSpeed = thrustInput >= 0
      ? selectedMaxSpeed * thrustInput
      : this.reverseSpeed * thrustInput;

    this.targetVelocity.copy(this.forward).multiplyScalar(forwardSpeed);
    this.targetVelocity.y = verticalInput * this.verticalSpeed;

    const response = 1 - Math.exp(-this.acceleration * delta);
    this.velocity.lerp(this.targetVelocity, response);

    if (thrustInput === 0 && verticalInput === 0) {
      this.velocity.multiplyScalar(Math.exp(-this.drag * delta));
    }

    this.group.position.addScaledVector(this.velocity, delta);
    this.group.position.y = THREE.MathUtils.clamp(
      this.group.position.y,
      this.minimumAltitude,
      this.maximumAltitude
    );

    if (this.group.position.y === this.minimumAltitude && this.velocity.y < 0) this.velocity.y = 0;
    if (this.group.position.y === this.maximumAltitude && this.velocity.y > 0) this.velocity.y = 0;

    this.currentSpeed = this.velocity.length();

    this.visualGroup.rotation.z = THREE.MathUtils.lerp(
      this.visualGroup.rotation.z,
      turnInput * 0.42,
      1 - Math.exp(-5 * delta)
    );

    this.visualGroup.rotation.x = THREE.MathUtils.lerp(
      this.visualGroup.rotation.x,
      thrustInput * -0.12,
      1 - Math.exp(-4 * delta)
    );
  }

  updateVisuals(elapsed) {
    const movementIntensity = THREE.MathUtils.clamp(this.currentSpeed / this.maxSpeed, 0, 1);

    this.thrusters.forEach((thruster, index) => {
      const pulse = 0.8 + Math.sin(elapsed * 15 + index * 1.8) * 0.12;
      const length = 0.25 + movementIntensity * 1.65;
      thruster.scale.set(pulse, length, pulse);
    });

    this.arms.forEach((arm) => {
      arm.lowerPivot.rotation.z += Math.sin(elapsed * 1.5 + arm.animationOffset) * 0.0008;
      arm.pivot.rotation.x = Math.sin(elapsed * 0.8 + arm.animationOffset) * 0.045;
    });

    this.visualGroup.position.y = Math.sin(elapsed * 2.1) * 0.13;
  }

  prepareForWarp() {
    /*
     * Normalize transient navigation state before relocating.
     * This supports warp while docked, landing, taking off,
     * or while autopilot is active.
     */
    this.velocity.set(0, 0, 0);
    this.targetVelocity.set(0, 0, 0);
    this.currentSpeed = 0;
    this.flightMode = "FLYING";
    this.currentLandingZone = null;
    this.landingProgress = 0;
    this.autopilotTarget = null;
    this.autopilotEnabled = false;
  }

  warpToZone(zone) {
    this.prepareForWarp();

    const approach = zone.position.clone().add(
      new THREE.Vector3(0, 18, zone.landingOffset.z + 24)
    );

    this.group.position.copy(approach);
    this.autopilotArrivalDistance = 52;
    this.collisionRadius = 5.5;
    this.hullIntegrity = 100;
    this.energy = 100;
    this.energyDrainRate = 0.42;
    this.collisionCooldown = 0;
    this.impactFlash = 0;

    const direction = new THREE.Vector3()
      .subVectors(zone.position, this.group.position);

    this.group.rotation.y = Math.atan2(-direction.x, -direction.z);
  }

  getPosition() {
    return this.group.position;
  }

  getQuaternion() {
    return this.group.quaternion;
  }
}
