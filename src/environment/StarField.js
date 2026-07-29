import * as THREE from "three";

export class StarField {
  constructor(scene) {
    this.scene = scene;
    this.points = null;
    this.create();
  }

  create() {
    const starCount = window.matchMedia("(max-width: 768px)").matches ? 1400 : 3600;
    const positions = new Float32Array(starCount * 3);

    for (let index = 0; index < starCount; index += 1) {
      const radius = 180 + Math.random() * 1000;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.cos(phi);
      positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.25,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.86,
      depthWrite: false
    });

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);
  }

  update(delta) {
    if (this.points) this.points.rotation.y += delta * 0.004;
  }
}
