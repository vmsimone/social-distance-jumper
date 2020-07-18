import { GLOBALS } from "../globals.js";

let screenDarken;

export class pausedScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.PAUSED
        });
    }

    init(data) {
        console.log('game paused');
        this.input.once('pointerdown', () => {
            screenDarken.destroy();
            this.scene.resume(GLOBALS.SCENES.GAME);
        }, this);
    }

    create() {
        //images all scaled to fit 1080 x 1920
        const gameHeight = this.game.renderer.height;
        const gameHeightScale = gameHeight / 1920;

        screenDarken = this.add.image(0, 0, "screenDarken").setDepth(1).setOrigin(0).setScale(gameHeightScale);
    }
};