import { GameObject } from "./gameObject.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./vector.js";
import { resources } from "./resources.js";
import { events } from "./event.js";
import { gameLoop } from "./game.js";

export class Gagarinov extends GameObject {
  constructor(x, y) {
    super({ position: new Vector2(x, y) });
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
}
