import { SCENES } from "../sceneHandler.js";

let gameProperties;

export class gameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.GAMEOVER
        });
    }

    init(sceneData) {
        gameProperties = sceneData;
    }

    preload() {
        updateHighscore();
        gameProperties.buttons.pauseButton.setVisible(false);
        gameProperties.gameObjects.player.setVisible(false);
        gameProperties.scoreText.destroy();

        gameProperties.gameObjects.player.isDown = false;
    }

    create() {
        //filter to darken background for start menu
        gameProperties.background.screenDarken.setVisible(true);

        //"Game Over"
        const gameOverTitle = gameProperties.addImage(this, {
            name: "gameOverTitle",
            widthRatio: 0.5,
            heightRatio: 0.2
        });

        //scoreboard displaying score and best
        const scoreBoard = gameProperties.addImage(this, {
            name: "scoreBoard",
            widthRatio: 0.5,
            heightRatio: 0.4
        });

        //fontSize: '64px'
        const gameScoreText = gameProperties.addText(this, {
            content: gameProperties.score,
            widthRatio: 0.4,
            heightRatio: 0.4,
            fill: '#FFFF00'
        });

        //fontSize: '64px'
        const highScoreText = gameProperties.addText(this, {
            content: gameProperties.highScore,
            widthRatio: 0.55,
            heightRatio: 0.4,
            fill: '#FFFF00'
        });

        //credits
       const credits = gameProperties.addImage(this, {
            name: "credits",
            widthRatio: 0.5,
            heightRatio: 0.6
        });

        //restart button
        const restartButton = gameProperties.addButton(this, {
            name: "restartButton",
            widthRatio: 0.5,
            heightRatio: 0.85
        }).setInteractive();
        restartButton.on("pointerdown", () => {
            //this.sound.add('startSound').play();
            gameOverTitle.destroy();
            scoreBoard.destroy();
            gameScoreText.destroy();
            highScoreText.destroy();
            credits.destroy();
            restartButton.destroy();
            
            gameProperties.background.screenDarken.setVisible(false);
            gameProperties.score = 0;
            this.scene.launch(SCENES.GAME, gameProperties);
        });
    }
};

function updateHighscore() {
    if(gameProperties.score > gameProperties.highScore) {
        gameProperties.highScore = gameProperties.score;
    }
}