export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  normalize() {
    let old_x = this.x;
    this.x /= Math.sqrt(this.x * this.x + this.y * this.y);
    this.y /= Math.sqrt(old_x * old_x + this.y * this.y);
  }
}
