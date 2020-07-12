import Phaser from "phaser";

import { preloadScene } from "./scenes/preload";
import { startMenuScene } from "./scenes/startmenu";
import { gameScene } from "./scenes/game";
import { gameOverScene } from "./scenes/gameover";

let game = new Phaser.Game({
  type: Phaser.AUTO,
  //the game should always be vertical or square
  width: returnLowest(
    returnLowest(screenBuffer(window.innerWidth), screenBuffer(window.innerHeight)),
    //max width is 1080
    1080
  ),
  //max height is 1920
  height: returnLowest(screenBuffer(window.innerHeight), 1920),
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

function returnLowest(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}

function screenBuffer(windowSize) {
  return (windowSize * 0.95)
}