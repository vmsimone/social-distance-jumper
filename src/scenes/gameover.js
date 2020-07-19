import { GLOBALS } from "../globals.js";

let gameWidth;
let gameHeight;
let gameHeightScale;

let gameScore;
let gameScoreText;
let highScore;
let highScoreText;

export class gameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.GAMEOVER
        });
    }

    init(gameData) {
        gameScore = gameData.gameScore;
        highScore = gameData.highScore;
    }

    create() {
        //this will help us organize better
        gameWidth = this.game.renderer.width;
        gameHeight = this.game.renderer.height;

        //images all scaled to fit 1080 x 1920
        gameHeightScale = gameHeight / 1920;

        const bg = this.add.tileSprite(0, 0, 6080, 1920, 'background').setdepth(1);
        const mg = this.add.tileSprite(0, 0, 6080, 1920, 'midground').setdepth(1);
        const fg = this.add.tileSprite(0, 0, 6080, 1920, 'foreground').setdepth(1);

        bg.setOrigin(0).setScale(gameHeightScale);
        mg.setOrigin(0).setScale(gameHeightScale);
        fg.setOrigin(0).setScale(gameHeightScale);
        
        this.add.image(0, 0, "screenDarken").setdepth(2).setOrigin(0).setScale(gameHeightScale);

        let scoreBoard = this.add.image(
            gameWidth * 0.5, 
            gameHeight * 0.4, 
            "scoreBoard"
        ).setdepth(2).setScale(gameHeightScale);

        console.log(scoreBoard.y);
        
        gameScoreText = this.add.text(
            scoreBoard.x * 0.8, 
            scoreBoard.y,
            `${gameScore}`, 
            { fontFamily: "dogicapixel", fontSize: '64px', fill: '#FFFF00' }
        ).setdepth(2).setScale(gameHeightScale);

        highScoreText = this.add.text(
            scoreBoard.x * 1.12, 
            scoreBoard.y,
            `${updateHighscore()}`, 
            { fontFamily: "dogicapixel", fontSize: '64px', fill: '#FFFF00' }
        ).setdepth(2).setScale(gameHeightScale);

        this.add.image(
            gameWidth * 0.5, 
            gameHeight * 0.2, 
            "gameOverTitle"
        ).setdepth(2).setScale(gameHeightScale);
        
        this.add.image(
            gameWidth * 0.5, 
            gameHeight * 0.6, 
            "credits"
        ).setdepth(2).setScale(gameHeightScale);

        const restartButton = this.add.image(
            gameWidth * 0.5, 
            gameHeight * 0.85,
            "restartButton"
        ).setdepth(2).setScale(gameHeightScale);

        restartButton.setInteractive();
        restartButton.on("pointerdown", () => {
            this.sound.add('startSound').play();
            this.scene.start(GLOBALS.SCENES.GAME, {"highScore": highScore});
        });
    }
};

function updateHighscore() {
    if(gameScore >= highScore) {
        highScore = gameScore;
    }
    return highScore;
}