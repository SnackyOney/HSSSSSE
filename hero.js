import { GameObject } from "./gameObject.js";
import { Vector2 } from "./vector.js";
import { screenSizeX, screenSizeY } from "./game.js";
import { Sprite } from "./sprite.js";
import { resources } from "./resources.js";
import { DOWN, LEFT, RIGHT, UP } from "./input.js";
import { events } from "./event.js";
 
export class Hero extends GameObject {
  constructor(x, y) {
    super({ position: new Vector2(x, y) });

    this.speed = 7;
    this.diagSpeed = this.speed * 0.8;
    this.playerPosOffset = new Vector2(-30, -50);

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(375, 515),
      frameBegin: new Vector2(500, 50),
      scale: 0.2,
      position: new Vector2(this.playerPosOffset.x, this.playerPosOffset.y),
    });
    this.addChild(this.body);
  }

  step(delta, root) {
    const { input } = root;
    if (input.getDirectionSize() >= 2) {
      if (
        (input.getDirectionFirst() === DOWN &&
          input.getDirectionSecond() === LEFT) ||
        (input.getDirectionFirst() === LEFT &&
          input.getDirectionSecond() === DOWN)
      ) {
        this.position.y += this.diagSpeed;
        this.position.x -= this.diagSpeed;
      }
      if (
        (input.getDirectionFirst() === DOWN &&
          input.getDirectionSecond() === RIGHT) ||
        (input.getDirectionFirst() === RIGHT &&
          input.getDirectionSecond() === DOWN)
      ) {
        this.position.y += this.diagSpeed;
        this.position.x += this.diagSpeed;
      }
      if (
        (input.getDirectionFirst() === UP &&
          input.getDirectionSecond() === LEFT) ||
        (input.getDirectionFirst() === LEFT &&
          input.getDirectionSecond() === UP)
      ) {
        this.position.y -= this.diagSpeed;
        this.position.x -= this.diagSpeed;
      }
      if (
        (input.getDirectionFirst() === UP &&
          input.getDirectionSecond() === RIGHT) ||
        (input.getDirectionFirst() === RIGHT &&
          input.getDirectionSecond() === UP)
      ) {
        this.position.y -= this.diagSpeed;
        this.position.x += this.diagSpeed;
      }
    } else {
      if (input.getDirectionFirst() === DOWN) {
        this.position.y += this.speed;
      }
      if (input.getDirectionFirst() === UP) {
        this.position.y -= this.speed;
      }
      if (input.getDirectionFirst() === LEFT) {
        this.position.x -= this.speed;
      }
      if (input.getDirectionFirst() === RIGHT) {
        this.position.x += this.speed;
      }
    }

    if (this.position.x < -this.playerPosOffset.x) {
      this.position.x = -this.playerPosOffset.x;
    }
    if (this.position.x > screenSizeX + this.playerPosOffset.x) {
      this.position.x = screenSizeX + this.playerPosOffset.x;
    }
    if (this.position.y < -this.playerPosOffset.y) {
      this.position.y = -this.playerPosOffset.y;
    }
    if (this.position.y > screenSizeY + this.playerPosOffset.y) {
      this.position.y = screenSizeY + this.playerPosOffset.y;
    }

    this.tryEmitPosition();
  }

  tryEmitPosition() {
    events.emit("HERO_POSITION", this.position);
  }
}
