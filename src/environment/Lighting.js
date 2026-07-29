import * as THREE from "three";

export class Lighting {
  constructor(scene) {
    const ambientLight = new THREE.HemisphereLight(0x93c5fd, 0x020617, 1.75);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xffffff, 3.2);
    sun.position.set(100, 180, 80);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 900;
    sun.shadow.camera.left = -250;
    sun.shadow.camera.right = 250;
    sun.shadow.camera.top = 250;
    sun.shadow.camera.bottom = -250;
    scene.add(sun);

    const rimLight = new THREE.PointLight(0x38bdf8, 75, 180, 2);
    rimLight.position.set(-40, 30, 20);
    scene.add(rimLight);
  }
}
