import { Image as ImageScript } from "https://deno.land/x/imagescript@v1.2.15/mod.ts";

class Resources {
  constructor() {
    this.toLoad = {
      hero: "./game_images/hero.png",
      gagarinov: "./game_images/gagarinov.jpg",
      plus: "./game_images/plus.png",
      background: "./game_images/background.jpg",
      vshpivo: "./game_images/vshpivo.png",
    };

    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      const image = new Image();
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
