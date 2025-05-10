import { GameObject } from "./gameObject.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./vector.js";
import { resources } from "./resources.js";
import { events } from "./event.js";
import { gameLoop } from "./game.js";

export class Plus extends GameObject {
  constructor(x, y, playerPosX, playerPosY) {
    super({ position: new Vector2(x, y) });

    this.speedVec = new Vector2(playerPosX - x, playerPosY - y);
    this.speedVec.normalize();
    this.speed = 5;

    this.scale = 0.1;
    this.PosOffset = new Vector2(-255 * this.scale, -255 * this.scale);

    this.body = new Sprite({
      resource: resources.images.plus,
      frameSize: new Vector2(510, 510),
      frameBegin: new Vector2(0, 0),
      scale: this.scale,
      position: this.PosOffset,
    });
    this.addChild(this.body);

    events.on("HERO_POSITION", this, (pos) => {
      const roundedPlayerPosX = Math.round(pos.x);
      const roundedPlayerPosY = Math.round(pos.y);
      if (
        Math.abs(roundedPlayerPosX - this.position.x) <= 35 &&
        Math.abs(roundedPlayerPosY - this.position.y) <= 60
      ) {
        // console.log("fa");
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
