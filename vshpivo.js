import { GameObject } from "./gameObject.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./vector.js";
import { resources } from "./resources.js";
import { events } from "./event.js";
import { score, setScore } from "./game.js";

export class Vshpivo extends GameObject {
  constructor(x, y) {
    super({ position: new Vector2(x, y) });
    this.PosOffset = new Vector2(-30, -35);

    this.body = new Sprite({
      resource: resources.images.vshpivo,
      frameSize: new Vector2(725, 925),
      frameBegin: new Vector2(0, 0),
      scale: 0.3,
      position: this.PosOffset,
    });
    this.addChild(this.body);

    events.on("HERO_POSITION", this, (pos) => {
      const roundedPlayerPosX = Math.round(pos.x);
      const roundedPlayerPosY = Math.round(pos.y);
      if (
        Math.abs(roundedPlayerPosX - this.position.x) <= 50 &&
        Math.abs(roundedPlayerPosY - this.position.y) <= 90
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
    setScore(score + 5);
    this.destroy();
  }
}
