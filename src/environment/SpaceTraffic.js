import * as THREE from "three";

export class SpaceTraffic {
  constructor(scene) {
    this.scene = scene;
    this.objects = [];
    this.colliders = [];
    this.colliders = [];
    this.createTraffic();
  }

  createTraffic() {
    const cargoMaterial = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.8,
      roughness: 0.3
    });

    const glowMaterial = new THREE.MeshStandardMaterial({
      color: 0x67e8f9,
      emissive: 0x0e7490,
      emissiveIntensity: 3
    });

    for (let index = 0; index < 8; index += 1) {
      const group = new THREE.Group();

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(8 + Math.random() * 8, 3, 4),
        cargoMaterial
      );

      const engine = new THREE.Mesh(
        new THREE.ConeGeometry(0.9, 4, 10),
        glowMaterial
      );

      engine.rotation.z = Math.PI / 2;
      engine.position.x = -7;

      group.add(body, engine);

      group.position.set(
        -450 + Math.random() * 900,
        50 + Math.random() * 260,
        -180 - Math.random() * 800
      );

      group.userData.speed = 8 + Math.random() * 16;
      group.userData.phase = Math.random() * Math.PI * 2;

      group.userData.colliderRadius = 7;
      group.userData.colliderType = "ship";
      group.userData.colliderRadius = 7;
      group.userData.colliderType = "ship";
      this.scene.add(group);
      this.objects.push(group);
      this.colliders.push(group);
      this.colliders.push(group);
    }

    for (let index = 0; index < 18; index += 1) {
      const asteroid = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2 + Math.random() * 6, 1),
        new THREE.MeshStandardMaterial({
          color: 0x3f3f46,
          roughness: 0.95,
          flatShading: true
        })
      );

      asteroid.position.set(
        -500 + Math.random() * 1000,
        20 + Math.random() * 300,
        -150 - Math.random() * 1000
      );

      asteroid.userData.drift = 2 + Math.random() * 6;
      asteroid.userData.rotation = new THREE.Vector3(
        Math.random(),
        Math.random(),
        Math.random()
      );

      asteroid.userData.colliderRadius = 2.5 + asteroid.geometry.parameters.radius;
      asteroid.userData.colliderType = "asteroid";
      asteroid.userData.colliderRadius = 4 + Math.random() * 5;
      asteroid.userData.colliderType = "asteroid";
      this.scene.add(asteroid);
      this.objects.push(asteroid);
      this.colliders.push(asteroid);
      this.colliders.push(asteroid);
    }
  }

  getColliders() {
    return this.colliders;
  }

  getColliders() {
    return this.colliders;
  }

  update(delta, elapsed) {
    this.objects.forEach((object) => {
      if (object.userData.speed) {
        object.position.x += object.userData.speed * delta;
        object.position.y += Math.sin(elapsed * 0.4 + object.userData.phase) * delta * 1.5;

        if (object.position.x > 520) {
          object.position.x = -520;
        }
      } else {
        object.position.x += object.userData.drift * delta;
        object.rotation.x += object.userData.rotation.x * delta * 0.18;
        object.rotation.y += object.userData.rotation.y * delta * 0.18;
        object.rotation.z += object.userData.rotation.z * delta * 0.18;

        if (object.position.x > 540) {
          object.position.x = -540;
        }
      }
    });
  }
}
