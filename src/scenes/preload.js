import { GLOBALS } from "../globals.js";


//background and game elements
import bgAsset from "../assets/cyberpunk-street-files/PNG/layers/far-buildings.png";
import mgAsset from "../assets/cyberpunk-street-files/PNG/layers/back-buildings.png";
import fgAsset from "../assets/cyberpunk-street-files/PNG/layers/foreground.png";
import groundAsset from "../assets/ground.png";
import scoreZoneAsset from "../assets/score-zone.png";
import playButtonAsset from "../assets/play-button.png";
import titleAsset from "../assets/title.png";

//characters and obstacles
import playerAsset from "../assets/sprites/Main Sprite.png";
import ped1Asset from "../assets/sprites/Masked Black Female.png";
import ped2Asset from "../assets/sprites/Masked Black Male.png";
import ped3Asset from "../assets/sprites/Masked Latin Female.png";
import ped4Asset from "../assets/sprites/Masked Latin Male.png";
import ped5Asset from "../assets/sprites/Masked Pregnant Female.png";
import ped6Asset from "../assets/sprites/Masked White Female.png";
import ped7Asset from "../assets/sprites/Masked White Male.png";
import ped8Asset from "../assets/sprites/Maskless Black Female Sprite.png";
import ped9Asset from "../assets/sprites/Maskless Black Male Sprite.png";
import ped10Asset from "../assets/sprites/Maskless Child Sprite.png";
import ped11Asset from "../assets/sprites/Maskless Latin Female Sprite.png";
import ped12Asset from "../assets/sprites/Maskless Latin Male Sprite.png";
import ped13Asset from "../assets/sprites/Maskless Pregnant Sprite.png";
import ped14Asset from "../assets/sprites/Maskless White Female Sprite.png";
import ped15Asset from "../assets/sprites/Maskless White Male Sprite.png";
import virusAsset from "../assets/sprites/cloud sprite sheet.png";
import droneAsset from "../assets/sprites/drone sprite sheet.png";

export class preloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.PRELOAD
        });
    }

    preload() {
        //background and game elements
        this.load.image('background', bgAsset);
        this.load.image('midground', mgAsset);
        this.load.image('foreground', fgAsset);
        this.load.image('ground', groundAsset);
        this.load.image('scoreZone', scoreZoneAsset);
        this.load.image('playButton', playButtonAsset);
        this.load.image('title', titleAsset);

        //player and obstacles
        this.load.spritesheet(
            'player', 
            playerAsset,
            { frameWidth: 64, frameHeight: 64 }
        );

        this.load.spritesheet(
          'virus', 
          virusAsset,
          { frameWidth: 32, frameHeight: 32 }
        );

        //there should be a better way to do this but idk
        this.load.spritesheet('ped1', ped1Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped2', ped2Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped3', ped3Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped4', ped4Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped5', ped5Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped6', ped6Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped7', ped7Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped8', ped8Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped9', ped9Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped10', ped10Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped11', ped11Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped12', ped12Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped13', ped13Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped14', ped14Asset, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ped15', ped15Asset, { frameWidth: 64, frameHeight: 64 });    

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xaaffff
            }
        });

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        })
    }

    create() {
        // maybe add anims here?
        this.scene.start(GLOBALS.SCENES.STARTMENU, "preloaded");
    }
}