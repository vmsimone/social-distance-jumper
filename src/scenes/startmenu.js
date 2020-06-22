import { GLOBALS } from "../globals.js";

export class startMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.STARTMENU
        });
    }

    init(data) {
        console.log(data);
    }

    create() {
        console.log("Menu loaded");

        //create the background
        const bg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'background').setDepth(0);
        const mg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'midground').setDepth(0);
        const fg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'foreground').setDepth(0);

        bg.setOrigin(0);
        mg.setOrigin(0);
        fg.setOrigin(0);
        
        let ground = this.physics.add.staticGroup();
        ground.create(200, 200, 'ground').refreshBody();

        this.add.image(this.game.renderer.width / 10, this.game.renderer.height * 0.2, "title").setDepth(1).setOrigin(0);

        const playButton = this.add.image(this.game.renderer.width / 3, this.game.renderer.height * 0.8, "playButton").setDepth(1);
        playButton.setOrigin(0);
        playButton.setInteractive();
        playButton.on("pointerdown", () => {
            this.scene.start(GLOBALS.SCENES.GAME, "Game Started");
        });
    }
};