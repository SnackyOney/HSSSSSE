import { GameObject } from "./gameObject.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./vector.js";
import { resources } from "./resources.js";
import { events } from "./event.js";
import { gameLoop, screenSizeX, screenSizeY } from "./game.js";
import { getRandomNumber } from "./tools.js";
import { guard_audio } from "./sounds.js";

export class Guard extends GameObject {
  constructor(x, y, playerPosX, playerPosY) {
    super({ position: new Vector2(x, y) });
    if (gameLoop.isRunning) {
      guard_audio.play();
    }
    this.speedVec = new Vector2(
      getRandomNumber(50, 150),
      getRandomNumber(50, 150)
    );
    this.speedVec.normalize();
    this.speed = 7;

    this.scale = 0.6;
    this.PosOffset = new Vector2(-93, -75);

    this.body = new Sprite({
      resource: resources.images.guard,
      frameSize: new Vector2(510, 510),
      frameBegin: new Vector2(50, 55),
      scale: this.scale,
      position: this.PosOffset,
    });
    this.addChild(this.body);

    events.on("HERO_POSITION", this, (pos) => {
      const roundedPlayerPosX = Math.round(pos.x);
      const roundedPlayerPosY = Math.round(pos.y);
      if (
        Math.abs(roundedPlayerPosX - this.position.x) <= 115 &&
        Math.abs(roundedPlayerPosY - this.position.y) <= 90
      ) {
        console.log("fa");
        this.onColideWithHero();
      }
    });
  }

  onColideWithHero() {
    gameLoop.gameEnd();
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
