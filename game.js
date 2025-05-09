import { Gagarinov } from "./gagarinov.js";
import { GameLoop } from "./gameloop.js";
import { GameObject } from "./gameObject.js";
import { Hero } from "./hero.js";
import { Input } from "./input.js";
import { Plus } from "./plus.js";
import { resources } from "./resources.js";
import { Sprite } from "./sprite.js";
import { getRandomNumber } from "./tools.js";
import { Vector2 } from "./vector.js";
import { Vshpivo } from "./vshpivo.js";

export const screenSizeX = 1280;
export const screenSizeY = 720;
export let score = 0;
export const setScore = (new_score) => {
  score = new_score;
};

const randOffsetX = 50;
const randOffsetY = 50;
const mainSpace = new GameObject(new Vector2(0, 0));
const mainSpaceBottom = new GameObject(new Vector2(0, 0));
const gagarinovPos = new Vector2(655, 645);
let canvas;
let scoreText;
let ctx;
export let gameLoop;

mainSpace.input = new Input();
const getCanvas = (cvs) => {
  canvas = cvs;
  ctx = canvas.getContext("2d");
  gameLoop = new GameLoop(update, draw);
  gameLoop.start();
  SetUp();
};

const getScoreText = (txt) => {
  scoreText = txt;
};

const setScoreText = () => {
  scoreText.textContent = "Score: " + score;
};

const backgroundSprite = new Sprite({
  resource: resources.images.background,
  frameSize: new Vector2(1280, 720),
  frameBegin: new Vector2(0, 0),
  scale: 1,
});

const IncreaseScoreInf = () => {
  score += 1;
  setTimeout(() => {
    IncreaseScoreInf();
  }, 1000);
};

const hero = new Hero(650, 200);
mainSpace.addChild(hero);

const gagarinov = new Gagarinov(gagarinovPos.x, gagarinovPos.y);
mainSpace.addChild(gagarinov);

const plus = new Plus(0, 0);
mainSpace.addChild(plus);

const vshpivoFactory = () => {
  const posX = getRandomNumber(randOffsetX, screenSizeX - randOffsetX);
  const posY = getRandomNumber(randOffsetY, screenSizeY - randOffsetY);
  const vshpivo = new Vshpivo(posX, posY);
  mainSpaceBottom.addChild(vshpivo);
  setTimeout(() => {
    vshpivoFactory();
  }, 1000);
};

const plusFactory = () => {
  const plus = new Plus(
    gagarinovPos.x,
    gagarinovPos.y,
    hero.position.x,
    hero.position.y
  );
  mainSpace.addChild(plus);
  setTimeout(() => {
    plusFactory();
  }, 700);
};

const SetUp = () => {
  if (gameLoop.isRunning) {
    IncreaseScoreInf();
    vshpivoFactory();
    setTimeout(() => {
      plusFactory();
    }, 2000);
  }
};

const update = (delta) => {
  setScoreText();
  mainSpace.stepEntry(delta, mainSpace);
};

const draw = () => {
  backgroundSprite.drawImage(ctx, 0, 0);
  mainSpaceBottom.draw(ctx, 0, 0);
  mainSpace.draw(ctx, 0, 0);
};

export { getCanvas, getScoreText };
