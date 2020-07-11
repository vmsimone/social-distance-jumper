import Phaser from "phaser";

import { preloadScene } from "./scenes/preload";
import { startMenuScene } from "./scenes/startmenu";
import { gameScene } from "./scenes/game";
import { gameOverScene } from "./scenes/gameover";

let game = new Phaser.Game({
  type: Phaser.AUTO,
  width: (window.innerWidth * window.devicePixelRatio),
  height: (window.innerHeight * window.devicePixelRatio),
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: window.innerHeight },
          debug: true
      }
  },
  scene: [
    preloadScene,
    startMenuScene,
    gameScene,
    gameOverScene
  ],
  pixelArt: true
});