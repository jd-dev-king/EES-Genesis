import * as THREE from "three";

export class SkyWorld {
  constructor(scene, zones) {
    this.scene = scene;
    this.zones = zones;
    this.visuals = new Map();
    this.staticColliders = [];

    this.scene.background = new THREE.Color(0x020617);
    this.scene.fog = new THREE.FogExp2(0x020617, 0.00105);

    this.createHangar();
    this.createLaunchPlatform();
    this.createZoneVisuals();
  }

  createHangar() {
    const group = new THREE.Group();

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.72,
      roughness: 0.34,
      side: THREE.DoubleSide
    });

    const glowMaterial = new THREE.MeshStandardMaterial({
      color: 0x67e8f9,
      emissive: 0x0e7490,
      emissiveIntensity: 3
    });

    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(120, 2, 90),
      wallMaterial
    );
    floor.position.set(0, -1, 42);
    group.add(floor);

    [-1, 1].forEach((side) => {
      const wall = new THREE.Mesh(
        new THREE.BoxGeometry(4, 48, 90),
        wallMaterial
      );
      wall.position.set(side * 58, 23, 42);
      group.add(wall);
    });

    const ceiling = new THREE.Mesh(
      new THREE.BoxGeometry(120, 3, 90),
      wallMaterial
    );
    ceiling.position.set(0, 48, 42);
    group.add(ceiling);

    for (let i = 0; i < 8; i += 1) {
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.3, 60),
        glowMaterial
      );
      strip.position.set(-42 + i * 12, 1.4, 42);
      group.add(strip);
    }

    const doorLeft = new THREE.Mesh(
      new THREE.BoxGeometry(54, 42, 4),
      wallMaterial
    );
    doorLeft.position.set(-29, 22, -2);
    group.add(doorLeft);

    const doorRight = doorLeft.clone();
    doorRight.position.x = 29;
    group.add(doorRight);

    this.scene.add(group);

    this.staticColliders.push(
      { type: "box", center: new THREE.Vector3(-58, 23, 42), halfSize: new THREE.Vector3(2, 24, 45), label: "Hangar wall" },
      { type: "box", center: new THREE.Vector3(58, 23, 42), halfSize: new THREE.Vector3(2, 24, 45), label: "Hangar wall" },
      { type: "box", center: new THREE.Vector3(0, 48, 42), halfSize: new THREE.Vector3(60, 1.5, 45), label: "Hangar ceiling" },
      { type: "box", center: new THREE.Vector3(0, -1, 42), halfSize: new THREE.Vector3(60, 1, 45), label: "Hangar floor" }
    );
  }

  createLaunchPlatform() {
    const group = new THREE.Group();

    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x172033, metalness: 0.78, roughness: 0.34
    });

    const glowMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, emissive: 0x075985, emissiveIntensity: 2.5
    });

    const base = new THREE.Mesh(new THREE.CylinderGeometry(19, 23, 3, 10), platformMaterial);
    base.position.set(0, 2, 34);
    base.receiveShadow = true;
    base.castShadow = true;
    group.add(base);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(17, 0.45, 10, 48), glowMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 3.7, 34);
    group.add(ring);

    for (let index = 0; index < 6; index += 1) {
      const angle = (index / 6) * Math.PI * 2;
      const beacon = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.42, 4, 8),
        glowMaterial
      );
      beacon.position.set(Math.cos(angle) * 15, 5, 34 + Math.sin(angle) * 15);
      group.add(beacon);
    }

    this.scene.add(group);
  }

  createZoneVisuals() {
    this.zones.forEach((zone) => {
      let visual;

      switch (zone.visualType) {
        case "constellation":
          visual = this.createConstellation(zone);
          break;
        case "moon":
          visual = this.createMoon(zone);
          break;
        case "station":
          visual = this.createStation(zone);
          break;
        case "satellite":
          visual = this.createSatellite(zone);
          break;
        case "nexus":
          visual = this.createNexus(zone);
          break;
        case "gateway":
          visual = this.createGateway(zone);
          break;
        default:
          visual = this.createPlanet(zone);
      }

      visual.position.copy(zone.position);
      this.scene.add(visual);
      visual.userData.zoneId = zone.id;
      visual.userData.visualType = zone.visualType;
      this.visuals.set(zone.id, visual);

      this.staticColliders.push({
        type: "sphere",
        center: zone.position.clone(),
        radius: this.getDestinationCollisionRadius(zone),
        label: zone.title,
        destinationId: zone.id
      });

      const landingPad = this.createLandingPad(zone);
      landingPad.position.copy(zone.position).add(zone.landingOffset);
      this.scene.add(landingPad);

      this.staticColliders.push({
        type: "sphere",
        center: landingPad.position.clone(),
        radius: 10.5,
        label: `${zone.title} landing pad`,
        landingPad: true,
        destinationId: zone.id
      });
      this.staticColliders.push({
        type: "sphere",
        center: landingPad.position.clone(),
        radius: 10.5,
        label: `${zone.title} landing pad`
      });
    });
  }

  createLandingPad(zone) {
    const group = new THREE.Group();

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(10, 12, 1.8, 12),
      new THREE.MeshStandardMaterial({
        color: 0x111827,
        metalness: 0.82,
        roughness: 0.28
      })
    );
    base.receiveShadow = true;
    base.castShadow = true;
    group.add(base);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(8.2, 0.45, 10, 48),
      this.glowMaterial(zone, 2.8)
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1;
    group.add(ring);

    const beacon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.5, 8, 8),
      this.glowMaterial(zone, 3.4)
    );
    beacon.position.y = 5;
    group.add(beacon);

    return group;
  }

  getDestinationCollisionRadius(zone) {
    switch (zone.visualType) {
      case "planet":
      case "moon":
        return zone.displayRadius * 1.02;
      case "station":
        return zone.displayRadius * 0.95;
      case "satellite":
        return zone.displayRadius * 1.15;
      case "nexus":
        return zone.displayRadius * 1.35;
      case "gateway":
        return zone.displayRadius * 1.2;
      case "constellation":
        return zone.displayRadius * 1.45;
      default:
        return zone.displayRadius;
    }
  }

  glowMaterial(zone, intensity = 2.2) {
    return new THREE.MeshStandardMaterial({
      color: zone.accentColor,
      emissive: zone.color,
      emissiveIntensity: intensity,
      metalness: 0.35,
      roughness: 0.2
    });
  }

  createPlanet(zone) {
    const group = new THREE.Group();
    const planet = new THREE.Mesh(
      new THREE.IcosahedronGeometry(zone.displayRadius, 3),
      new THREE.MeshStandardMaterial({ color: zone.color, roughness: 0.72, metalness: 0.05 })
    );
    planet.castShadow = true;
    planet.receiveShadow = true;
    group.add(planet);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(zone.displayRadius * 1.12, 32, 32),
      new THREE.MeshBasicMaterial({
        color: zone.accentColor, transparent: true, opacity: 0.16, side: THREE.BackSide
      })
    );
    group.add(atmosphere);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(zone.displayRadius * 1.42, zone.displayRadius * 1.48, 64),
      new THREE.MeshBasicMaterial({
        color: zone.accentColor, transparent: true, opacity: 0.42, side: THREE.DoubleSide
      })
    );
    ring.rotation.x = Math.PI / 2.8;
    group.add(ring);
    return group;
  }

  createMoon(zone) {
    const group = new THREE.Group();
    const moon = new THREE.Mesh(
      new THREE.IcosahedronGeometry(zone.displayRadius, 3),
      new THREE.MeshStandardMaterial({
        color: zone.color, roughness: 0.92, flatShading: true
      })
    );
    moon.castShadow = true;
    moon.receiveShadow = true;
    group.add(moon);

    const beacon = new THREE.Mesh(
      new THREE.TorusGeometry(zone.displayRadius * 1.35, 0.45, 12, 60),
      this.glowMaterial(zone)
    );
    beacon.rotation.x = Math.PI / 2;
    group.add(beacon);
    return group;
  }

  createConstellation(zone) {
    const group = new THREE.Group();
    const points = [];
    const starMaterial = this.glowMaterial(zone, 3);

    for (let index = 0; index < 10; index += 1) {
      const point = new THREE.Vector3(
        (Math.random() - 0.5) * 42,
        (Math.random() - 0.5) * 34,
        (Math.random() - 0.5) * 26
      );
      points.push(point);

      const star = new THREE.Mesh(
        new THREE.OctahedronGeometry(1.4 + Math.random() * 1.4, 0),
        starMaterial
      );
      star.position.copy(point);
      group.add(star);
    }

    group.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: zone.accentColor, transparent: true, opacity: 0.55 })
    ));

    return group;
  }

  createStation(zone) {
    const group = new THREE.Group();
    const metal = new THREE.MeshStandardMaterial({
      color: 0x334155, metalness: 0.82, roughness: 0.3
    });
    const glow = this.glowMaterial(zone, 3);

    const center = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 18, 12), metal);
    center.rotation.z = Math.PI / 2;
    group.add(center);

    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(zone.displayRadius, 1.3, 12, 64),
      metal
    );
    outerRing.rotation.x = Math.PI / 2;
    group.add(outerRing);

    const glowRing = new THREE.Mesh(
      new THREE.TorusGeometry(zone.displayRadius * 0.72, 0.38, 8, 64),
      glow
    );
    glowRing.rotation.x = Math.PI / 2;
    group.add(glowRing);

    for (let index = 0; index < 4; index += 1) {
      const angle = (index / 4) * Math.PI * 2;
      const module = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 5), metal);
      module.position.set(Math.cos(angle) * 18, Math.sin(angle) * 18, 0);
      module.rotation.z = angle;
      group.add(module);
    }
    return group;
  }

  createSatellite(zone) {
    const group = new THREE.Group();
    const metal = new THREE.MeshStandardMaterial({
      color: zone.color, metalness: 0.9, roughness: 0.22
    });
    const glow = this.glowMaterial(zone, 2.5);

    group.add(new THREE.Mesh(new THREE.BoxGeometry(12, 8, 10), metal));

    const panelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8, metalness: 0.35, roughness: 0.28
    });

    [-1, 1].forEach((side) => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(10, 0.8, 0.8), metal);
      arm.position.x = side * 10;
      group.add(arm);

      const panel = new THREE.Mesh(new THREE.BoxGeometry(15, 0.7, 8), panelMaterial);
      panel.position.x = side * 21;
      group.add(panel);
    });

    const dish = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 5, 3, 24, 1, true),
      glow
    );
    dish.position.y = 7;
    group.add(dish);
    return group;
  }

  createNexus(zone) {
    const group = new THREE.Group();
    const glow = this.glowMaterial(zone, 3);
    const metal = new THREE.MeshStandardMaterial({
      color: 0x3f3f46, metalness: 0.88, roughness: 0.22
    });

    group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(8, 1), glow));

    [0, Math.PI / 3, Math.PI / 2].forEach((rotation, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(zone.displayRadius + index * 5, 1.1, 12, 64),
        index === 1 ? glow : metal
      );
      ring.rotation.set(rotation, rotation * 0.55, rotation * 0.3);
      group.add(ring);
    });

    return group;
  }

  createGateway(zone) {
    const group = new THREE.Group();
    const glow = this.glowMaterial(zone, 4);
    const metal = new THREE.MeshStandardMaterial({
      color: 0x17132f, metalness: 0.85, roughness: 0.2
    });

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(zone.displayRadius, 3.5, 16, 96),
      metal
    );
    group.add(ring);

    const inner = new THREE.Mesh(
      new THREE.TorusGeometry(zone.displayRadius * 0.72, 1.1, 12, 96),
      glow
    );
    group.add(inner);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(zone.displayRadius * 0.34, 2),
      glow
    );
    group.add(core);

    for (let index = 0; index < 3; index += 1) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(4, 42, 4), metal);
      arm.position.set(
        Math.cos((index / 3) * Math.PI * 2) * 34,
        Math.sin((index / 3) * Math.PI * 2) * 34,
        0
      );
      arm.rotation.z = -(index / 3) * Math.PI * 2;
      group.add(arm);
    }

    return group;
  }

  getStaticColliders() {
    return this.staticColliders;
  }

  update(delta, elapsed) {
    this.zones.forEach((zone, index) => {
      const visual = this.visuals.get(zone.id);
      if (!visual) return;

      visual.rotation.y += delta * (0.04 + index * 0.008);
      visual.position.y = zone.position.y + Math.sin(elapsed * 0.35 + index) * 1.2;

      if (zone.visualType === "gateway" || zone.visualType === "nexus") {
        visual.rotation.z += delta * 0.025;
      }
    });
  }
}
