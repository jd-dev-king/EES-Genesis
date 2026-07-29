import * as THREE from "three";

export class DestinationFacilitiesSystem {
  constructor({
    scene,
    robot,
    skyWorld,
    interfaceManager,
    zones
  }) {
    this.scene = scene;
    this.robot = robot;
    this.skyWorld = skyWorld;
    this.interface = interfaceManager;
    this.zones = zones;

    this.facilities = new Map();
    this.activeZoneId = null;
    this.lastAnnouncedZoneId = null;
    this.tmpPosition = new THREE.Vector3();

    this.createFacilities();
  }

  createFacilities() {
    this.zones.forEach((zone, index) => {
      const group = new THREE.Group();
      group.position.copy(zone.position);
      group.userData.zone = zone;
      group.userData.phase = Math.random() * Math.PI * 2;

      const facility =
        this.createFacilityByType(
          zone.visualType,
          zone,
          index
        );

      group.add(facility);
      this.scene.add(group);
      this.facilities.set(zone.id, group);
    });
  }

  createFacilityByType(type, zone, index) {
    if (type === "planet") {
      return this.createProjectEarthFacility(zone);
    }

    if (type === "moon") {
      return this.createJourneyMoonFacility(zone);
    }

    if (type === "nexus") {
      return this.createCapabilityNexusFacility(zone);
    }

    if (type === "station") {
      return this.createCommunicationsFacility(zone);
    }

    if (type === "satellite") {
      return this.createSourceCodeFacility(zone);
    }

    if (type === "constellation") {
      return this.createIdentityFacility(zone);
    }

    if (type === "gateway") {
      return this.createGatewayFacility(zone);
    }

    return this.createGenericFacility(zone, index);
  }

  material({
    color = 0x102b50,
    emissive = 0x0b2c64,
    emissiveIntensity = 1,
    metalness = 0.72,
    roughness = 0.32,
    transparent = false,
    opacity = 1
  } = {}) {
    return new THREE.MeshStandardMaterial({
      color,
      emissive,
      emissiveIntensity,
      metalness,
      roughness,
      transparent,
      opacity
    });
  }

  glowMaterial(color, opacity = 0.8) {
    return new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }

  createProjectEarthFacility() {
    const group = new THREE.Group();
    group.userData.type = "project-earth";

    const city = new THREE.Group();

    for (let index = 0; index < 18; index += 1) {
      const height = 4 + Math.random() * 14;
      const building = new THREE.Mesh(
        new THREE.BoxGeometry(
          2.5 + Math.random() * 2,
          height,
          2.5 + Math.random() * 2
        ),
        this.material({
          color: 0x16375c,
          emissive: 0x0b376f,
          emissiveIntensity: 1.15
        })
      );

      const angle =
        (index / 18) * Math.PI * 2;
      const radius = 25 + Math.random() * 15;

      building.position.set(
        Math.cos(angle) * radius,
        7 + height / 2,
        Math.sin(angle) * radius
      );

      building.rotation.y = -angle;
      city.add(building);
    }

    const factoryRing = new THREE.Mesh(
      new THREE.TorusGeometry(42, 0.6, 10, 96),
      this.glowMaterial(0x3ccfff, 0.5)
    );
    factoryRing.rotation.x = Math.PI / 2;
    factoryRing.position.y = 4;

    const cargo = this.createCargoOrbiters(
      4,
      48,
      0x49d8ff
    );

    group.add(city, factoryRing, cargo);
    group.userData.rotators = [factoryRing];
    group.userData.orbiters = [cargo];
    return group;
  }

  createJourneyMoonFacility() {
    const group = new THREE.Group();
    group.userData.type = "journey-moon";

    const archiveRing = new THREE.Mesh(
      new THREE.TorusGeometry(37, 0.7, 12, 96),
      this.glowMaterial(0xf4cf7d, 0.55)
    );
    archiveRing.rotation.x = Math.PI / 2;

    const timeline = new THREE.Group();
    for (let index = 0; index < 8; index += 1) {
      const beacon = new THREE.Mesh(
        new THREE.OctahedronGeometry(1.5, 0),
        this.glowMaterial(
          index % 2 === 0
            ? 0xf4cf7d
            : 0x6bdcff,
          0.8
        )
      );

      const angle =
        (index / 8) * Math.PI * 2;
      beacon.position.set(
        Math.cos(angle) * 30,
        5 + index * 2.8,
        Math.sin(angle) * 30
      );
      timeline.add(beacon);
    }

    group.add(archiveRing, timeline);
    group.userData.rotators = [archiveRing, timeline];
    return group;
  }

  createCapabilityNexusFacility() {
    const group = new THREE.Group();
    group.userData.type = "capability-nexus";

    const hub = new THREE.Mesh(
      new THREE.IcosahedronGeometry(7, 2),
      this.material({
        color: 0x24175f,
        emissive: 0x5420b8,
        emissiveIntensity: 2
      })
    );
    hub.position.y = 8;

    const nodes = new THREE.Group();
    const nodePositions = [];

    for (let index = 0; index < 12; index += 1) {
      const angle =
        (index / 12) * Math.PI * 2;
      const radius = index % 2 === 0 ? 31 : 23;
      const y = 6 + Math.sin(angle * 2) * 12;

      const node = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 16, 12),
        this.glowMaterial(
          index % 3 === 0
            ? 0x9f7cff
            : 0x5bdcff,
          0.85
        )
      );

      node.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );

      nodePositions.push(node.position.clone());
      nodes.add(node);
    }

    const lineMaterial =
      new THREE.LineBasicMaterial({
        color: 0x6dcfff,
        transparent: true,
        opacity: 0.3
      });

    nodePositions.forEach((position) => {
      const geometry =
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 8, 0),
          position
        ]);
      nodes.add(
        new THREE.Line(geometry, lineMaterial)
      );
    });

    group.add(hub, nodes);
    group.userData.rotators = [hub, nodes];
    return group;
  }

  createCommunicationsFacility() {
    const group = new THREE.Group();
    group.userData.type = "communications";

    const tower = new THREE.Mesh(
      new THREE.CylinderGeometry(4, 8, 34, 18),
      this.material({
        color: 0x17385d,
        emissive: 0x0c3f73,
        emissiveIntensity: 1.2
      })
    );
    tower.position.y = 17;

    const antenna = new THREE.Mesh(
      new THREE.ConeGeometry(8, 10, 16, 1, true),
      this.material({
        color: 0x285f8f,
        emissive: 0x0d6aa0,
        emissiveIntensity: 1.1,
        transparent: true,
        opacity: 0.8
      })
    );
    antenna.position.y = 39;

    const sweep = new THREE.Mesh(
      new THREE.TorusGeometry(23, 0.45, 8, 72),
      this.glowMaterial(0x6de5ff, 0.65)
    );
    sweep.rotation.x = Math.PI / 2;
    sweep.position.y = 24;

    group.add(tower, antenna, sweep);
    group.userData.rotators = [antenna, sweep];
    return group;
  }

  createSourceCodeFacility() {
    const group = new THREE.Group();
    group.userData.type = "source-code";

    const core = new THREE.Mesh(
      new THREE.BoxGeometry(13, 13, 13),
      this.material({
        color: 0x102a38,
        emissive: 0x0b694f,
        emissiveIntensity: 1.8
      })
    );
    core.position.y = 8;

    const repositoryNodes = new THREE.Group();
    for (let index = 0; index < 10; index += 1) {
      const node = new THREE.Mesh(
        new THREE.BoxGeometry(2.3, 2.3, 2.3),
        this.glowMaterial(0x43e7a7, 0.82)
      );
      const angle =
        (index / 10) * Math.PI * 2;
      node.position.set(
        Math.cos(angle) * 29,
        7 + Math.sin(angle * 3) * 8,
        Math.sin(angle) * 29
      );
      repositoryNodes.add(node);
    }

    const dataRing = new THREE.Mesh(
      new THREE.TorusGeometry(35, 0.55, 10, 96),
      this.glowMaterial(0x43e7a7, 0.5)
    );
    dataRing.rotation.x = Math.PI / 2;
    dataRing.position.y = 8;

    group.add(core, repositoryNodes, dataRing);
    group.userData.rotators = [
      core,
      repositoryNodes,
      dataRing
    ];
    return group;
  }

  createIdentityFacility() {
    const group = new THREE.Group();
    group.userData.type = "identity";

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(7, 24, 18),
      this.material({
        color: 0x3f2a0c,
        emissive: 0xc08320,
        emissiveIntensity: 2.1,
        metalness: 0.35
      })
    );
    core.position.y = 12;

    const bolts = new THREE.Group();
    for (let index = 0; index < 14; index += 1) {
      const bolt = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.15,
          0.35,
          10 + Math.random() * 12,
          5
        ),
        this.glowMaterial(
          index % 2 === 0
            ? 0xffd778
            : 0x73e5ff,
          0.68
        )
      );

      const angle =
        (index / 14) * Math.PI * 2;
      bolt.position.set(
        Math.cos(angle) * 24,
        12 + Math.sin(angle * 2) * 9,
        Math.sin(angle) * 24
      );
      bolt.rotation.z = angle;
      bolts.add(bolt);
    }

    const experienceRing = new THREE.Mesh(
      new THREE.TorusGeometry(31, 0.75, 12, 96),
      this.glowMaterial(0xf6cf79, 0.58)
    );
    experienceRing.rotation.x = Math.PI / 2;
    experienceRing.position.y = 12;

    group.add(core, bolts, experienceRing);
    group.userData.rotators = [
      core,
      bolts,
      experienceRing
    ];
    return group;
  }

  createGatewayFacility() {
    const group = new THREE.Group();
    group.userData.type = "ees-gateway";

    const ringOne = new THREE.Mesh(
      new THREE.TorusGeometry(28, 2.2, 16, 96),
      this.material({
        color: 0x163b7b,
        emissive: 0x0f68d4,
        emissiveIntensity: 2
      })
    );
    ringOne.position.y = 16;

    const ringTwo = new THREE.Mesh(
      new THREE.TorusGeometry(21, 1.2, 12, 96),
      this.glowMaterial(0x855dff, 0.62)
    );
    ringTwo.position.y = 16;

    const portal = new THREE.Mesh(
      new THREE.CircleGeometry(18, 64),
      this.glowMaterial(0x3377ff, 0.18)
    );
    portal.position.y = 16;

    const scaffolding = new THREE.Group();
    for (let index = 0; index < 6; index += 1) {
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 42, 1.2),
        this.material({
          color: 0x263d5d,
          emissive: 0x112544,
          emissiveIntensity: 0.8
        })
      );
      const angle =
        (index / 6) * Math.PI * 2;
      beam.position.set(
        Math.cos(angle) * 36,
        16,
        Math.sin(angle) * 36
      );
      scaffolding.add(beam);
    }

    const drones = this.createCargoOrbiters(
      5,
      41,
      0xa08aff
    );

    group.add(
      ringOne,
      ringTwo,
      portal,
      scaffolding,
      drones
    );

    group.userData.rotators = [
      ringOne,
      ringTwo,
      scaffolding
    ];
    group.userData.orbiters = [drones];
    return group;
  }

  createGenericFacility(zone, index) {
    const group = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(
        22 + index,
        0.6,
        10,
        72
      ),
      this.glowMaterial(0x5bdcff, 0.45)
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    group.userData.rotators = [ring];
    return group;
  }

  createCargoOrbiters(count, radius, color) {
    const group = new THREE.Group();

    for (let index = 0; index < count; index += 1) {
      const craft = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 1, 5),
        this.glowMaterial(color, 0.75)
      );

      craft.userData.orbitAngle =
        (index / count) * Math.PI * 2;
      craft.userData.orbitRadius =
        radius + Math.random() * 5;
      craft.userData.orbitSpeed =
        0.12 + Math.random() * 0.08;
      group.add(craft);
    }

    return group;
  }

  update(delta, elapsed) {
    const robotPosition = this.robot.getPosition();

    let nearestZone = null;
    let nearestDistance = Infinity;

    this.facilities.forEach((facility, zoneId) => {
      const zone = facility.userData.zone;
      const distance =
        robotPosition.distanceTo(zone.position);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestZone = zone;
      }

      const phase =
        facility.userData.phase || 0;

      facility.position.y =
        zone.position.y +
        Math.sin(
          elapsed * 0.35 + phase
        ) *
        1.1;

      const rotators =
        facility.children[0]?.userData.rotators ||
        facility.userData.rotators ||
        [];

      rotators.forEach((object, index) => {
        object.rotation.y +=
          delta *
          (0.08 + index * 0.035) *
          (index % 2 === 0 ? 1 : -1);
      });

      const orbiters =
        facility.children[0]?.userData.orbiters ||
        facility.userData.orbiters ||
        [];

      orbiters.forEach((orbiterGroup) => {
        orbiterGroup.children.forEach((craft) => {
          craft.userData.orbitAngle +=
            craft.userData.orbitSpeed *
            delta;

          craft.position.set(
            Math.cos(craft.userData.orbitAngle) *
              craft.userData.orbitRadius,
            12 +
              Math.sin(
                craft.userData.orbitAngle * 2
              ) *
                5,
            Math.sin(craft.userData.orbitAngle) *
              craft.userData.orbitRadius
          );

          craft.rotation.y =
            -craft.userData.orbitAngle +
            Math.PI / 2;
        });
      });

      const near =
        distance < Math.max(150, zone.radius * 3.2);

      facility.traverse((child) => {
        if (
          child.material?.emissiveIntensity !==
          undefined
        ) {
          const base =
            child.userData.facilityBaseEmissive ??
            child.material.emissiveIntensity;

          child.userData.facilityBaseEmissive =
            base;

          child.material.emissiveIntensity =
            base *
            (near
              ? 1.25 +
                Math.sin(elapsed * 2.3) * 0.14
              : 0.9);
        }
      });
    });

    this.updateApproachState(
      nearestZone,
      nearestDistance
    );
  }

  updateApproachState(zone, distance) {
    const inApproach =
      zone &&
      distance <
        Math.max(190, zone.radius * 4.2);

    const inDocking =
      zone &&
      distance <
        Math.max(95, zone.radius * 2.1);

    if (!inApproach) {
      if (this.activeZoneId !== null) {
        this.activeZoneId = null;
        this.interface.updateDestinationFacility({
          facility: "OPEN SPACE",
          approach: "CLEAR",
          docking: "STANDBY",
          zone: null
        });
        this.interface.setFacilityArrivalVisible(
          false
        );
      }
      return;
    }

    this.activeZoneId = zone.id;

    this.interface.updateDestinationFacility({
      facility: zone.title,
      approach: inDocking
        ? "FINAL"
        : "APPROACH",
      docking: inDocking
        ? "AVAILABLE"
        : "LINKING",
      zone
    });

    if (
      this.lastAnnouncedZoneId !==
      zone.id
    ) {
      this.lastAnnouncedZoneId = zone.id;
      this.interface.showFacilityArrival({
        title: zone.title,
        message:
          zone.arrivalMessage ||
          `${zone.title} approach corridor synchronized.`
      });
    }
  }
}
