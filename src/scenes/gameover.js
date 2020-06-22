import { GLOBALS } from "../globals.js";

export class gameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.GAMEOVER
        });
    }

    init(data) {
        console.log(data);
    }

    create() {
        console.log("Game Over");

        const playButton = this.add.image(this.game.renderer.width / 3, this.game.renderer.height * 0.8, "playButton").setDepth(1);
        playButton.setOrigin(0);
        playButton.setInteractive();
        playButton.on("pointerdown", () => {
            this.scene.start(GLOBALS.SCENES.GAME, "Game Started");
        });
    }
};