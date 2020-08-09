import { SCENES } from "../sceneHandler.js";

let gameProperties;

export class startMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.STARTMENU
        });
    }

    init(sceneData) {
        gameProperties = sceneData;
    }

    create() {
        //click to start
        gameProperties.buttons.playButton.on("pointerdown", () => {
            //this.sound.add('startSound').play();
            
            //get rid of start menu w/out losing other preloaded assets
            gameProperties.background.screenDarken.setVisible(false);
            
            gameProperties.background.title.destroy();
            gameProperties.background.copyright.destroy();

            gameProperties.buttons.playButton.destroy();

            //launch get ready scene
            this.scene.launch(SCENES.GETREADY, gameProperties);
        });

        //this.sound.add('music', {loop: true}).play();
    }
};