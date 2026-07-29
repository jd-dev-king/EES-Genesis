export class Time {
  constructor() {
    this.previousTime = performance.now();
    this.delta = 0;
    this.elapsed = 0;
  }

  update() {
    const currentTime = performance.now();
    this.delta = Math.min((currentTime - this.previousTime) / 1000, 0.05);
    this.elapsed += this.delta;
    this.previousTime = currentTime;
  }
}
