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
        this.load.image('pedZone', '../src/assets/score-zone.png');
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
                    { fontFamily: "dogicapixel", fontSize: '64px', fill: text.fill }
                ).setScale(userDevice.heightScale).setDepth(2);
            },
            createWalkingAnim: (pedId, anims) => {
                return {
                    key: `walking${pedId}`,
                    frames: anims.generateFrameNumbers(`ped${pedId}`, { start: 1, end: 8 }),
                    frameRate: 8,
                    repeat: -1
                }
            },
            cough: (ped) => {
                //secondary check
                if(ped.coughed != true) {
                    const thisPedSpeed = ped.body.velocity.x || 0;
                    const pedPositionX = ped.x + (ped.displayOriginX / 2) - 10;
                    if(!gameProperties.muted) {
                        //coughSFX.play();
                    }
                
                    if (ped.masked == null) {
                        let cloud = gameProperties.gameObjects.clouds.create(
                            pedPositionX, 
                            ped.y + 75, 
                            'cloud'
                        ).setScale(userDevice.heightScale).setVelocityX(thisPedSpeed - 75);

                        cloud.body.setSize(150, 100, true);
                        cloud.anims.play('cloudIdle');
                    } else {
                        let cloud = gameProperties.gameObjects.clouds.create(
                            pedPositionX, 
                            ped.y + 75, 
                            'cloud'
                        ).setScale(userDevice.heightScale).setVelocityX(thisPedSpeed);
                
                        cloud.body.setSize(150, 100, true).setAllowGravity(false);
                        cloud.anims.play('cloudIdle');
                    }
                }
                ped.coughed = true;
            },
            sneeze: (ped) => {
                //secondary check
                if(ped.sneezed != true) {
                    const thisPedSpeed = ped.body.velocity.x || 0;
                    const pedPositionX = ped.x + (ped.displayOriginX / 2) - 10;
                    if(!gameProperties.muted) {
                        //sneezeSFX.play();
                    }
                    
                    if (ped.masked == null) {
                        let cloud = gameProperties.gameObjects.clouds.create(
                            pedPositionX, 
                            ped.y + 75, 
                            'cloud'
                        ).setScale(userDevice.heightScale).setVelocityX(thisPedSpeed * 3);
    
                        cloud.body.setSize(150, 100, true);
                        cloud.anims.play('cloudIdle');
                    } else {
                        let cloud = gameProperties.gameObjects.clouds.create(
                            pedPositionX, 
                            ped.y + 75, 
                            'cloud'
                        ).setScale(userDevice.heightScale).setVelocityX(thisPedSpeed);
    
                        cloud.body.setSize(150, 100, true).setAllowGravity(false);
                        cloud.anims.play('cloudIdle');
                    }
                }
                ped.sneezed = true;
            },
            coughOrSneeze1: () => {
                const frontMostPed = gameProperties.activePeds[gameProperties.activePeds.length - 1];

                if(frontMostPed.zone1Touched == undefined) {
                    const coinFlip = Phaser.Math.Between(1, 100);
                    if(coinFlip <= 25) {
                        gameProperties.cough(frontMostPed);
                    } else if(coinFlip >= 80) {
                        gameProperties.sneeze(frontMostPed);
                    }
                } 
                frontMostPed.zone1Touched = true;
            },
            coughOrSneeze2: () => {
                const frontMostPed = gameProperties.activePeds[gameProperties.activePeds.length - 1];

                if(frontMostPed.zone2Touched == undefined) {
                    const coinFlip = Phaser.Math.Between(1, 100);
                    if(coinFlip <= 25) {
                        gameProperties.cough(frontMostPed);
                    } else if(coinFlip >= 80) {
                        gameProperties.sneeze(frontMostPed);
                    }
                } 
                frontMostPed.zone2Touched = true;
            },
            increaseScore: () => {
                const frontmostPed = gameProperties.activePeds[gameProperties.activePeds.length - 1];
                gameProperties.score += 1;
                gameProperties.scoreText.setText(gameProperties.score);

                //we want to remove this ped's collider immediately, so they're only scored once
                //we also don't want them to fall through the ground
                frontmostPed.body.setAllowGravity(false);
                gameProperties.gameObjects.peds.remove(frontmostPed);
                gameProperties.activePeds.pop();

                //add new ped to the array, more per level
                for(let i = 1; i <= gameProperties.level; i+=2) {
                    if(gameProperties.activePeds.length < gameProperties.level) {
                        gameProperties.activePeds.unshift(
                            gameProperties.addRandomPed()
                        );
                    }
                }
                
                //level up
                if(gameProperties.score / 10 == gameProperties.level) {
                    gameProperties.level++;
                    gameProperties.pedSpeed -= (10 * userDevice.widthScale);
                }
            },
            contact: () => {
                this.physics.world.removeCollider(gameProperties.colliders.pedCollider);
                this.physics.world.removeCollider(gameProperties.colliders.cloudCollider);
                this.physics.world.removeCollider(gameProperties.colliders.scoreCollider);
    
                gameProperties.gameObjects.player.isDown = true;
                gameProperties.gameObjects.player.isInMotion = false;
    
                if(!gameProperties.muted) {
                    //gameOverSFX.play();
                }
            },
            addOverlaps: () => {
                gameProperties.colliders.scoreCollider = this.physics.add.overlap(
                    gameProperties.gameObjects.scoreZone, 
                    gameProperties.gameObjects.peds, 
                    gameProperties.increaseScore,
                    null,
                    this
                );
                gameProperties.colliders.pedCollider = this.physics.add.overlap(
                    gameProperties.gameObjects.player, 
                    gameProperties.gameObjects.peds, 
                    gameProperties.contact, 
                    null, 
                    this
                );
                gameProperties.colliders.cloudCollider = this.physics.add.overlap(
                    gameProperties.gameObjects.player, 
                    gameProperties.gameObjects.clouds, 
                    gameProperties.contact, 
                    null, 
                    this
                );
            },
            //game props
            spriteScale: userDevice.heightScale,
            muted: false,
            score: 0,
            highScore: 0,
            level: 1,
            jumpVelocity: -1.1 * userDevice.height,
            activePeds: [],
            pedSpeed: -350 * userDevice.widthScale,
            maxPedSpeed: -500 * userDevice.widthScale, //more like minimum, but right-to-left
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
            animations: {

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

        //invisible to the player, but adds points when touched by ped
        gameProperties.gameObjects.scoreZone = this.physics.add.sprite(
            (userDevice.width * 0.05), 
            (userDevice.height * 0.7), 
            'scoreZone'
        ).setScale(userDevice.heightScale);

        //invisible to the player; peds will spawn at these locations
        gameProperties.gameObjects.pedZone1 = this.physics.add.sprite(
            (userDevice.width * 1.1), 
            (userDevice.height * 0.7), 
            'pedZone'
        ).setScale(userDevice.heightScale);

        gameProperties.gameObjects.pedZone2 = this.physics.add.sprite(
            (userDevice.width * 1.2), 
            (userDevice.height * 0.7), 
            'pedZone'
        ).setScale(userDevice.heightScale);

        gameProperties.gameObjects.pedZone3 = this.physics.add.sprite(
            (userDevice.width * 1.3), 
            (userDevice.height * 0.7), 
            'pedZone'
        ).setScale(userDevice.heightScale);

        //invisible to the player; peds may cough/sneeze at these locations
        gameProperties.gameObjects.coughZone1 = this.physics.add.sprite(
            (userDevice.width * 0.4), 
            (userDevice.height * 0.7), 
            'coughZone'
        ).setScale(userDevice.heightScale);

        gameProperties.gameObjects.coughZone2 = this.physics.add.sprite(
            (userDevice.width * 0.6), 
            (userDevice.height * 0.7), 
            'coughZone'
        ).setScale(userDevice.heightScale);

        //player, peds, and obstacles
        gameProperties.gameObjects.player = this.physics.add.sprite(
            (userDevice.width * 0.1), 
            gameProperties.gameObjects.scoreZone.y,
            'player'
        ).setCollideWorldBounds(true)
        .setScale(userDevice.heightScale)
        .setVisible(false);

        //sets up peds group
        gameProperties.gameObjects.peds = this.physics.add.group();
        
        //sets up cloud group
        gameProperties.gameObjects.clouds = this.physics.add.group();

        //sprite "boxes" are larger than the sprite, so we resize them
        gameProperties.gameObjects.hitBoxHeight = gameProperties.gameObjects.player.body.height * 0.7;
        gameProperties.gameObjects.hitBoxWidth = gameProperties.gameObjects.player.body.width * 0.25;

        gameProperties.gameObjects.player.body.setSize(
            gameProperties.gameObjects.hitBoxWidth, 
            gameProperties.gameObjects.hitBoxHeight, 
            true
        );

        //=== animations ===
        //pedestrian walking animations
        for(let i=1; i<=25; i++) {
            const thisKey = `walking${i}`;
            gameProperties.animations[thisKey] = this.anims.create(
                gameProperties.createWalkingAnim(i, this.anims)
            );
        }

        gameProperties.animations.running = this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
            frameRate: 16,
            repeat: -1
        });

        gameProperties.animations.jumping = this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 12 }),
            frameRate: 20
        });

        gameProperties.animations.falling = this.anims.create({
            key: 'falling',
            frames: this.anims.generateFrameNumbers('player', { start: 13, end: 15 }),
            frameRate: 5,
            repeat: 1
        });

        gameProperties.animations.cloudIdle = this.anims.create({
            key: 'cloudIdle',
            frames: this.anims.generateFrameNumbers('cloud', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
        });

        gameProperties.animations.gg = this.anims.create({
            key: 'gg',
            frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }),
            frameRate: 4
        });

        //=== colliders ===
        gameProperties.colliders.scoreZoneGround = this.physics.add.collider(
            gameProperties.gameObjects.scoreZone, 
            gameProperties.gameObjects.ground
        );
        gameProperties.colliders.pedZone1Ground = this.physics.add.collider(
            gameProperties.gameObjects.pedZone1, 
            gameProperties.gameObjects.ground
        );
        gameProperties.colliders.pedZone2Ground = this.physics.add.collider(
            gameProperties.gameObjects.pedZone2, 
            gameProperties.gameObjects.ground
        );
        gameProperties.colliders.coughZone1Ground = this.physics.add.collider(
            gameProperties.gameObjects.coughZone1, 
            gameProperties.gameObjects.ground
        );
        gameProperties.colliders.coughZone2Ground = this.physics.add.collider(
            gameProperties.gameObjects.coughZone2, 
            gameProperties.gameObjects.ground
        );
        gameProperties.colliders.pedZone3Ground = this.physics.add.collider(
            gameProperties.gameObjects.pedZone3, 
            gameProperties.gameObjects.ground
        );
        gameProperties.colliders.playerGround = this.physics.add.collider(
            gameProperties.gameObjects.player, 
            gameProperties.gameObjects.ground
        );
        gameProperties.colliders.pedsGround = this.physics.add.collider(
            gameProperties.gameObjects.peds, 
            gameProperties.gameObjects.ground
        );
        //permanent overlaps
        gameProperties.colliders.coughCollider1 = this.physics.add.overlap(
            gameProperties.gameObjects.coughZone1, 
            gameProperties.gameObjects.peds, 
            gameProperties.coughOrSneeze1,
            null,
            this
        );
        gameProperties.colliders.coughCollider2 = this.physics.add.overlap(
            gameProperties.gameObjects.coughZone2, 
            gameProperties.gameObjects.peds, 
            gameProperties.coughOrSneeze2,
            null,
            this
        );


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
        
        //=== sounds ===
        //jumpSFX = this.sound.add('jumpSound');
        // sneezeSFX = this.sound.add('sneezeSound');
        // coughSFX = this.sound.add('coughSound');
        //gameOverSFX = this.sound.add('gameOverSound');

        //=== ui buttons ===
        //pause
        gameProperties.buttons.pauseButton = gameProperties.addButton(this, {
            name: "pause",
            widthRatio: 0.8,
            heightRatio: 0.05
        });
        gameProperties.buttons.pauseButton.on("pointerdown", () => {
            gameProperties.gameObjects.player.isInMotion = false;
            this.scene.pause();
            this.scene.launch(SCENES.PAUSED, gameProperties);
        });
        gameProperties.buttons.pauseButton.setVisible(false);

        //unmute
        //this will be hidden at first
        gameProperties.buttons.unMuteButton = gameProperties.addButton(this, {
            name: "soundOff",
            widthRatio: 0.9,
            heightRatio: 0.05
        });

        //mute
        gameProperties.buttons.muteButton = gameProperties.addButton(this, {
            name: "soundOn",
            widthRatio: 0.9,
            heightRatio: 0.05
        });
        
        //lets player mute and unmute
        gameProperties.buttons.muteButton.on("pointerdown", () => {
            gameProperties.muted = true;
            this.sound.mute = true;
            gameProperties.buttons.unMuteButton.setDepth(2);
        });
        gameProperties.buttons.unMuteButton.on("pointerdown", () => {
            gameProperties.muted = false;
            this.sound.mute = false;
            gameProperties.buttons.unMuteButton.setDepth(0);
        });

        //player controls        
        gameProperties.cursors = this.input.keyboard.createCursorKeys();
        gameProperties.pointer = this.input.activePointer;

        //pass the properties and game objects to the next scene
        this.scene.launch(SCENES.STARTMENU, gameProperties);
    }
}