import { events } from "./event.js";
import { Vector2 } from "./vector.js";

export class GameObject {
  constructor({ position }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null; 
  }

  stepEntry(delta, root) {
    this.children.forEach((child) => {
      child.stepEntry(delta, root);
    });
    this.step(delta, root);
  }

  step(delta) {}

  draw(ctx, x, y) {
    let drawPosX = x + this.position.x;
    let drawPosY = y + this.position.y;
    this.drawImage(ctx, drawPosX, drawPosY);
    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  destroy() {
    this.children.forEach((kid) => {
      kid.destroy();
    });
    this.parent.removeChild(this);
  }

  drawImage(ctx, drawPosX, drawPosY) {}

  addChild(gameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    events.unsubscribe(gameObject);
    this.children = this.children.filter((g) => {
      return g !== gameObject;
    });
  }
}
