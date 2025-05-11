import { Conspect } from "./conspect.js";
import { Contest } from "./contest.js";
import { Gagarinov } from "./gagarinov.js";
import { GameLoop } from "./gameloop.js";
import { GameObject } from "./gameObject.js";
import { Guard } from "./guard.js";
import { Gusev } from "./gusev.js";
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

let plusFactoryTime = 700;
export const setPlusFactoryTime = (new_time) => {
  plusFactoryTime = new_time;
};

const randOffsetX = 50;
const randOffsetY = 50;
const randOffsetContestX = 200;
const randOffsetContestY = 50;
const mainSpace = new GameObject(new Vector2(0, 0));
const mainSpaceBottom = new GameObject(new Vector2(0, 0));
const gagarinovPos = new Vector2(655, 645);
let canvas;
let scoreText;
let ctx;
let guard;
export let gameLoop;

mainSpace.input = new Input();
const getCanvas = (cvs) => {
  canvas = cvs;
  ctx = canvas.getContext("2d");
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
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

const vshpivoFactory = () => {
  const posX = getRandomNumber(randOffsetX, screenSizeX - randOffsetX);
  const posY = getRandomNumber(randOffsetY, screenSizeY - randOffsetY);
  const vshpivo = new Vshpivo(posX, posY);
  mainSpaceBottom.addChild(vshpivo);
  setTimeout(() => {
    vshpivoFactory();
  }, 800);
};

const contestFactory = () => {
  const posX = getRandomNumber(
    randOffsetContestX,
    screenSizeX - randOffsetContestX + 175
  );
  const posY = getRandomNumber(
    randOffsetContestY,
    screenSizeY - randOffsetContestY - 20
  );
  if (
    Math.abs(posX - gagarinovPos.x) <= 200 &&
    Math.abs(posY - gagarinovPos.y) <= 200
  ) {
    contestFactory();
    return;
  }
  const contest = new Contest(posX, posY);
  mainSpaceBottom.addChild(contest);
  setTimeout(() => {
    contestFactory();
  }, 4000);
};

export const conspectBurst = (pos) => {
  const conspect = new Conspect(pos.x, pos.y, new Vector2(0, -1));
  mainSpace.addChild(conspect);
  const conspect2 = new Conspect(pos.x, pos.y, new Vector2(1, 1));
  mainSpace.addChild(conspect2);
  const conspect3 = new Conspect(pos.x, pos.y, new Vector2(-1, -1));
  mainSpace.addChild(conspect3);
  const conspect4 = new Conspect(pos.x, pos.y, new Vector2(-1, 1));
  mainSpace.addChild(conspect4);
  const conspect5 = new Conspect(pos.x, pos.y, new Vector2(1, -1));
  mainSpace.addChild(conspect5);
  const conspect6 = new Conspect(pos.x, pos.y, new Vector2(0, 1));
  mainSpace.addChild(conspect6);
  const conspect7 = new Conspect(pos.x, pos.y, new Vector2(1, 0));
  mainSpace.addChild(conspect7);
  const conspect8 = new Conspect(pos.x, pos.y, new Vector2(-1, 0));
  mainSpace.addChild(conspect8);
};

const plusFactory = () => {
  const plus = new Plus(
    gagarinov.position.x,
    gagarinov.position.y,
    hero.position.x,
    hero.position.y
  );
  mainSpace.addChild(plus);
  setTimeout(() => {
    plusFactory();
  }, plusFactoryTime);
};

const gusevFactory = () => {
  const gusev = new Gusev(guard.position.x, guard.position.y);
  mainSpace.addChild(gusev);
  setTimeout(() => {
    gusevFactory();
  }, 7000);
};

const SetUp = () => {
  if (gameLoop.isRunning) {
    IncreaseScoreInf();
    setTimeout(() => {
      vshpivoFactory();
    }, 4000);
    setTimeout(() => {
      plusFactory();
    }, 4000);
    setTimeout(() => {
      contestFactory();
    }, 15000);
    setTimeout(() => {
      gagarinov.getAngry();
    }, 30000);
    setTimeout(() => {
      guard = new Guard(
        gagarinov.position.x,
        gagarinov.position.y,
        hero.position.x,
        hero.position.y
      );
      mainSpace.addChild(guard);
    }, 50000);
    setTimeout(() => {
      gusevFactory();
    }, 70000);
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
