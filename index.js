import { getCanvas, getScoreText } from "./game.js";
import {
  hover_audio,
  lancer_audio,
  pick_audio,
  plusi_audio,
} from "./sounds.js";

export const body = document.querySelector("body");
export const gosTemplate = document.querySelector(
  ".game-over-screen-template"
).content;

let exitButton = document.querySelector(".exit-button");
let playButton = document.querySelector(".play-button");
let recordsButton = document.querySelector(".records-button");
let rulesButton = document.querySelector(".rules-button");
let buttons = document.querySelectorAll("button");

export const audioSetUp = () => {
  buttons = document.querySelectorAll("button");
  for (let button of buttons) {
    button.addEventListener("click", () => {
      pick_audio.cloneNode(true).play();
    });
  }
};
audioSetUp();

const gameTemplate = document.querySelector(".game-canvas-template").content;
const resultsTableTemplate = document.querySelector(
  ".records-table-template"
).content;
const rulesBlockTemplate = document.querySelector(
  ".rules-block-template"
).content;
const resultTemplate = document.querySelector(".record-template").content;
const menuMainTemplate = document.querySelector(".menu-main-template").content;
const menuFooterTemplate = document.querySelector(
  ".menu-footer-template"
).content;
const menuHeaderTemplate = document.querySelector(
  ".menu-header-and-background-template"
).content;
const exitButtonEvent = function () {
  window.close();
};

exitButton.addEventListener("click", exitButtonEvent);

export const backFromGameToMenuButtonEvent = () => {
  window.location.reload();
};

const playButtonEvent = function () {
  setTimeout(() => {
    lancer_audio.play();
  }, 3200);
  plusi_audio.play();
  let mainSpace = document.querySelector(".main-space");
  mainSpace.remove();
  const game = gameTemplate.querySelector(".game-canvas").cloneNode(true);
  const score = gameTemplate.querySelector(".current-score").cloneNode(true);
  getScoreText(score);
  body.append(score);
  getCanvas(game);
  body.append(game);
};

playButton.addEventListener("click", playButtonEvent);

const getBackToMenu = function () {
  let mainSpace = document.querySelector(".main-space");
  const mainMenu = menuMainTemplate.querySelector("main").cloneNode(true);
  const recordsButton = mainMenu.querySelector(".records-button");
  const rulesButton = mainMenu.querySelector(".rules-button");
  const exitButton = mainMenu.querySelector(".exit-button");
  const playButton = mainMenu.querySelector(".play-button");
  recordsButton.addEventListener("click", recordsButtonEvent);
  exitButton.addEventListener("click", exitButtonEvent);
  rulesButton.addEventListener("click", rulesButtonEvent);
  playButton.addEventListener("click", playButtonEvent);
  mainSpace.append(mainMenu);
  mainSpace.append(menuFooterTemplate.querySelector("footer").cloneNode(true));
  audioSetUp();
};

const deleteMenu = function () {
  let mainer = document.querySelector("main");
  let footer = document.querySelector("footer");
  mainer.remove();
  footer.remove();
};

const rulesButtonEvent = function () {
  let mainSpace = document.querySelector(".main-space");
  deleteMenu();
  const rulesCopy = rulesBlockTemplate
    .querySelector(".rules-block")
    .cloneNode(true);

  const backFromRulesButton = rulesCopy.querySelector(".back-rules-button");

  backFromRulesButton.addEventListener("click", () => {
    const resultsBlock = mainSpace.querySelector(".rules-block");
    resultsBlock.remove();
    getBackToMenu();
  });

  mainSpace.appendChild(rulesCopy);
  audioSetUp();
};

const recordsButtonEvent = function () {
  let mainSpace = document.querySelector(".main-space");
  deleteMenu();
  const resultsTableCopy = resultsTableTemplate
    .querySelector(".res-block")
    .cloneNode(true);

  const backFromResultsButton = resultsTableCopy.querySelector(
    ".back-results-button"
  );

  backFromResultsButton.addEventListener("click", () => {
    const resultsBlock = mainSpace.querySelector(".res-block");
    resultsBlock.remove();
    getBackToMenu();
  });

  for (let i = 1; i <= 10; i++) {
    let resultCopy = resultTemplate
      .querySelector(".record-line")
      .cloneNode(true);
    resultsTableCopy.querySelector("ul").appendChild(resultCopy);
  }
  mainSpace.appendChild(resultsTableCopy);
  audioSetUp();
};

recordsButton.addEventListener("click", recordsButtonEvent);

rulesButton.addEventListener("click", rulesButtonEvent);

// const bouncingSigns = document.querySelectorAll(".bouncing-sign");
// const speed = 8;

// bouncingSigns.forEach((bouncingSign) => {
//   let posX = 0;
//   let posY = 0;

//   let dirX = (Math.random() - 0.5) * speed;
//   let dirY = (Math.random() - 0.5) * speed;

//   function animate() {
//     posX += dirX;
//     posY += dirY;

//     if (posX <= 0 || posX + 150 >= 3000) {
//       dirX *= -1;
//     }
//     if (posY <= 0 || posY + 50 >= 700) {
//       dirY *= -1;
//     }

//     bouncingSign.style.left = posX + "px";
//     bouncingSign.style.top = posY + "px";

//     requestAnimationFrame(animate);
//   }
//   animate();
// });
