import * as THREE from "three";

export class FacilityOperationsSystem {
  constructor({
    scene,
    robot,
    interfaceManager,
    zones
  }) {
    this.scene = scene;
    this.robot = robot;
    this.interface = interfaceManager;
    this.zones = zones;

    this.landingPads = new Map();
    this.currentZone = null;
    this.wasLanded = false;
    this.sequenceRunning = false;
    this.sequenceToken = 0;

    this.createLandingPads();
  }

  createLandingPads() {
    this.zones.forEach((zone, index) => {
      const group = new THREE.Group();
      const landingPosition =
        zone.position.clone().add(zone.landingOffset);

      group.position.copy(landingPosition);
      group.position.y -= 2.3;
      group.userData.zone = zone;
      group.userData.phase =
        (index / this.zones.length) * Math.PI * 2;

      const outer = new THREE.Mesh(
        new THREE.TorusGeometry(
          Math.max(14, zone.radius * 0.42),
          0.55,
          10,
          72
        ),
        new THREE.MeshBasicMaterial({
          color: 0x3ccfff,
          transparent: true,
          opacity: 0.15,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      outer.rotation.x = Math.PI / 2;

      const inner = new THREE.Mesh(
        new THREE.RingGeometry(
          Math.max(7, zone.radius * 0.2),
          Math.max(9, zone.radius * 0.27),
          48
        ),
        new THREE.MeshBasicMaterial({
          color: 0x2a78ff,
          transparent: true,
          opacity: 0.08,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      inner.rotation.x = -Math.PI / 2;

      const beacons = new THREE.Group();
      for (let beaconIndex = 0; beaconIndex < 8; beaconIndex += 1) {
        const beacon = new THREE.Mesh(
          new THREE.CylinderGeometry(0.35, 0.35, 2.2, 8),
          new THREE.MeshBasicMaterial({
            color: beaconIndex % 2 === 0
              ? 0x69e3ff
              : 0xf5cf79,
            transparent: true,
            opacity: 0.25
          })
        );

        const angle =
          (beaconIndex / 8) * Math.PI * 2;
        const radius =
          Math.max(13, zone.radius * 0.38);

        beacon.position.set(
          Math.cos(angle) * radius,
          1,
          Math.sin(angle) * radius
        );

        beacons.add(beacon);
      }

      group.add(outer, inner, beacons);
      group.userData.outer = outer;
      group.userData.inner = inner;
      group.userData.beacons = beacons;

      this.scene.add(group);
      this.landingPads.set(zone.id, group);
    });
  }

  update(delta, elapsed) {
    const position = this.robot.getPosition();
    let nearestZone = null;
    let nearestDistance = Infinity;

    this.zones.forEach((zone) => {
      const landingPoint =
        zone.position.clone().add(zone.landingOffset);
      const distance =
        position.distanceTo(landingPoint);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestZone = zone;
      }

      const pad = this.landingPads.get(zone.id);
      if (!pad) return;

      const approach =
        distance < zone.approachRadius;
      const final =
        distance < zone.landingRadius;
      const landed =
        this.robot.isLanded() &&
        nearestZone?.id === zone.id;

      const targetOpacity = landed
        ? 0.95
        : final
          ? 0.72
          : approach
            ? 0.35
            : 0.1;

      pad.userData.outer.material.opacity =
        THREE.MathUtils.damp(
          pad.userData.outer.material.opacity,
          targetOpacity,
          4,
          delta
        );

      pad.userData.inner.material.opacity =
        THREE.MathUtils.damp(
          pad.userData.inner.material.opacity,
          targetOpacity * 0.48,
          4,
          delta
        );

      pad.userData.outer.rotation.z +=
        delta * (landed ? 0.75 : final ? 0.42 : 0.12);

      pad.userData.inner.rotation.z -=
        delta * (landed ? 0.5 : 0.18);

      pad.userData.beacons.children.forEach(
        (beacon, index) => {
          beacon.material.opacity =
            Math.max(
              0.12,
              targetOpacity *
                (
                  0.55 +
                  Math.sin(
                    elapsed * 3 +
                    index * 0.8
                  ) *
                    0.35
                )
            );

          beacon.scale.y =
            1 +
            Math.sin(
              elapsed * 2.4 +
              index
            ) *
              (final ? 0.42 : 0.14);
        }
      );
    });

    const landedNow = this.robot.isLanded();

    if (
      landedNow &&
      !this.wasLanded &&
      nearestZone
    ) {
      this.currentZone = nearestZone;
      this.beginDockSequence(nearestZone);
    }

    if (
      !landedNow &&
      this.wasLanded
    ) {
      this.endDockSequence();
    }

    this.wasLanded = landedNow;
  }

  beginDockSequence(zone) {
    this.sequenceRunning = true;
    this.sequenceToken += 1;
    const token = this.sequenceToken;

    this.interface.openFacilityOperations(
      zone
    );

    const steps = [
      {
        message:
          "Visitor credentials verified.",
        power: 18,
        data: "AUTHENTICATING",
        portal: "LOCKED"
      },
      {
        message:
          "Docking clamps stabilized.",
        power: 34,
        data: "LINKING",
        portal: "LOCKED"
      },
      {
        message:
          "Facility power bus connected.",
        power: 72,
        data: "CONNECTED",
        portal: "LOCKED"
      },
      {
        message:
          "Local data core synchronized.",
        power: 91,
        data: "ONLINE",
        portal: "AUTHORIZING"
      },
      {
        message:
          "Destination portal authorized.",
        power: 100,
        data: "ONLINE",
        portal: "READY"
      }
    ];

    let index = 0;

    const advance = () => {
      if (
        !this.sequenceRunning ||
        token !== this.sequenceToken ||
        !this.robot.isLanded()
      ) {
        return;
      }

      if (index >= steps.length) {
        this.interface.completeFacilityOperations(
          zone
        );
        return;
      }

      this.interface.updateFacilityOperations({
        index,
        total: steps.length,
        ...steps[index]
      });

      index += 1;
      window.setTimeout(advance, 520);
    };

    window.setTimeout(advance, 280);
  }

  endDockSequence() {
    this.sequenceRunning = false;
    this.sequenceToken += 1;
    this.interface.closeFacilityOperations();
    this.currentZone = null;
  }
}
