import { GameObject } from "./gameObject.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./vector.js";
import { resources } from "./resources.js";
import { events } from "./event.js";
import { gameLoop } from "./game.js";

export class Conspect extends GameObject {
  constructor(x, y, vec) {
    super({ position: new Vector2(x, y) });

    this.speedVec = vec;
    this.speedVec.normalize();
    this.speed = 6;

    this.scale = 0.05;
    this.PosOffset = new Vector2(-18, -20);

    this.body = new Sprite({
      resource: resources.images.conspect,
      frameSize: new Vector2(800, 1000),
      frameBegin: new Vector2(200, 100),
      scale: this.scale,
      position: this.PosOffset,
    });
    this.addChild(this.body);

    events.on("HERO_POSITION", this, (pos) => {
      const roundedPlayerPosX = Math.round(pos.x);
      const roundedPlayerPosY = Math.round(pos.y);
      if (
        Math.abs(roundedPlayerPosX - this.position.x) <= 30 &&
        Math.abs(roundedPlayerPosY - this.position.y) <= 60
      ) {
        console.log("fa");
        this.onColideWithHero();
      }
    });

    setTimeout(() => {
      this.destroy();
    }, 5000);
  }

  onColideWithHero() {
    gameLoop.gameEnd();
  }

  step(delta, root) {
    this.position.x += this.speedVec.x * this.speed;
    this.position.y += this.speedVec.y * this.speed;
  }
}
