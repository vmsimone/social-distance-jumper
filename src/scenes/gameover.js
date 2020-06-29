import { GLOBALS } from "../globals.js";

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
        console.log(gameData);
        gameScore = gameData.gameScore;
        highScore = gameData.highScore;
    }

    create() {
        const bg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'background').setDepth(0);
        const mg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'midground').setDepth(0);
        const fg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'foreground').setDepth(0);

        bg.setOrigin(0);
        mg.setOrigin(0);
        fg.setOrigin(0);
        
        this.add.image(0, 0, "screenDarken").setDepth(1).setOrigin(0);

        let ground = this.physics.add.staticGroup();
        ground.create(840, 1900, 'ground').refreshBody();

        this.add.image(
            this.game.renderer.width * 0.2, 
            this.game.renderer.height * 0.1, 
            "scoreBoard"
        ).setDepth(1).setOrigin(0);
        
        gameScoreText = this.add.text(
            this.game.renderer.width * 0.28, 
            this.game.renderer.height * 0.17, 
            `${gameScore}`, 
            { fontFamily: "dogicapixel", fontSize: '64px', fill: '#00CCFF' }
        ).setDepth(1).setOrigin(0);

        highScoreText = this.add.text(
            this.game.renderer.width * 0.55, 
            this.game.renderer.height * 0.17, 
            `${updateHighscore()}`, 
            { fontFamily: "dogicapixel", fontSize: '64px', fill: '#00CCFF' }
        ).setDepth(1).setOrigin(0);

        this.add.image(
            this.game.renderer.width * 0.25, 
            this.game.renderer.height * 0.4, 
            "gameOverTitle"
        ).setDepth(1).setOrigin(0);

        const restartButton = this.add.image(
            this.game.renderer.width * 0.3, 
            this.game.renderer.height * 0.8, 
            "restartButton"
        ).setDepth(1);

        restartButton.setOrigin(0);
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