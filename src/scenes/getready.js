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
        const getReady = gameProperties.addImage(this, {
            name: "getReady",
            widthRatio: 0.5,
            heightRatio: 0.25
        });
        
        const instructions = gameProperties.addImage(this, {
            name: "instructions",
            widthRatio: 0.5,
            heightRatio: 0.85
        });

        this.input.once('pointerdown', () => {
            //won't need these once game starts
            getReady.destroy();
            instructions.destroy();

            this.scene.launch(SCENES.GAME, gameProperties);
        }, this);
    }
};