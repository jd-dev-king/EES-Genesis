import * as THREE from "three";

export class IdentityCoreSystem {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.group = new THREE.Group();
    this.group.name = "EES Identity Core";
    this.group.position.set(0, 26, 9);

    this.elapsed = 0;
    this.intensity = 0;
    this.targetIntensity = 1;
    this.shutdownProgress = 0;
    this.shuttingDown = false;
    this.visible = true;
    this.cinematicReveal = 1;
    this.cinematicTargetReveal = 1;
    this.cinematicStage = 7;

    this.arcs = [];
    this.rings = [];
    this.arms = [];
    this.drones = [];
    this.particles = null;

    this.createCore();
    this.createPlatform();
    this.createOrbitalRings();
    this.createLightningArcs();
    this.createParticles();
    this.createCalibrationArms();
    this.createMaintenanceDrones();

    this.scene.add(this.group);
  }

  createCore() {
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x020817,
      emissive: 0x0b2b73,
      emissiveIntensity: 2.35,
      roughness: 0.16,
      metalness: 0.18,
      transmission: 0.2,
      thickness: 1.6,
      transparent: true,
      opacity: 0.96
    });

    this.core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(8.6, 5),
      coreMaterial
    );
    this.core.castShadow = true;
    this.group.add(this.core);

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });

    this.wireCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(9.1, 3),
      wireMaterial
    );
    this.group.add(this.wireCore);

    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e40af,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending
    });

    this.innerCore = new THREE.Mesh(
      new THREE.SphereGeometry(5.3, 48, 32),
      innerMaterial
    );
    this.group.add(this.innerCore);

    this.coreLight = new THREE.PointLight(
      0x246bff,
      170,
      180,
      1.45
    );
    this.group.add(this.coreLight);

    this.identityCanvas = document.createElement("canvas");
    this.identityCanvas.width = 1024;
    this.identityCanvas.height = 512;
    this.identityContext = this.identityCanvas.getContext("2d");
    this.identityTexture = new THREE.CanvasTexture(
      this.identityCanvas
    );
    this.identityTexture.colorSpace = THREE.SRGBColorSpace;

    const labelMaterial = new THREE.SpriteMaterial({
      map: this.identityTexture,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending
    });

    this.identityLabel = new THREE.Sprite(labelMaterial);
    this.identityLabel.scale.set(22.5, 11.25, 1);
    this.identityLabel.position.set(0, 0.15, 10.4);
    this.group.add(this.identityLabel);
    this.drawIdentityLabel("JEREMIAH", "LUPTON", "ENGINEERING PORTFOLIO");
  }

  drawIdentityLabel(
    lineOne,
    lineTwo,
    subtitle = "ENGINEERING PORTFOLIO",
    systemLine = "EES GENESIS ONLINE"
  ) {
    const context = this.identityContext;
    const width = this.identityCanvas.width;
    const height = this.identityCanvas.height;

    context.clearRect(0, 0, width, height);

    context.fillStyle = "rgba(1, 6, 20, 0.88)";
    context.strokeStyle = "rgba(56, 189, 248, 0.9)";
    context.lineWidth = 4;
    context.beginPath();
    context.roundRect(72, 42, 880, 425, 34);
    context.fill();
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.lineJoin = "round";

    const drawOutlinedText = (
      value,
      y,
      font,
      fill,
      outlineWidth,
      glow
    ) => {
      context.font = font;
      context.lineWidth = outlineWidth;
      context.strokeStyle = "#020617";
      context.shadowColor = glow;
      context.shadowBlur = 16;
      context.strokeText(value, width / 2, y);
      context.fillStyle = fill;
      context.fillText(value, width / 2, y);
      context.shadowBlur = 0;
    };

    drawOutlinedText(
      lineOne,
      135,
      "900 100px Arial, sans-serif",
      "#ffffff",
      18,
      "#2563eb"
    );

    drawOutlinedText(
      lineTwo,
      245,
      "900 100px Arial, sans-serif",
      "#ffffff",
      18,
      "#2563eb"
    );

    drawOutlinedText(
      subtitle,
      335,
      "800 31px Arial, sans-serif",
      "#e2e8f0",
      8,
      "#0284c7"
    );

    context.fillStyle = "rgba(3, 24, 52, 0.98)";
    context.strokeStyle = "#38bdf8";
    context.lineWidth = 3;
    context.beginPath();
    context.roundRect(238, 378, 548, 62, 18);
    context.fill();
    context.stroke();

    drawOutlinedText(
      systemLine,
      410,
      "900 31px Arial, sans-serif",
      "#67e8f9",
      7,
      "#22d3ee"
    );

    this.identityTexture.needsUpdate = true;
  }

  createPlatform() {
    const platform = new THREE.Group();
    this.platform = platform;
    platform.position.y = -11.2;

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x071426,
      metalness: 0.9,
      roughness: 0.24
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x1d75ff,
      transparent: true,
      opacity: 0.74,
      blending: THREE.AdditiveBlending
    });

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(13.2, 15.5, 2.2, 64),
      baseMaterial
    );
    platform.add(base);

    for (let index = 0; index < 4; index += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
          6.4 + index * 2.1,
          0.18 + index * 0.04,
          8,
          72
        ),
        glowMaterial.clone()
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.25 + index * 0.12;
      platform.add(ring);
      this.rings.push({
        mesh: ring,
        speed: index % 2 === 0 ? 0.4 : -0.32
      });
    }

    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.17,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.energyBeam = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 5.4, 20, 32, 1, true),
      beamMaterial
    );
    this.energyBeam.position.y = 10.5;
    platform.add(this.energyBeam);

    this.group.add(platform);
  }

  createOrbitalRings() {
    const ringColors = [0x3b82f6, 0x67e8f9, 0x8b5cf6];

    for (let index = 0; index < 5; index += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: ringColors[index % ringColors.length],
        transparent: true,
        opacity: 0.42 - index * 0.045,
        blending: THREE.AdditiveBlending
      });

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
          11.3 + index * 1.15,
          0.11 + (index % 2) * 0.05,
          8,
          96
        ),
        material
      );

      ring.rotation.set(
        Math.PI / 2 + index * 0.19,
        index * 0.37,
        index * 0.29
      );

      this.group.add(ring);
      this.rings.push({
        mesh: ring,
        speed: index % 2 === 0
          ? 0.18 + index * 0.025
          : -0.16 - index * 0.02
      });
    }
  }

  createLightningArcs() {
    const material = new THREE.LineBasicMaterial({
      color: 0xc4e7ff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    for (let index = 0; index < 11; index += 1) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(18 * 3);
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const line = new THREE.Line(geometry, material.clone());
      line.userData.seed = Math.random() * 100;
      line.userData.phase = Math.random() * Math.PI * 2;
      this.group.add(line);
      this.arcs.push(line);
    }
  }

  updateLightningArc(line, elapsed, index) {
    const positions = line.geometry.attributes.position.array;
    const pointCount = positions.length / 3;

    const angle =
      line.userData.seed +
      elapsed * (0.18 + index * 0.003);

    const start = new THREE.Vector3(
      Math.cos(angle) * 4.2,
      Math.sin(angle * 1.3) * 5.5,
      Math.sin(angle) * 4.2
    );

    const endAngle =
      angle + 1.7 + Math.sin(elapsed + index) * 0.55;

    const radius = 9.2 + (index % 4) * 1.35;
    const end = new THREE.Vector3(
      Math.cos(endAngle) * radius,
      Math.sin(endAngle * 0.72) * radius * 0.7,
      Math.sin(endAngle) * radius
    );

    for (let point = 0; point < pointCount; point += 1) {
      const t = point / (pointCount - 1);
      const jitter =
        Math.sin(
          elapsed * 19 +
          point * 4.7 +
          line.userData.phase
        ) * (1 - Math.abs(t - 0.5) * 1.5);

      const offset = new THREE.Vector3(
        Math.sin(point * 8.1 + line.userData.seed) * jitter * 0.55,
        Math.cos(point * 5.3 + line.userData.seed) * jitter * 0.75,
        Math.sin(point * 6.7 + line.userData.seed) * jitter * 0.55
      );

      const position = start
        .clone()
        .lerp(end, t)
        .add(offset);

      positions[point * 3] = position.x;
      positions[point * 3 + 1] = position.y;
      positions[point * 3 + 2] = position.z;
    }

    line.geometry.attributes.position.needsUpdate = true;
    line.material.opacity =
      0.35 +
      Math.max(
        0,
        Math.sin(elapsed * 8 + line.userData.phase)
      ) * 0.65;
  }

  createParticles() {
    const count = 520;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const radius = 10 + Math.random() * 17;
      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.5) * 16;

      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = elevation;
      positions[index * 3 + 2] = Math.sin(angle) * radius;
      phases[index] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "phase",
      new THREE.BufferAttribute(phases, 1)
    );

    const material = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.2,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.group.add(this.particles);
  }

  createCalibrationArms() {
    const armMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b1f3d,
      metalness: 0.88,
      roughness: 0.22
    });

    const jointMaterial = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      emissive: 0x1d4ed8,
      emissiveIntensity: 1.8,
      metalness: 0.75,
      roughness: 0.18
    });

    [-1, 1].forEach((side, armIndex) => {
      const armRoot = new THREE.Group();
      armRoot.position.set(side * 22, 8.5, 1);
      armRoot.rotation.z = side * -0.46;

      const upper = new THREE.Mesh(
        new THREE.CylinderGeometry(1.15, 1.55, 10, 12),
        armMaterial
      );
      upper.rotation.z = Math.PI / 2;
      armRoot.add(upper);

      const joint = new THREE.Mesh(
        new THREE.SphereGeometry(1.7, 18, 12),
        jointMaterial
      );
      joint.position.x = side * -5;
      armRoot.add(joint);

      const tool = new THREE.Group();
      tool.position.x = side * -9.2;

      const nozzle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.52, 1.05, 4.1, 12),
        armMaterial
      );
      nozzle.rotation.z = Math.PI / 2;
      tool.add(nozzle);

      const toolLight = new THREE.PointLight(
        0x38bdf8,
        35,
        24,
        2
      );
      toolLight.position.x = side * -2.2;
      tool.add(toolLight);

      armRoot.add(tool);
      this.group.add(armRoot);
      this.arms.push({
        group: armRoot,
        tool,
        side,
        phase: armIndex * Math.PI
      });
    });
  }

  createMaintenanceDrones() {
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      emissive: 0x172554,
      emissiveIntensity: 1.3,
      metalness: 0.82,
      roughness: 0.2
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    for (let index = 0; index < 5; index += 1) {
      const drone = new THREE.Group();

      const body = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.78, 1),
        bodyMaterial
      );
      drone.add(body);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.25, 0.09, 8, 28),
        glowMaterial
      );
      ring.rotation.x = Math.PI / 2;
      drone.add(ring);

      const light = new THREE.PointLight(
        0x67e8f9,
        10,
        12,
        2
      );
      drone.add(light);

      this.group.add(drone);
      this.drones.push({
        group: drone,
        radius: 13.2 + index * 1.25,
        speed: 0.25 + index * 0.035,
        height: -4 + index * 2.1,
        phase: index * (Math.PI * 2 / 5)
      });
    }
  }

  setProgress(progress) {
    this.intensity = THREE.MathUtils.clamp(progress, 0, 1);
    this.targetIntensity = Math.max(0.2, this.intensity);
  }

  beginActivationCinematic() {
    this.show();
    this.cinematicReveal = 0.015;
    this.cinematicTargetReveal = 0.015;
    this.cinematicStage = 0;

    this.core.visible = true;
    this.innerCore.visible = false;
    this.wireCore.visible = false;
    this.platform.visible = false;
    this.energyBeam.visible = false;
    this.identityLabel.visible = false;

    this.rings.forEach(({ mesh }) => {
      mesh.visible = false;
    });

    this.arcs.forEach((arc) => {
      arc.visible = false;
    });

    if (this.particles) {
      this.particles.visible = false;
    }

    this.arms.forEach(({ group }) => {
      group.visible = false;
    });

    this.drones.forEach(({ group }) => {
      group.visible = false;
    });

    this.core.material.emissiveIntensity = 0.18;
    this.coreLight.intensity = 0;
  }

  setActivationStage(stage) {
    this.cinematicStage = Math.max(0, Math.min(7, Number(stage) || 0));

    if (this.cinematicStage >= 1) {
      this.cinematicTargetReveal = 0.18;
      this.innerCore.visible = true;
    }

    if (this.cinematicStage >= 2) {
      this.cinematicTargetReveal = 0.62;
      this.wireCore.visible = true;
      this.particles.visible = true;
    }

    if (this.cinematicStage >= 3) {
      this.cinematicTargetReveal = 0.88;
      this.platform.visible = true;
      this.energyBeam.visible = true;
      this.rings.forEach(({ mesh }) => {
        mesh.visible = true;
      });
    }

    if (this.cinematicStage >= 4) {
      this.cinematicTargetReveal = 1;
      this.arcs.forEach((arc) => {
        arc.visible = true;
      });
    }

    if (this.cinematicStage >= 5) {
      this.arms.forEach(({ group }) => {
        group.visible = true;
      });
    }

    if (this.cinematicStage >= 6) {
      this.drones.forEach(({ group }) => {
        group.visible = true;
      });
    }

    if (this.cinematicStage >= 7) {
      this.cinematicTargetReveal = 1;
    }
  }

  completeActivationCinematic() {
    this.setActivationStage(7);
  }

  setIdentityLabelVisible(visible) {
    this.identityLabel.visible =
      Boolean(visible);
  }

  completeIdentityBoot() {
    this.drawIdentityLabel(
      "JEREMIAH",
      "LUPTON",
      "ENGINEERING PORTFOLIO",
      "EES GENESIS ONLINE"
    );
    this.targetIntensity = 1.35;
  }

  beginShutdown(onComplete) {
    if (this.shuttingDown) return;

    this.shuttingDown = true;
    this.shutdownProgress = 0;
    this.onShutdownComplete = onComplete;
  }

  hide() {
    this.visible = false;
    this.group.visible = false;
  }

  show() {
    this.visible = true;
    this.group.visible = true;
  }

  update(delta, elapsed) {
    if (!this.visible) return;

    this.elapsed = elapsed;

    if (this.shuttingDown) {
      this.shutdownProgress = Math.min(
        1,
        this.shutdownProgress + delta / 1.15
      );

      const collapse =
        1 - THREE.MathUtils.smoothstep(
          this.shutdownProgress,
          0,
          1
        );

      this.group.scale.setScalar(
        Math.max(0.001, collapse)
      );

      this.coreLight.intensity =
        170 +
        this.shutdownProgress * 520;

      this.identityLabel.material.opacity =
        collapse;

      if (this.shutdownProgress >= 1) {
        this.hide();
        this.shuttingDown = false;

        if (
          typeof this.onShutdownComplete ===
          "function"
        ) {
          this.onShutdownComplete();
        }
      }

      return;
    }

    this.cinematicReveal = THREE.MathUtils.damp(
      this.cinematicReveal,
      this.cinematicTargetReveal,
      3.6,
      delta
    );

    if (!this.shuttingDown) {
      this.group.scale.setScalar(
        Math.max(0.015, this.cinematicReveal)
      );
    }

    const cinematicEnergy =
      THREE.MathUtils.smoothstep(
        this.cinematicReveal,
        0,
        1
      );

    const pulse =
      1 +
      Math.sin(elapsed * 2.9) *
        (0.035 + this.intensity * 0.035) +
      Math.sin(elapsed * 8.4) * 0.012;

    this.core.scale.setScalar(pulse);
    this.innerCore.scale.setScalar(
      0.88 + Math.sin(elapsed * 3.7) * 0.08
    );
    this.innerCore.material.opacity =
      0.32 + this.intensity * 0.38;

    this.core.material.emissiveIntensity =
      0.2 +
      cinematicEnergy * (
        2.1 +
        this.intensity * 4.4 +
        Math.max(0, Math.sin(elapsed * 5.4)) * 1.2
      );

    this.coreLight.intensity =
      cinematicEnergy * (
        55 +
        this.intensity * 110 +
        Math.sin(elapsed * 4.2) * 24
      );

    this.wireCore.rotation.y += delta * 0.14;
    this.wireCore.rotation.x += delta * 0.045;
    this.innerCore.rotation.y -= delta * 0.1;
    this.energyBeam.material.opacity =
      0.08 +
      this.intensity * 0.22 +
      Math.max(0, Math.sin(elapsed * 4)) * 0.05;

    this.rings.forEach((ring, index) => {
      ring.mesh.rotation.z +=
        delta * ring.speed;

      ring.mesh.rotation.y +=
        delta * ring.speed * 0.26;

      ring.mesh.material.opacity =
        Math.max(
          0.1,
          (0.28 + this.intensity * 0.38) -
            index * 0.015
        );
    });

    this.arcs.forEach((arc, index) => {
      this.updateLightningArc(
        arc,
        elapsed,
        index
      );
    });

    this.particles.rotation.y += delta * 0.06;
    this.particles.rotation.x =
      Math.sin(elapsed * 0.18) * 0.12;
    this.particles.material.opacity =
      0.32 + this.intensity * 0.6;

    this.arms.forEach((arm) => {
      arm.group.rotation.y =
        Math.sin(elapsed * 0.42 + arm.phase) * 0.12;
      arm.group.rotation.z =
        arm.side *
        (-0.46 +
          Math.sin(elapsed * 0.72 + arm.phase) * 0.045);

      arm.tool.rotation.x =
        Math.sin(elapsed * 1.15 + arm.phase) * 0.2;
    });

    this.drones.forEach((drone, index) => {
      const angle =
        elapsed * drone.speed + drone.phase;

      drone.group.position.set(
        Math.cos(angle) * drone.radius,
        drone.height +
          Math.sin(elapsed * 1.6 + index) * 0.75,
        Math.sin(angle) * drone.radius
      );

      drone.group.rotation.y =
        -angle + Math.PI / 2;
      drone.group.rotation.z =
        Math.sin(elapsed * 2 + index) * 0.1;
    });

    this.identityLabel.material.opacity =
      0.82 +
      Math.sin(elapsed * 2.1) * 0.12;
  }
}
