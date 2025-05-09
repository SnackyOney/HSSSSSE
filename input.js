import { doc } from "./index.js";

export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

export class Input {
  constructor() {
    this.heldDirections = [];
    doc.addEventListener("keydown", (e) => {
      if (e.code === "KeyW" || e.code === "ArrowUp") {
        this.onArrowPressed(UP);
      }
      if (e.code === "KeyA" || e.code === "ArrowLeft") {
        this.onArrowPressed(LEFT);
      }
      if (e.code === "KeyS" || e.code === "ArrowDown") {
        this.onArrowPressed(DOWN);
      }
      if (e.code === "KeyD" || e.code === "ArrowRight") {
        this.onArrowPressed(RIGHT);
      }
    });

    doc.addEventListener("keyup", (e) => {
      if (e.code === "KeyW" || e.code === "ArrowUp") {
        this.onArrowReleased(UP);
      }
      if (e.code === "KeyA" || e.code === "ArrowLeft") {
        this.onArrowReleased(LEFT);
      }
      if (e.code === "KeyS" || e.code === "ArrowDown") {
        this.onArrowReleased(DOWN);
      }
      if (e.code === "KeyD" || e.code === "ArrowRight") {
        this.onArrowReleased(RIGHT);
      }
    });
  }

  getDirectionFirst() {
    return this.heldDirections[0];
  }

  getDirectionSecond() {
    return this.heldDirections[1];
  }

  getDirectionSize() {
    return this.heldDirections.length;
  }

  onArrowPressed(direction) {
    if (this.heldDirections.indexOf(direction) === -1) {
      this.heldDirections.unshift(direction);
    }
  }

  onArrowReleased(direction) {
    const index = this.heldDirections.indexOf(direction);
    if (index === -1) {
      return;
    }
    this.heldDirections.splice(index, 1);
  }
}
