import { GLOBALS } from "../globals.js";


//background and game elements
import bgAsset from "../assets/Background/Background.png";
import mgAsset from "../assets/Background/Midground.png";
import fgAsset from "../assets/Background/Foreground.png";
import groundAsset from "../assets/ground.png";
import titleAsset from "../assets/UI/Logo V1.png";
import playButtonAsset from "../assets/UI/Start Button.png";
import scoreButtonAsset from "../assets/UI/Score Button.png";
import scoreZoneAsset from "../assets/score-zone.png";
import gameOverAsset from "../assets/UI/Game Over V1.png";
import restartButtonAsset from "../assets/UI/Restart Button.png";

//characters and obstacles
import playerAsset from "../assets/sprites/Player.png";
import ped1Asset from "../assets/sprites/Masked Black Female.png";
import ped2Asset from "../assets/sprites/Masked Black Male.png";
import ped3Asset from "../assets/sprites/Masked Latin Female.png";
import ped4Asset from "../assets/sprites/Masked Latin Male.png";
import ped5Asset from "../assets/sprites/Masked Pregnant Female.png";
import ped6Asset from "../assets/sprites/Masked White Female.png";
import ped7Asset from "../assets/sprites/Masked White Male.png";
import ped8Asset from "../assets/sprites/Masked Magic Man.png";
import ped9Asset from "../assets/sprites/Masked Muscular White Male.png";
import ped10Asset from "../assets/sprites/Masked White Female 2.png";
import ped11Asset from "../assets/sprites/Masked White Female 3.png";
import ped12Asset from "../assets/sprites/Masked White Male 2.png";

import ped13Asset from "../assets/sprites/Maskless Black Female.png";
import ped14Asset from "../assets/sprites/Maskless Black Male.png";
import ped15Asset from "../assets/sprites/Maskless Child.png";
import ped16Asset from "../assets/sprites/Maskless Latin Female.png";
import ped17Asset from "../assets/sprites/Maskless Latin Male.png";
import ped18Asset from "../assets/sprites/Maskless Pregnant Female.png";
import ped19Asset from "../assets/sprites/Maskless White Female.png";
import ped20Asset from "../assets/sprites/Maskless White Male.png";
import ped21Asset from "../assets/sprites/Maskless White Male 2.png";
import ped22Asset from "../assets/sprites/Maskless White Female 2.png";
import ped23Asset from "../assets/sprites/Maskless White Female 3.png";
import ped24Asset from "../assets/sprites/Maskless Muscular White Male.png";
import ped25Asset from "../assets/sprites/Maskless Bauldric.png";

import cloudAsset from "../assets/sprites/cloud.png";
import droneAsset from "../assets/sprites/drone.png";

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
        this.load.image('title', titleAsset);
        this.load.image('playButton', playButtonAsset);
        this.load.image('scoreButton', scoreButtonAsset);
        this.load.image('scoreZone', scoreZoneAsset);
        this.load.image('gameOverTitle', gameOverAsset);
        this.load.image('restartButton', restartButtonAsset);

        //player and obstacles
        this.load.spritesheet(
            'player', 
            playerAsset,
            { frameWidth: 384, frameHeight: 384 }
        );

        this.load.spritesheet(
          'cloud', 
          cloudAsset,
          { frameWidth: 192, frameHeight: 192 }
        );

        //there should be a better way to do this but idk
        this.load.spritesheet('ped1', ped1Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped2', ped2Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped3', ped3Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped4', ped4Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped5', ped5Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped6', ped6Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped7', ped7Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped8', ped8Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped9', ped9Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped10', ped10Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped11', ped11Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped12', ped12Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped13', ped13Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped14', ped14Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped15', ped15Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped16', ped16Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped17', ped17Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped18', ped18Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped19', ped19Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped20', ped20Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped21', ped21Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped22', ped22Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped23', ped23Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped24', ped24Asset, { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped25', ped25Asset, { frameWidth: 384, frameHeight: 384 });

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