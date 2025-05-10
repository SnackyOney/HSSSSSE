import { GameObject } from "./gameObject.js";
import { Vector2 } from "./vector.js";

export class Text extends GameObject {
  constructor({ position, text = "" }) {
    super({});
    this.position = position ?? new Vector2(0, 0);
    this.text = text;
  }

  drawImage(ctx, x, y) {
    ctx.fillText(this.text, x, y);
  }
}
