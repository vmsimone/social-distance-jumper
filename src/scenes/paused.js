import { SCENES } from "../sceneHandler.js";

let gameProperties;

export class pausedScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.PAUSED
        });
    }

    init(sceneData) {
        gameProperties = sceneData;
    }

    create() {
        this.input.once('pointerdown', () => {
            gameProperties.background.screenDarken.setVisible(false);
            gameProperties.gameObjects.player.isInMotion = true;
            
            //all our assets are in the preload, so....
            this.scene.resume(SCENES.PRELOAD);
        }, this);

        gameProperties.background.screenDarken.setVisible(true);
    }
};