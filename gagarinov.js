import { GameObject } from "./gameObject.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./vector.js";
import { resources } from "./resources.js";
import { events } from "./event.js";
import {
  gameLoop,
  screenSizeX,
  screenSizeY,
  setPlusFactoryTime,
} from "./game.js";
import { angry_audio } from "./sounds.js";

export class Gagarinov extends GameObject {
  constructor(x, y) {
    super({ position: new Vector2(x, y) });

    this.speedVec = new Vector2(1, 0);
    this.speedVec.normalize();
    this.speed = 0;

    this.scale = 0.43;
    this.PosOffset = new Vector2(-250 * this.scale, -250 * this.scale);

    this.body = new Sprite({
      resource: resources.images.gagarinov,
      frameSize: new Vector2(500, 500),
      frameBegin: new Vector2(0, 200),
      scale: this.scale,
      position: this.PosOffset,
    });
    this.addChild(this.body);

    events.on("HERO_POSITION", this, (pos) => {
      const roundedPlayerPosX = Math.round(pos.x);
      const roundedPlayerPosY = Math.round(pos.y);
      if (
        Math.abs(roundedPlayerPosX - this.position.x) <= 300 * this.scale &&
        Math.abs(roundedPlayerPosY - this.position.y) <= 350 * this.scale
      ) {
        // console.log("fa");
        this.onColideWithHero();
      }
    });
  }

  onColideWithHero() {
    gameLoop.gameEnd();
  }

  getAngry() {
    if (gameLoop.isRunning) {
      angry_audio.play();
      this.speed = 4.5;
      setPlusFactoryTime(600);
    }
  }

  step(delta, root) {
    this.position.x += this.speedVec.x * this.speed;
    this.position.y += this.speedVec.y * this.speed;
    if (
      this.position.x < -this.PosOffset.x ||
      this.position.x > screenSizeX + this.PosOffset.x
    ) {
      this.speedVec.x *= -1;
    }
    if (
      this.position.y < -this.PosOffset.y ||
      this.position.y > screenSizeY + this.PosOffset.y
    ) {
      this.speedVec.y *= -1;
    }
  }
}
