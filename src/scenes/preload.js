import { GLOBALS } from "../globals.js";

export class preloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.PRELOAD
        });
    }

    preload() {
        //background and game elements
        this.load.image('background', 'assets/background/background.png');
        this.load.image('midground', 'assets/background/midground.png');
        this.load.image('foreground', 'assets/background/foreground.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('copyright', 'assets/Copyright.png');
        this.load.image('scoreZone', 'assets/score-zone.png');
        this.load.image('pause', 'assets/Pause-Button.png');
        this.load.image('soundOn', 'assets/sound_btn.png');
        this.load.image('soundOff', 'assets/sound_mute_btn.png');
        
        this.load.image('screenDarken', 'assets/ui/Screen Darkening Layer.png');
        this.load.image('title', 'assets/ui/Logo V2.png');
        this.load.image('playButton', 'assets/ui/Start Button.png');
        this.load.image('scoreButton', 'assets/ui/Score Button.png');

        this.load.image('getReady', 'assets/ui/Get Ready.png');
        this.load.image('instructions', 'assets/ui/Tap To Jump.png');

        this.load.image('scoreBoard', 'assets/ui/Score_Best.png');
        this.load.image('gameOverTitle', 'assets/ui/Game Over V1.png');
        this.load.image('credits', 'assets/Credits.png');
        this.load.image('restartButton', 'assets/ui/Restart Button.png');
        this.load.image('shareButton', 'assets/ui/Share Button.png');

        //player and obstacles
        this.load.spritesheet(
            'player', 
            'assets/sprites/Player.png',
            { frameWidth: 384, frameHeight: 384 }
        );

        this.load.spritesheet(
            'cloud', 
            'assets/sprites/cloud.png',
            { frameWidth: 192, frameHeight: 192 }
        );

        //there should be a better way to do this but idk
        this.load.spritesheet('ped1', 'assets/sprites/Masked Black Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped2', 'assets/sprites/Masked Black Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped3', 'assets/sprites/Masked Latin Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped4', 'assets/sprites/Masked Latin Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped5', 'assets/sprites/Masked Pregnant Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped6', 'assets/sprites/Masked White Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped7', 'assets/sprites/Masked White Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped8', 'assets/sprites/Masked Magic Man.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped9', 'assets/sprites/Masked Muscular White Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped10', 'assets/sprites/Masked White Female 2.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped11', 'assets/sprites/Masked White Female 3.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped12', 'assets/sprites/Masked White Male 2.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped13', 'assets/sprites/Maskless Black Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped14', 'assets/sprites/Maskless Black Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped15', 'assets/sprites/Maskless Child.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped16', 'assets/sprites/Maskless Latin Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped17', 'assets/sprites/Maskless Latin Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped18', 'assets/sprites/Maskless Pregnant Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped19', 'assets/sprites/Maskless White Female.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped20', 'assets/sprites/Maskless White Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped21', 'assets/sprites/Maskless White Male 2.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped22', 'assets/sprites/Maskless White Female 2.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped23', 'assets/sprites/Maskless White Female 3.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped24', 'assets/sprites/Maskless Muscular White Male.png', { frameWidth: 384, frameHeight: 384 });
        this.load.spritesheet('ped25', 'assets/sprites/Maskless Bauldric.png', { frameWidth: 384, frameHeight: 384 });

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