import { GameObject } from "./gameObject.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./vector.js";
import { resources } from "./resources.js";
import { events } from "./event.js";
import { gameLoop, conspectBurst } from "./game.js";
import { gusev_audio, pop_audio } from "./sounds.js";

export class Gusev extends GameObject {
  constructor(x, y) {
    super({ position: new Vector2(x, y) });
    this.scale = 0.2;
    this.PosOffset = new Vector2(-25, -33);
    this.body = new Sprite({
      resource: resources.images.gusev,
      frameSize: new Vector2(300, 300),
      frameBegin: new Vector2(0, 0),
      scale: this.scale,
      position: this.PosOffset,
    });
    this.addChild(this.body);
    if (gameLoop.isRunning) {
      gusev_audio.play();
    }
    events.on("HERO_POSITION", this, (pos) => {
      const roundedPlayerPosX = Math.round(pos.x);
      const roundedPlayerPosY = Math.round(pos.y);
      if (
        Math.abs(roundedPlayerPosX - this.position.x) <= 35 &&
        Math.abs(roundedPlayerPosY - this.position.y) <= 75
      ) {
        this.onColideWithHero();
      }
    });

    setTimeout(() => {
      if (gameLoop.isRunning) {
        pop_audio.play();
      }
      conspectBurst(this.position);
      this.destroy();
    }, 2500);
  }

  onColideWithHero() {
    gameLoop.gameEnd();
  }
}
