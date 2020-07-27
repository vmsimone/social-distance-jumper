import { GLOBALS } from "../globals.js";

let gameProperties;

export class getReadyScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.GETREADY
        });
    }

    init(sceneData) {
        gameProperties = sceneData;
    }

    create() {
        //this will help us organize better
        const gameWidth = gameProperties.width;
        const gameHeight = gameProperties.height;

        //bg scaled to fit 727 x 1293
        const bgHeightScale = gameHeight / 1293;

        //images all scaled to fit 1080 x 1920
        const gameHeightScale = gameHeight / 1920;

        this.add.image(
            gameWidth * 0.5, 
            gameHeight * 0.25, 
            "getReady"
        ).setDepth(1).setScale(gameHeightScale);
        
        this.add.image(
            gameWidth * 0.5, 
            gameHeight * 0.85, 
            "instructions"
        ).setDepth(1).setScale(gameHeightScale);

        let ground = this.physics.add.staticGroup();
        ground.create(840, 1900, 'ground').refreshBody();

        this.input.once('pointerdown', () => {
            this.scene.start(GLOBALS.SCENES.GAME);
        }, this);
    }
};