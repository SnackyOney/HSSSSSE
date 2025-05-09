import {
  gosTemplate,
  body,
  backFromGameToMenuButtonEvent,
  audioSetUp,
} from "./index.js";
import { die_audio, lancer_audio } from "./sounds.js";

export class GameLoop {
  constructor(update, render) {
    this.update = update;
    this.render = render;
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 60;
    this.rafId = null;
    this.isRunning = false;
  }

  mainLoop = (timestamp) => {
    if (!this.isRunning) {
      return;
    }

    this.accumulatedTime += timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }
    this.render();
    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.rafId = requestAnimationFrame(this.mainLoop);
      this.isRunning = true;
    }
  }

  gameEnd() {
    lancer_audio.pause();
    die_audio.play();
    const gameOverScreen = gosTemplate.cloneNode(true);
    const noSaveButton = gameOverScreen.querySelector(".no-save-button");
    noSaveButton.addEventListener("click", () => {
      backFromGameToMenuButtonEvent();
    });
    body.append(gameOverScreen);
    audioSetUp();
    this.stop();
  }

  stop() {
    if (this.isRunning) {
      cancelAnimationFrame(this.rafId);
    }
    this.isRunning = false;
  }
}
