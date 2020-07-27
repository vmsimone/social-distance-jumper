import { GLOBALS } from "../globals.js";

let gameProperties;

export class startMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.STARTMENU
        });
    }

    init(sceneData) {
        gameProperties = sceneData;
    }

    create() {
        //click to start
        gameProperties.buttons.playButton.on("pointerdown", () => {
            //this.sound.add('startSound').play();
            
            //get rid of these
            gameProperties.background.screenDarken.destroy();
            gameProperties.background.title.destroy();
            gameProperties.background.copyright.destroy();

            gameProperties.buttons.playButton.destroy();

            this.scene.launch(GLOBALS.SCENES.GETREADY, gameProperties);
        });

        //this button does nothing atm
        // const scoreButton = this.add.image(
        //     gameWidth * 0.7, 
        //     gameHeight * 0.85, 
        //     "scoreButton"
        // ).setDepth(1).setScale(gameHeightScale);

        // scoreButton.setInteractive();
        // // scoreButton.on("pointerdown", () => {
        // //     this.scene.start(GLOBALS.SCENES.SCORE, "Scores");
        // // });

        //this.sound.add('music', {loop: true}).play();
    }
};