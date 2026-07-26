import * as THREE from "three";

export class LivingVerseSystem {
  constructor({ scene, robot, skyWorld, interfaceManager, zones }) {
    this.scene = scene;
    this.robot = robot;
    this.skyWorld = skyWorld;
    this.interface = interfaceManager;
    this.zones = zones;
    this.elapsed = 0;
    this.eventElapsed = 0;
    this.nextEventDelay = 12 + Math.random() * 10;
    this.activeEvents = [];
    this.dataPackets = [];

    this.eventDefinitions = [
      ["comet", "Comet crossing the outer engineering sector."],
      ["cargo", "Autonomous cargo vessel entering a maintenance route."],
      ["relay", "Communications relay pulse detected."],
      ["packet", "Repository data packet transferred across the Verse."]
    ];

    this.createAmbientPackets();
  }

  createAmbientPackets() {
    for (let index = 0; index < 18; index += 1) {
      const packet = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.45, 2.8),
        new THREE.MeshBasicMaterial({
          color: 0x41e6a8,
          transparent: true,
          opacity: 0.75,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );

      packet.position.set(
        (Math.random() - 0.5) * 900,
        20 + Math.random() * 220,
        (Math.random() - 0.5) * 900
      );

      packet.userData.speed = 12 + Math.random() * 20;
      packet.userData.phase = Math.random() * Math.PI * 2;
      packet.visible = false;
      this.scene.add(packet);
      this.dataPackets.push(packet);
    }
  }

  start() {
    this.dataPackets.forEach((packet) => {
      packet.visible = true;
    });
    this.interface.setVerseActivityVisible(true);
    this.interface.updateVerseActivity(
      "Engineering Verse operating normally."
    );
  }

  update(delta, elapsed) {
    this.elapsed += delta;
    this.eventElapsed += delta;
    this.updateDestinationActivity(delta, elapsed);
    this.updateDataPackets(delta, elapsed);
    this.updateTransientEvents(delta);
    this.updateTelemetry(elapsed);

    if (this.eventElapsed >= this.nextEventDelay) {
      this.eventElapsed = 0;
      this.nextEventDelay = 14 + Math.random() * 16;
      this.triggerRandomEvent();
    }
  }

  updateDestinationActivity(delta, elapsed) {
    this.zones.forEach((zone, index) => {
      const visual = this.skyWorld.visuals.get(zone.id);
      if (!visual) return;

      const pulse =
        1 +
        Math.sin(elapsed * 1.1 + index * 0.72) *
          (zone.visualType === "gateway" ? 0.025 : 0.012);

      visual.scale.setScalar(pulse);

      visual.children.forEach((child, childIndex) => {
        if (child.geometry?.type === "TorusGeometry") {
          child.rotation.z +=
            delta *
            (0.035 + childIndex * 0.012) *
            (index % 2 === 0 ? 1 : -1);
        }

        if (child.material?.emissiveIntensity !== undefined) {
          const base =
            child.userData.baseEmissiveIntensity ??
            child.material.emissiveIntensity;

          child.userData.baseEmissiveIntensity = base;
          child.material.emissiveIntensity = Math.max(
            0.35,
            base +
              Math.sin(elapsed * 1.8 + index + childIndex) *
                0.35
          );
        }
      });
    });
  }

  updateDataPackets(delta, elapsed) {
    this.dataPackets.forEach((packet, index) => {
      packet.position.z -= packet.userData.speed * delta;
      packet.position.y +=
        Math.sin(elapsed * 0.7 + packet.userData.phase) *
        delta *
        0.8;
      packet.rotation.z = elapsed * 0.8 + index;

      if (packet.position.z < -520) {
        packet.position.z = 520;
        packet.position.x = (Math.random() - 0.5) * 900;
        packet.position.y = 20 + Math.random() * 220;
      }
    });
  }

  triggerRandomEvent() {
    const [type, message] =
      this.eventDefinitions[
        Math.floor(Math.random() * this.eventDefinitions.length)
      ];

    if (type === "comet") this.createComet();
    else if (type === "cargo") this.createCargoVessel();
    else if (type === "relay") this.createRelayPulse();
    else this.createPacketBurst();

    this.interface.updateVerseActivity(message);
    this.interface.showGuide("AURA Verse report", message);
  }

  createComet() {
    const group = new THREE.Group();
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.7, 1),
      new THREE.MeshBasicMaterial({ color: 0xe5f7ff })
    );
    const tail = new THREE.Mesh(
      new THREE.ConeGeometry(2.8, 24, 10, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0x55cfff,
        transparent: true,
        opacity: 0.34,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    tail.rotation.x = Math.PI / 2;
    tail.position.z = 12;
    group.add(core, tail);
    group.position.set(-430, 210, 310);
    group.userData.velocity = new THREE.Vector3(88, -14, -73);
    group.userData.life = 11;
    this.scene.add(group);
    this.activeEvents.push(group);
  }

  createCargoVessel() {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(12, 4, 28),
      new THREE.MeshStandardMaterial({
        color: 0x152d50,
        emissive: 0x09255a,
        emissiveIntensity: 1.3,
        metalness: 0.82,
        roughness: 0.25
      })
    );
    const engine = new THREE.Mesh(
      new THREE.BoxGeometry(7, 1.1, 4),
      new THREE.MeshBasicMaterial({
        color: 0x5ee7ff,
        transparent: true,
        opacity: 0.85
      })
    );
    engine.position.z = 15;
    group.add(body, engine);
    group.position.set(380, 95, -300);
    group.rotation.y = -0.8;
    group.userData.velocity = new THREE.Vector3(-58, 4, 48);
    group.userData.life = 15;
    this.scene.add(group);
    this.activeEvents.push(group);
  }

  createRelayPulse() {
    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(10, 24, 16),
      new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      })
    );

    const source =
      this.zones.find((zone) => zone.visualType === "station") ||
      this.zones[0];

    pulse.position.copy(source.position);
    pulse.userData.life = 3.5;
    pulse.userData.expand = true;
    this.scene.add(pulse);
    this.activeEvents.push(pulse);
  }

  createPacketBurst() {
    for (let index = 0; index < 8; index += 1) {
      const packet = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.7, 5),
        new THREE.MeshBasicMaterial({
          color: 0x3ee7a4,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending
        })
      );

      packet.position.set(
        -160 + Math.random() * 80,
        55 + Math.random() * 50,
        220 + Math.random() * 60
      );
      packet.userData.velocity = new THREE.Vector3(
        42 + Math.random() * 25,
        (Math.random() - 0.5) * 8,
        -55 - Math.random() * 20
      );
      packet.userData.life = 6;
      this.scene.add(packet);
      this.activeEvents.push(packet);
    }
  }

  updateTransientEvents(delta) {
    for (let index = this.activeEvents.length - 1; index >= 0; index -= 1) {
      const object = this.activeEvents[index];
      object.userData.life -= delta;

      if (object.userData.expand) {
        object.scale.addScalar(delta * 5.5);
        object.material.opacity = Math.max(
          0,
          object.userData.life / 3.5
        );
      } else {
        object.position.addScaledVector(
          object.userData.velocity,
          delta
        );
      }

      if (object.userData.life <= 0) {
        this.scene.remove(object);
        object.traverse((child) => {
          child.geometry?.dispose?.();
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose?.());
          } else {
            child.material?.dispose?.();
          }
        });
        this.activeEvents.splice(index, 1);
      }
    }
  }

  updateTelemetry(elapsed) {
    const position = this.robot.getPosition();
    const speed = this.robot.currentSpeed || 0;
    const power =
      18 + Math.min(58, speed * 1.6) + Math.sin(elapsed * 0.7) * 3;
    const navigation = 96 + Math.sin(elapsed * 0.23) * 3;
    const portal = 97 + Math.sin(elapsed * 0.16 + 1.4) * 2;

    let nearestZone = null;
    let nearestDistance = Infinity;

    this.zones.forEach((zone) => {
      const distance = position.distanceTo(zone.position);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestZone = zone;
      }
    });

    this.interface.updateLivingTelemetry({
      elapsed: this.elapsed,
      power,
      navigation,
      portal,
      sector:
        nearestDistance < 170
          ? nearestZone?.title || "OPEN SPACE"
          : "OPEN SPACE",
      activity: this.activeEvents.length > 0 ? "ACTIVE" : "NOMINAL"
    });
  }
}
