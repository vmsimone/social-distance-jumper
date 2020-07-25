import { GLOBALS } from "../globals.js";

let gameWidth;
let gameHeight;
let gameHeightScale;

export class getReadyScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.GETREADY
        });
    }

    init(data) {
        
    }

    create() {
        //this will help us organize better
        gameWidth = this.game.renderer.width;
        gameHeight = this.game.renderer.height;

        //bg scaled to fit 727 x 1293
        const bgHeightScale = gameHeight / 1293;

        //images all scaled to fit 1080 x 1920
        gameHeightScale = gameHeight / 1920;

        //create the background
        const bg = this.add.tileSprite(0, 0, 4096, 1293, 'background').setDepth(0);
        const mg = this.add.tileSprite(0, 0, 4096, 1293, 'midground').setDepth(0);
        const fg = this.add.tileSprite(0, 0, 4096, 1293, 'foreground').setDepth(0);

        bg.setOrigin(0).setScale(bgHeightScale);
        mg.setOrigin(0).setScale(bgHeightScale);
        fg.setOrigin(0).setScale(bgHeightScale);

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