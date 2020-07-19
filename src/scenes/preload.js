import { GLOBALS } from "../globals.js";

export class preloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.PRELOAD
        });
    }

    preload() {
        //background and game elements
        this.load.image('background', '../src/assets/background/background.png');
        this.load.image('midground', '../src/assets/background/midground.png');
        this.load.image('foreground', '../src/assets/background/foreground.png');
        this.load.image('ground', '../src/assets/ground.png');
        this.load.image('copyright', '../src/assets/Copyright.png');
        this.load.image('scoreZone', '../src/assets/score-zone.png');
        this.load.image('pause', '../src/assets/Pause-Button.png');
        this.load.image('soundOn', '../src/assets/sound_btn.png');
        this.load.image('soundOff', '../src/assets/sound_mute_btn.png');
        
        this.load.image('screenDarken', '../src/assets/ui/Screen Darkening Layer.png');
        this.load.image('title', '../src/assets/ui/Logo V2.png');
        this.load.image('playButton', '../src/assets/ui/Start Button.png');
        this.load.image('scoreButton', '../src/assets/ui/Score Button.png');

        this.load.image('getReady', '../src/assets/ui/Get Ready.png');
        this.load.image('instructions', '../src/assets/ui/Tap To Jump.png');

        this.load.image('scoreBoard', '../src/assets/ui/Score_Best.png');
        this.load.image('gameOverTitle', '../src/assets/ui/Game Over V1.png');
        this.load.image('credits', '../src/assets/Credits.png');
        this.load.image('restartButton', '../src/assets/ui/Restart Button.png');
        this.load.image('shareButton', '../src/assets/ui/Share Button.png');

        //player and obstacles
        this.load.spritesheet(
            'player', 
            '../src/assets/sprites/Player.png',
            { frameWidth: 384, frameHeight: 384 }
        );

        this.load.spritesheet(
            'cloud', 
            '../src/assets/sprites/cloud.png',
            { frameWidth: 192, frameHeight: 192 }
        );

        //there should be a better way to do this but idk
        this.load.spritesheet('ped1', '../src/assets/sprites/Masked Black Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped2', '../src/assets/sprites/Masked Black Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped3', '../src/assets/sprites/Masked Latin Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped4', '../src/assets/sprites/Masked Latin Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped5', '../src/assets/sprites/Masked Pregnant Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped6', '../src/assets/sprites/Masked White Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped7', '../src/assets/sprites/Masked White Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped8', '../src/assets/sprites/Masked Magic Man.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped9', '../src/assets/sprites/Masked Muscular White Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped10', '../src/assets/sprites/Masked White Female 2.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped11', '../src/assets/sprites/Masked White Female 3.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped12', '../src/assets/sprites/Masked White Male 2.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped13', '../src/assets/sprites/Maskless Black Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped14', '../src/assets/sprites/Maskless Black Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped15', '../src/assets/sprites/Maskless Child.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped16', '../src/assets/sprites/Maskless Latin Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped17', '../src/assets/sprites/Maskless Latin Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped18', '../src/assets/sprites/Maskless Pregnant Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped19', '../src/assets/sprites/Maskless White Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped20', '../src/assets/sprites/Maskless White Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped21', '../src/assets/sprites/Maskless White Male 2.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped22', '../src/assets/sprites/Maskless White Female 2.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped23', '../src/assets/sprites/Maskless White Female 3.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped24', '../src/assets/sprites/Maskless Muscular White Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped25', '../src/assets/sprites/Maskless Bauldric.png', { frameWidth: 384, frameHeight: 384 });

        this.load.audio('music', [ 
            "src/assets/audio/Retro City Loop.mp3", 
            "src/assets/audio/Retro City Loop.wav"
        ]);
        this.load.audio('startSound', [ 
            "src/assets/audio/Start.mp3",
            "src/assets/audio/Start.ogg"
        ]);
        this.load.audio('jumpSound', [ 
            "src/assets/audio/Jump.mp3",
            "src/assets/audio/Jump.ogg"
        ]);
        this.load.audio('sneezeSound', [ 
            "src/assets/audio/Sneeze.mp3",
            "src/assets/audio/Sneeze.ogg"
        ]);
        this.load.audio('coughSound', [ 
            "src/assets/audio/Cough.mp3", 
            "src/assets/audio/Cough.ogg"
        ]);
        this.load.audio('gameOverSound', [ 
            "src/assets/audio/Game Over.mp3",
            "src/assets/audio/Game Over.ogg"
        ]);

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xaaffff
            }
        });

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        });
    }

    create() {
        // maybe add anims here?
        this.scene.start(GLOBALS.SCENES.STARTMENU, "preloaded");
    }
}