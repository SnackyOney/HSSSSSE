import {
  gosTemplate,
  body,
  backFromGameToMenuButtonEvent,
  audioSetUp,
} from "./index.js";
import { die_audio, lancer_audio } from "./sounds.js";
import { score } from "./game.js";

async function saveResult(name, ac_score) {
  setTimeout(async () => {
    const resultData = {
      username: name,
      score: ac_score,
    };

    await fetch("./api/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultData),
    });
  }, 100);
}

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
    const saveButton = gameOverScreen.querySelector(".save-button");
    const name = gameOverScreen.querySelector("input");
    let ac_score = score;
    noSaveButton.addEventListener("click", () => {
      backFromGameToMenuButtonEvent();
    });
    saveButton.addEventListener("click", () => {
      saveResult(name.value, ac_score);
      setTimeout(() => {
        backFromGameToMenuButtonEvent();
      }, 300);
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
