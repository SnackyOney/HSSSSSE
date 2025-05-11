//import { Image } from "https://deno.land/x/imagescript/mod.ts";

class Resources {
  constructor() {
    this.toLoad = {
      hero: "./game_images/hero.png",
      gagarinov: "./game_images/gagarinov.jpg",
      plus: "./game_images/plus.png",
      background: "./game_images/background.jpg",
      vshpivo: "./game_images/new_vshpivo.png",
      contest1: "./game_images/contest_1.jpg",
      contest2: "./game_images/contest_2.jpg",
      guard: "./game_images/guard.png",
      gusev: "./game_images/gusev.png",
      conspect: "./game_images/conspect.png",
    };

    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      const image = new Image(1, 1);
      image.src = this.toLoad[key];
      this.images[key] = {
        image,
        isLoaded: false,
      };
      image.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const resources = new Resources();
