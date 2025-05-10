import { GameObject } from "./gameObject.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./vector.js";
import { resources } from "./resources.js";
import { events } from "./event.js";
import { Text } from "./text.js";
import { gameLoop } from "./game.js";
import { deadline_audio } from "./sounds.js";

export class Contest extends GameObject {
  constructor(x, y) {
    super({ position: new Vector2(x, y) });
    if (gameLoop.isRunning) {
      deadline_audio.play();
    }
    this.PosOffset = new Vector2(-190, -20);
    this.time = 5;
    setInterval(() => {
      this.time -= 1;
    }, 1000);

    this.body = new Sprite({
      resource: resources.images.contest1,
      frameSize: new Vector2(300, 175),
      frameBegin: new Vector2(0, 0),
      scale: 0.7,
      position: this.PosOffset,
    });
    this.addChild(this.body);

    this.text = "";
    this.text2 = "";

    this.renderText = () => {
      this.removeChild(this.text);
      this.removeChild(this.text2);
      this.text = new Text({
        position: new Vector2(this.PosOffset.x - 0, this.PosOffset.y + 50),
        text: "Осталось до конца",
      });
      this.addChild(this.text);
      this.text2 = new Text({
        position: new Vector2(this.PosOffset.x - 0, this.PosOffset.y + 75),
        text: "контеста: " + this.time,
      });
      this.addChild(this.text2);
    };

    this.renderText();

    this.spaceCheck = (e) => {
      if (e.code === "Space") {
        this.destroy();
      }
    };

    events.on("HERO_POSITION", this, (pos) => {
      if (this.time <= 0) {
        gameLoop.gameEnd();
      }
      const roundedPlayerPosX = Math.round(pos.x);
      const roundedPlayerPosY = Math.round(pos.y);
      if (
        Math.abs(roundedPlayerPosX - this.position.x) <= 50 &&
        Math.abs(roundedPlayerPosY - this.position.y) <= 50
      ) {
        this.onColideWithHero();
      } else {
        this.onFree();
      }
    });
  }

  onColideWithHero() {
    this.removeChild(this.body);
    this.body = new Sprite({
      resource: resources.images.contest2,
      frameSize: new Vector2(300, 175),
      frameBegin: new Vector2(0, 0),
      scale: 0.7,
      position: this.PosOffset,
    });
    this.addChild(this.body);
    document.addEventListener("keydown", this.spaceCheck);
    this.renderText();
  }

  onFree() {
    this.removeChild(this.body);
    this.body = new Sprite({
      resource: resources.images.contest1,
      frameSize: new Vector2(300, 175),
      frameBegin: new Vector2(0, 0),
      scale: 0.7,
      position: this.PosOffset,
    });
    this.addChild(this.body);
    document.removeEventListener("keydown", this.spaceCheck);
    this.renderText();
  }
}
