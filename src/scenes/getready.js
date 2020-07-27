import { SCENES } from "../sceneHandler.js";

let gameProperties;

export class getReadyScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.GETREADY
        });
    }

    init(sceneData) {
        gameProperties = sceneData;
    }

    create() {
        const getReady = this.add.image(
            gameProperties.width * 0.5, 
            gameProperties.height * 0.25, 
            "getReady"
        ).setDepth(1).setScale(gameProperties.heightScale);
        
        const instructions = this.add.image(
            gameProperties.width * 0.5, 
            gameProperties.height * 0.85, 
            "instructions"
        ).setDepth(1).setScale(gameProperties.heightScale);

        this.input.once('pointerdown', () => {
            //won't need these once game starts
            getReady.destroy();
            instructions.destroy();

            this.scene.launch(SCENES.GAME, gameProperties);
        }, this);
    }
};