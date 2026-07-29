import * as THREE from "three";

export class VerseBoundary {
  constructor(scene, robot, interfaceManager) {
    this.scene = scene;
    this.robot = robot;
    this.interface = interfaceManager;

    this.center = new THREE.Vector3(0, 150, -360);
    this.radius = 980;
    this.warningDistance = 150;
    this.cooldown = 0;

    this.createBoundary();
  }

  createBoundary() {
    this.shell = new THREE.Mesh(
      new THREE.SphereGeometry(this.radius, 48, 32),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.025,
        side: THREE.BackSide,
        depthWrite: false,
        wireframe: true
      })
    );

    this.shell.position.copy(this.center);
    this.scene.add(this.shell);

    this.rings = [];

    for (let index = 0; index < 3; index += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
          this.radius * (0.72 + index * 0.08),
          1.2,
          8,
          128
        ),
        new THREE.MeshBasicMaterial({
          color: 0x67e8f9,
          transparent: true,
          opacity: 0.12,
          side: THREE.DoubleSide,
          depthWrite: false
        })
      );

      ring.position.copy(this.center);
      ring.rotation.set(
        index * 0.9,
        index * 0.55,
        index * 0.35
      );

      this.scene.add(ring);
      this.rings.push(ring);
    }
  }

  update(delta, elapsed) {
    this.cooldown = Math.max(0, this.cooldown - delta);

    this.shell.rotation.y += delta * 0.008;
    this.shell.material.opacity =
      0.02 + Math.sin(elapsed * 0.6) * 0.006;

    this.rings.forEach((ring, index) => {
      ring.rotation.y += delta * (0.01 + index * 0.004);
      ring.material.opacity =
        0.08 + Math.sin(elapsed * 0.9 + index) * 0.03;
    });

    const position = this.robot.getPosition();
    const offset = position.clone().sub(this.center);
    const distanceFromCenter = offset.length();
    const distanceToBoundary = this.radius - distanceFromCenter;

    if (distanceToBoundary <= this.warningDistance && distanceToBoundary > 0) {
      const warningRatio = THREE.MathUtils.clamp(
        1 - distanceToBoundary / this.warningDistance,
        0,
        1
      );

      this.interface.updateBoundary(
        "APPROACHING",
        distanceToBoundary,
        warningRatio
      );
    } else if (distanceToBoundary <= 0) {
      const inward = this.center.clone().sub(position).normalize();

      if (this.cooldown <= 0) {
        this.robot.applyBoundaryPushback(inward, 24);
        this.cooldown = 0.8;
      }

      this.interface.updateBoundary("LIMIT REACHED", 0, 1);
    } else {
      this.interface.updateBoundary("CLEAR", distanceToBoundary, 0);
    }
  }
}
