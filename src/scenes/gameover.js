import { GLOBALS } from "../globals.js";

export class gameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.GAMEOVER
        });
    }

    init(data) {
    }

    create() {
        const bg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'background').setDepth(0);
        const mg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'midground').setDepth(0);
        const fg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'foreground').setDepth(0);

        bg.setOrigin(0);
        mg.setOrigin(0);
        fg.setOrigin(0);
        
        let ground = this.physics.add.staticGroup();
        ground.create(840, 1900, 'ground').refreshBody();

        this.add.image(this.game.renderer.width * 0.4, this.game.renderer.height * 0.1, "gameOverTitle").setDepth(1).setOrigin(0);

        const restartButton = this.add.image(this.game.renderer.width * 0.4, this.game.renderer.height * 0.8, "restartButton").setDepth(1);
        restartButton.setOrigin(0);
        restartButton.setInteractive();
        restartButton.on("pointerdown", () => {
            this.scene.start(GLOBALS.SCENES.GAME, "Game Started");
        });
    }
};