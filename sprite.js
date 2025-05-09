import { GameObject } from "./gameObject.js";
import { Vector2 } from "./vector.js";

export class Sprite extends GameObject {
  constructor({ resource, frameSize, frameBegin, scale, position }) {
    super({});
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(100, 100);
    this.frameBegin = frameBegin ?? new Vector2(0, 0);
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
  }

  drawImage(ctx, x, y) {
    if (!this.resource.isLoaded) {
      return;
    }
    // console.log(this.resource.image);
    ctx.drawImage(
      this.resource.image,
      this.frameBegin.x,
      this.frameBegin.y,
      this.frameSize.x,
      this.frameSize.y,
      x,
      y,
      this.frameSize.x * this.scale,
      this.frameSize.y * this.scale
    );
  }
}
