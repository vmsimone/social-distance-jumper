import { SCENES } from "../sceneHandler.js";

let screenDarken;

export class pausedScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.PAUSED
        });
    }

    init() {
        console.log('game paused');
    }

    create() {
        //images all scaled to fit 1080 x 1920
        const gameHeight = this.game.renderer.height;
        const gameHeightScale = gameHeight / 1920;
        
        this.input.once('pointerdown', () => {
            screenDarken.destroy();
            this.scene.resume(SCENES.GAME);
        }, this);

        screenDarken = this.add.image(0, 0, "screenDarken").setDepth(1).setOrigin(0).setScale(gameHeightScale);
    }
};