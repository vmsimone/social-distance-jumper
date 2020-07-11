import { GLOBALS } from "../globals.js";

let gameWidth;
let gameHeight;
let gameHeightScale;

export class startMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.STARTMENU
        });
    }

    init(data) {
        console.log(data);
    }

    create() {
        //this will help us organize better
        gameWidth = this.game.renderer.width;
        gameHeight = this.game.renderer.height;

        //images all scaled to fit 1080 x 1920
        gameHeightScale = gameHeight / 1920;

        //create the background
        const bg = this.add.tileSprite(0, 0, 6080, 1920, 'background').setDepth(0);
        const mg = this.add.tileSprite(0, 0, 6080, 1920, 'midground').setDepth(0);
        const fg = this.add.tileSprite(0, 0, 6080, 1920, 'foreground').setDepth(0);

        bg.setOrigin(0).setScale(gameHeightScale);
        mg.setOrigin(0).setScale(gameHeightScale);
        fg.setOrigin(0).setScale(gameHeightScale);

        this.add.image(0, 0, "screenDarken").setDepth(1).setOrigin(0).setScale(gameHeightScale);
        
        let ground = this.physics.add.staticGroup();
        ground.create(840, 1900, 'ground').refreshBody();

        this.add.image(
            gameWidth * 0.5, 
            gameHeight * 0.25, 
            "title"
        ).setDepth(1).setScale(gameHeightScale);

        //click to start
        const playButton = this.add.image(
            gameWidth * 0.3, 
            gameHeight * 0.85, 
            "playButton"
        ).setDepth(1).setScale(gameHeightScale);

        playButton.setInteractive();
        playButton.on("pointerdown", () => {
            this.sound.add('startSound').play();
            this.scene.start(GLOBALS.SCENES.GAME, "Game Started");
        });

        //this button does nothing atm
        const scoreButton = this.add.image(
            gameWidth * 0.7, 
            gameHeight * 0.85, 
            "scoreButton"
        ).setDepth(1).setScale(gameHeightScale);

        scoreButton.setInteractive();
        // scoreButton.on("pointerdown", () => {
        //     this.scene.start(GLOBALS.SCENES.SCORE, "Scores");
        // });

        this.sound.add('music').play();
    }
};