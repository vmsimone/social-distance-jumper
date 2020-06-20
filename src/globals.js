import preloadState from 'preload.js';
import startMenuState from 'startmenu.js';
import gameState from 'main.js';
import gameOverState from 'gameover.js';

const socialDistancing = {
    //all scenese
    scenes: [
        preloadState,
        startMenuState,
        gameState,
        gameOverState
    ],
    frameRate: 10
};

export default socialDistancing;