import * as THREE from "three";

export class AutonomousDroneSystem {
  constructor(scene, zones) {
    this.scene = scene;
    this.zones = zones;
    this.drones = [];
    this.colliders = [];
    this.routes = this.createRoutes();
    this.createDrones();
  }

  createRoutes() {
    const routes = [];

    for (let index = 0; index < this.zones.length; index += 1) {
      const current = this.zones[index];
      const next = this.zones[(index + 1) % this.zones.length];

      routes.push([
        current.position.clone().add(new THREE.Vector3(0, 28, 36)),
        current.position.clone().lerp(next.position, 0.5).add(
          new THREE.Vector3(0, 45 + index * 3, 0)
        ),
        next.position.clone().add(new THREE.Vector3(0, 28, 36))
      ]);
    }

    return routes;
  }

  createDrones() {
    const classes = [
      "SCOUT",
      "CARGO",
      "MAINTENANCE",
      "SECURITY",
      "RESEARCH"
    ];

    for (let index = 0; index < 24; index += 1) {
      const droneClass = classes[index % classes.length];
      const route = this.routes[index % this.routes.length];
      const group = this.createDroneVisual(droneClass);

      group.position.copy(route[0]);
      group.userData = {
        droneClass,
        route,
        segment: 0,
        progress: Math.random(),
        speed: 0.035 + Math.random() * 0.035,
        phase: Math.random() * Math.PI * 2,
        colliderRadius:
          droneClass === "CARGO" ? 4.8 :
          droneClass === "MAINTENANCE" ? 3.5 :
          3.0,
        colliderType: `${droneClass.toLowerCase()} drone`,
        collisionSeverity:
          droneClass === "CARGO" ? 2.0 : 1.25
      };

      this.scene.add(group);
      this.drones.push(group);
      this.colliders.push(group);
    }
  }

  createDroneVisual(droneClass) {
    const group = new THREE.Group();

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color:
        droneClass === "SCOUT" ? 0x38bdf8 :
        droneClass === "CARGO" ? 0xf59e0b :
        droneClass === "MAINTENANCE" ? 0x22c55e :
        droneClass === "SECURITY" ? 0xef4444 :
        0xa855f7,
      metalness: 0.82,
      roughness: 0.24
    });

    const glowMaterial = new THREE.MeshStandardMaterial({
      color: 0x67e8f9,
      emissive: 0x0891b2,
      emissiveIntensity: 2.8
    });

    const body = new THREE.Mesh(
      new THREE.IcosahedronGeometry(
        droneClass === "CARGO" ? 2.2 : 1.5,
        1
      ),
      bodyMaterial
    );

    group.add(body);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(
        droneClass === "CARGO" ? 3.1 : 2.2,
        0.18,
        8,
        28
      ),
      glowMaterial
    );

    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    if (droneClass === "MAINTENANCE") {
      [-1, 1].forEach((side) => {
        const arm = new THREE.Mesh(
          new THREE.BoxGeometry(0.3, 3.4, 0.3),
          bodyMaterial
        );
        arm.position.x = side * 1.8;
        group.add(arm);
      });
    }

    if (droneClass === "CARGO") {
      const cargo = new THREE.Mesh(
        new THREE.BoxGeometry(3.8, 2.2, 3.8),
        new THREE.MeshStandardMaterial({
          color: 0x334155,
          metalness: 0.72,
          roughness: 0.32
        })
      );
      cargo.position.y = -2.4;
      group.add(cargo);
    }

    return group;
  }

  getColliders() {
    return this.colliders;
  }

  update(delta, elapsed) {
    this.drones.forEach((drone, index) => {
      const data = drone.userData;
      const route = data.route;

      const from = route[data.segment];
      const to = route[(data.segment + 1) % route.length];

      data.progress += data.speed * delta;

      if (data.progress >= 1) {
        data.progress = 0;
        data.segment =
          (data.segment + 1) % route.length;
      }

      drone.position.lerpVectors(
        from,
        to,
        data.progress
      );

      drone.position.y +=
        Math.sin(elapsed * 1.8 + data.phase) * 0.18;

      const direction = to.clone().sub(from).normalize();
      drone.rotation.y = Math.atan2(
        -direction.x,
        -direction.z
      );

      drone.rotation.z =
        Math.sin(elapsed * 1.4 + index) * 0.08;
    });
  }

  getStatusReport() {
    const counts = {};

    this.drones.forEach((drone) => {
      const type = drone.userData.droneClass;
      counts[type] = (counts[type] || 0) + 1;
    });

    return counts;
  }
}
