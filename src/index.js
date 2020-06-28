import Phaser from "phaser";

import { preloadScene } from "./scenes/preload";
import { startMenuScene } from "./scenes/startmenu";
import { gameScene } from "./scenes/game";
import { gameOverScene } from "./scenes/gameover";

let game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1680,
  height: 1920,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 2500 },
          debug: true
      }
  },
  scene: [
    preloadScene,
    startMenuScene,
    gameScene,
    gameOverScene
  ],
  pixelArt: true,
  zoom: 0.4
});

function restartGame() {
  gameOver = false;
  score = 0;
  player.setTint(0x000000);
}