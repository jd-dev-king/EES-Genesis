import * as THREE from "three";

export class HiddenObjectsSystem {
  constructor(scene) {
    this.scene = scene;
    this.objects = [];
    this.createHiddenObjects();
  }

  createHiddenObjects() {
    const definitions = [
      {
        id: "genesis-data-fragment",
        title: "Genesis Data Fragment",
        category: "DATA FRAGMENT",
        description:
          "A fragmented record describing the earliest EES architecture.",
        position: new THREE.Vector3(-90, 72, -165),
        scanRange: 130,
        xp: 125,
        shape: "crystal"
      },
      {
        id: "automation-beacon",
        title: "Automation Beacon",
        category: "ENGINEERING BEACON",
        description:
          "A dormant control beacon transmitting automation-system telemetry.",
        position: new THREE.Vector3(128, 92, -295),
        scanRange: 145,
        xp: 150,
        shape: "beacon"
      },
      {
        id: "red-cross-service-record",
        title: "Service Record",
        category: "LEADERSHIP ARCHIVE",
        description:
          "A hidden archive representing disaster-response service and coordination.",
        position: new THREE.Vector3(-205, 126, -390),
        scanRange: 135,
        xp: 150,
        shape: "archive"
      },
      {
        id: "manufacturing-blueprint",
        title: "Manufacturing Blueprint",
        category: "ENGINEERING BLUEPRINT",
        description:
          "A process-intelligence blueprint containing manufacturing-system patterns.",
        position: new THREE.Vector3(42, 105, -440),
        scanRange: 150,
        xp: 175,
        shape: "crystal"
      },
      {
        id: "source-key",
        title: "Source Archive Key",
        category: "ACCESS KEY",
        description:
          "An encrypted key linked to repository history and technical releases.",
        position: new THREE.Vector3(232, 198, -590),
        scanRange: 130,
        xp: 175,
        shape: "key"
      },
      {
        id: "ees-core-shard",
        title: "EES Core Shard",
        category: "CORE ARTIFACT",
        description:
          "A high-energy shard carrying a partial Observe–Analyze–Act signature.",
        position: new THREE.Vector3(36, 255, -765),
        scanRange: 165,
        xp: 250,
        shape: "core"
      }
    ];

    definitions.forEach((definition) => {
      const group = this.createVisual(definition);
      group.position.copy(definition.position);
      group.visible = false;

      const record = {
        ...definition,
        object3D: group,
        discovered: false,
        scanned: false
      };

      group.userData.scannableId = definition.id;
      this.scene.add(group);
      this.objects.push(record);
    });
  }

  createVisual(definition) {
    const group = new THREE.Group();

    const glow = new THREE.MeshStandardMaterial({
      color: 0x67e8f9,
      emissive: 0x0891b2,
      emissiveIntensity: 3.5,
      metalness: 0.42,
      roughness: 0.16,
      transparent: true,
      opacity: 0.92
    });

    const dark = new THREE.MeshStandardMaterial({
      color: 0x172033,
      metalness: 0.82,
      roughness: 0.25
    });

    let body;

    switch (definition.shape) {
      case "beacon":
        body = new THREE.Mesh(
          new THREE.CylinderGeometry(1.3, 2.2, 8, 8),
          dark
        );
        group.add(body);

        const beaconRing = new THREE.Mesh(
          new THREE.TorusGeometry(4.2, 0.34, 8, 40),
          glow
        );
        beaconRing.rotation.x = Math.PI / 2;
        group.add(beaconRing);
        break;

      case "archive":
        body = new THREE.Mesh(
          new THREE.BoxGeometry(7, 5, 2),
          dark
        );
        group.add(body);

        const archiveCore = new THREE.Mesh(
          new THREE.BoxGeometry(4.8, 3.1, 2.5),
          glow
        );
        group.add(archiveCore);
        break;

      case "key":
        body = new THREE.Mesh(
          new THREE.TorusGeometry(2.4, 0.65, 10, 36),
          glow
        );
        group.add(body);

        const stem = new THREE.Mesh(
          new THREE.BoxGeometry(7, 0.9, 0.9),
          dark
        );
        stem.position.x = 5;
        group.add(stem);
        break;

      case "core":
        body = new THREE.Mesh(
          new THREE.IcosahedronGeometry(4.4, 1),
          glow
        );
        group.add(body);

        for (let index = 0; index < 3; index += 1) {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(6 + index * 1.5, 0.28, 8, 48),
            glow
          );
          ring.rotation.set(index * 0.8, index * 0.55, index * 0.3);
          group.add(ring);
        }
        break;

      case "crystal":
      default:
        body = new THREE.Mesh(
          new THREE.OctahedronGeometry(3.5, 0),
          glow
        );
        body.scale.set(0.75, 1.7, 0.75);
        group.add(body);
        break;
    }

    const light = new THREE.PointLight(
      0x67e8f9,
      28,
      45,
      2
    );
    group.add(light);

    return group;
  }

  getScannables() {
    return this.objects;
  }

  reveal(objectId) {
    const record = this.objects.find(
      (item) => item.id === objectId
    );

    if (!record) return;

    record.discovered = true;
    record.scanned = true;
    record.object3D.visible = true;
  }

  restoreDiscovered(ids = []) {
    ids.forEach((id) => this.reveal(id));
  }

  update(delta, elapsed) {
    this.objects.forEach((record, index) => {
      const object = record.object3D;

      if (!object.visible) return;

      object.rotation.y += delta * (0.35 + index * 0.03);
      object.position.y =
        record.position.y +
        Math.sin(elapsed * 1.1 + index) * 1.2;

      const pulse =
        0.9 + Math.sin(elapsed * 2.4 + index) * 0.08;

      object.scale.setScalar(pulse);
    });
  }
}
