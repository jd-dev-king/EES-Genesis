import * as THREE from "three";

export class SpaceEventSystem {
  constructor(scene, interfaceManager) {
    this.scene = scene;
    this.interface = interfaceManager;
    this.activeEvent = null;
    this.timer = 18;
    this.duration = 0;
    this.eventObjects = [];
    this.colliders = [];
    this.events = [
      {
        id: "meteor-shower",
        title: "Meteor Shower",
        description:
          "Fast-moving debris is crossing the Genesis Sector.",
        duration: 18
      },
      {
        id: "solar-flare",
        title: "Solar Flare",
        description:
          "High-energy radiation is illuminating the EES perimeter.",
        duration: 15
      },
      {
        id: "signal-blackout",
        title: "Signal Blackout",
        description:
          "Long-range communications are temporarily unstable.",
        duration: 14
      },
      {
        id: "nebula-drift",
        title: "Nebula Drift",
        description:
          "A dense energy cloud is moving through local space.",
        duration: 20
      },
      {
        id: "distress-beacon",
        title: "Engineering Distress Beacon",
        description:
          "A maintenance transmission has appeared in the sector.",
        duration: 22
      }
    ];
  }

  getColliders() {
    return this.colliders;
  }

  update(delta, elapsed) {
    if (!this.activeEvent) {
      this.timer -= delta;

      if (this.timer <= 0) {
        this.startRandomEvent();
      }

      return;
    }

    this.duration -= delta;
    this.animateEvent(delta, elapsed);

    if (this.duration <= 0) {
      this.endEvent();
    }
  }

  startRandomEvent() {
    const event =
      this.events[
        Math.floor(Math.random() * this.events.length)
      ];

    this.activeEvent = event;
    this.duration = event.duration;
    this.interface.showSpaceEvent(event);
    this.interface.setEventStatus(event.title.toUpperCase());

    if (event.id === "meteor-shower") {
      this.createMeteorShower();
    }

    if (event.id === "solar-flare") {
      this.createSolarFlare();
    }

    if (event.id === "nebula-drift") {
      this.createNebula();
    }

    if (event.id === "distress-beacon") {
      this.createDistressBeacon();
    }
  }

  createMeteorShower() {
    const material = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      emissive: 0xf59e0b,
      emissiveIntensity: 2
    });

    for (let index = 0; index < 18; index += 1) {
      const meteor = new THREE.Mesh(
        new THREE.IcosahedronGeometry(
          0.8 + Math.random() * 1.4,
          0
        ),
        material
      );

      meteor.position.set(
        -500 + Math.random() * 1000,
        120 + Math.random() * 240,
        -900 + Math.random() * 700
      );

      meteor.userData.velocity = new THREE.Vector3(
        45 + Math.random() * 35,
        -18 - Math.random() * 12,
        15 + Math.random() * 20
      );

      meteor.userData.colliderRadius =
        meteor.geometry.parameters.radius + 0.8;
      meteor.userData.colliderType =
        "event meteor";
      meteor.userData.collisionSeverity = 2.4;

      this.scene.add(meteor);
      this.eventObjects.push(meteor);
      this.colliders.push(meteor);
    }
  }

  createSolarFlare() {
    const light = new THREE.PointLight(
      0xf97316,
      180,
      900,
      1.6
    );

    light.position.set(420, 360, -760);
    this.scene.add(light);
    this.eventObjects.push(light);
  }

  createNebula() {
    const geometry = new THREE.SphereGeometry(
      160,
      32,
      20
    );

    const material = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
      depthWrite: false
    });

    const cloud = new THREE.Mesh(
      geometry,
      material
    );

    cloud.position.set(-140, 190, -520);
    this.scene.add(cloud);
    this.eventObjects.push(cloud);
  }

  createDistressBeacon() {
    const group = new THREE.Group();

    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(3.5, 0),
      new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0x991b1b,
        emissiveIntensity: 3
      })
    );

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(8, 0.4, 8, 48),
      new THREE.MeshBasicMaterial({
        color: 0xfca5a5,
        transparent: true,
        opacity: 0.65
      })
    );

    ring.rotation.x = Math.PI / 2;
    group.add(core, ring);
    group.position.set(120, 160, -460);
    group.userData.colliderRadius = 9;
    group.userData.colliderType = "distress beacon";
    group.userData.collisionSeverity = 1.8;

    this.scene.add(group);
    this.eventObjects.push(group);
    this.colliders.push(group);
  }

  animateEvent(delta, elapsed) {
    if (!this.activeEvent) return;

    if (this.activeEvent.id === "meteor-shower") {
      this.eventObjects.forEach((meteor) => {
        meteor.position.addScaledVector(
          meteor.userData.velocity,
          delta
        );
        meteor.rotation.x += delta * 2;
        meteor.rotation.y += delta * 1.4;
      });
    }

    if (this.activeEvent.id === "solar-flare") {
      const light = this.eventObjects[0];

      if (light) {
        light.intensity =
          150 + Math.sin(elapsed * 4) * 60;
      }
    }

    if (this.activeEvent.id === "nebula-drift") {
      const cloud = this.eventObjects[0];

      if (cloud) {
        cloud.position.x += delta * 8;
        cloud.rotation.y += delta * 0.04;
      }
    }

    if (this.activeEvent.id === "distress-beacon") {
      const beacon = this.eventObjects[0];

      if (beacon) {
        beacon.rotation.y += delta * 0.4;
        beacon.scale.setScalar(
          0.92 + Math.sin(elapsed * 2.5) * 0.08
        );
      }
    }
  }

  endEvent() {
    this.eventObjects.forEach((object) => {
      this.scene.remove(object);

      if (object.geometry) {
        object.geometry.dispose();
      }

      if (object.material) {
        object.material.dispose();
      }
    });

    this.eventObjects = [];
    this.colliders = [];
    this.activeEvent = null;
    this.timer = 26 + Math.random() * 24;

    this.interface.hideSpaceEvent();
    this.interface.setEventStatus("NONE");
  }
}
