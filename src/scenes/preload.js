import { SCENES } from "../sceneHandler.js";

export class preloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.PRELOAD
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
        //this will hold all info about the game area and should only be referenced here
        const userDevice = {
            width: this.game.renderer.width,
            widthScale: (this.game.renderer.width / 1080),
            //we'll leave 50px for ad space
            height: this.game.renderer.height - 50,
            heightScale: (this.game.renderer.height / 1920),
            //sprites and bg are on different ratios
            bgHeight: 1293,
            bgWidth: 4096, //must be power of 2
            bgHeightScale: ((this.game.renderer.height - 50) / 1293), //bg scaled to fit 727 x 1293
        }

        // this object will hold all of our game data and be used/updated in every scene
        const gameProperties = {
            //using methods will keep things organized and let us access game area props
            addImage: (scene, sprite) => {
                return scene.add.image(
                    userDevice.width * sprite.widthRatio, 
                    userDevice.height * sprite.heightRatio,
                    sprite.name
                ).setDepth(1).setScale(userDevice.heightScale);
            },
            bgTileSprite: (scene, spriteName) => {
                return scene.add.tileSprite(0, 0, 4096, 1293, spriteName)
                    .setDepth(0)
                    .setOrigin(0)
                    .setScale(userDevice.bgHeightScale)
                ;
            },
            addButton: (scene, sprite) => {
                return scene.add.image(
                    userDevice.width * sprite.widthRatio, 
                    userDevice.height * sprite.heightRatio,
                    sprite.name
                ).setDepth(1).setScale(userDevice.heightScale).setInteractive();
            },
            addText: (scene, text) => {
                return scene.add.text(
                    userDevice.width * text.widthRatio, 
                    userDevice.height * text.heightRatio,
                    text.content,
                    { fontFamily: "dogicapixel", fontSize: '64px', fill: '#FFF' }
                ).setScale(userDevice.heightScale);
            },
            //game props
            muted: false,
            score: 0,
            highScore: 0,
            level: 1,
            background: {
                //populated below using methods in this object
            },
            buttons: {
                //populated below using methods in this object
            },
            text: {
                //populated below using methods in this object
            },
            gameObjects: {
                //populated below using methods in this object
            },
            colliders: {
                //populated below using methods in this object
            }
        }

        //create the background
        gameProperties.background.bg = gameProperties.bgTileSprite(this, 'background');
        gameProperties.background.mg = gameProperties.bgTileSprite(this, 'midground');
        gameProperties.background.fg = gameProperties.bgTileSprite(this, 'foreground');

        //filter to darken background for start menu
        gameProperties.background.screenDarken = this.add.image(0, 0, "screenDarken")
            .setDepth(1)
            .setOrigin(0)
            .setScale(userDevice.heightScale)
        ;

        //create the ground (and ad space)
        gameProperties.gameObjects.ground = this.physics.add.staticGroup()
            .create(0, userDevice.height, 'ground')
            .setOrigin(0)
            .refreshBody()
        ;

        //=== start menu section ===
        //"Social Distance Jumper"
        gameProperties.background.title = gameProperties.addImage(this, {
            name: "title",
            widthRatio: 0.5,
            heightRatio: 0.25
        });

        //start button
        gameProperties.buttons.playButton = gameProperties.addButton(this, {
            name: "playButton",
            widthRatio: 0.5,
            heightRatio: 0.85
        });

        //copyright
        gameProperties.background.copyright = gameProperties.addImage(this, {
            name: "copyright",
            widthRatio: 0.5,
            heightRatio: 0.95
        });

        //=== ui buttons ===
        //pause
        gameProperties.buttons.pauseButton = gameProperties.addButton(this, {
            name: "pause",
            widthRatio: 0.9,
            heightRatio: 0.05
        });

        //unmute
        //this will be hidden at first
        gameProperties.buttons.unMuteButton = gameProperties.addButton(this, {
            name: "soundOff",
            widthRatio: 0.8,
            heightRatio: 0.05
        });

        //mute
        gameProperties.buttons.muteButton = gameProperties.addButton(this, {
            name: "soundOn",
            widthRatio: 0.8,
            heightRatio: 0.05
        });
        
        //lets player mute and unmute
        gameProperties.buttons.muteButton.on("pointerdown", () => {
            if(gameProperties.muted) {
                gameProperties.muted = false;
                this.sound.mute = false;
                gameProperties.buttons.unMuteButton.setDepth(0);
            } else {
                gameProperties.muted = true;
                this.sound.mute = true;
                gameProperties.buttons.unMuteButton.setDepth(2);
            }
        });

        //main game functionality
        //player controls        
        gameProperties.cursors = this.input.keyboard.createCursorKeys();
        gameProperties.pointer = this.input.activePointer;



        //pass the properties and game objects to the next scene
        this.scene.launch(SCENES.STARTMENU, gameProperties);
    }
}