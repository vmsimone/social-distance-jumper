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

        //bg scaled to fit 727 x 1293
        const bgHeightScale = gameHeight / 1293;

        //images all scaled to fit 1080 x 1920
        gameHeightScale = gameHeight / 1920;

        //create the background
        const bg = this.add.tileSprite(0, 0, 4096, 1293, 'background').setDepth(0);
        const mg = this.add.tileSprite(0, 0, 4096, 1293, 'midground').setDepth(0);
        const fg = this.add.tileSprite(0, 0, 4096, 1293, 'foreground').setDepth(0);

        bg.setOrigin(0).setScale(bgHeightScale);
        mg.setOrigin(0).setScale(bgHeightScale);
        fg.setOrigin(0).setScale(bgHeightScale);
        
        this.add.image(0, 0, "screenDarken").setDepth(1).setOrigin(0).setScale(gameHeightScale);

        let scoreBoard = this.add.image(
            gameWidth * 0.5, 
            gameHeight * 0.4, 
            "scoreBoard"
        ).setDepth(1).setScale(gameHeightScale);
        
        gameScoreText = this.add.text(
            scoreBoard.x * 0.8, 
            scoreBoard.y,
            `${gameScore}`, 
            { fontFamily: "dogicapixel", fontSize: '64px', fill: '#FFFF00' }
        ).setDepth(1).setScale(gameHeightScale);

        highScoreText = this.add.text(
            scoreBoard.x * 1.12, 
            scoreBoard.y,
            `${updateHighscore()}`, 
            { fontFamily: "dogicapixel", fontSize: '64px', fill: '#FFFF00' }
        ).setDepth(1).setScale(gameHeightScale);

        this.add.image(
            gameWidth * 0.5, 
            gameHeight * 0.2, 
            "gameOverTitle"
        ).setDepth(1).setScale(gameHeightScale);
        
        this.add.image(
            gameWidth * 0.5, 
            gameHeight * 0.6, 
            "credits"
        ).setDepth(1).setScale(gameHeightScale);

        const restartButton = this.add.image(
            gameWidth * 0.5, 
            gameHeight * 0.85,
            "restartButton"
        ).setDepth(1).setScale(gameHeightScale);

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