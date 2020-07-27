import { SCENES } from "../sceneHandler.js";

let gameProperties;

let highScore;
let scoreZone;
let level;
let pedSpeed; //peds move right to left
let sneezeChance;
let pedCollider;
let cloudCollider;
let scoreCollider;

let ground;

let player;
let peds;
let ped;
let newped;
let newpedNum;
let clouds;
let cloud;
let hitBoxHeight;
let hitBoxWidth;

let jumpSFX;
let coughSFX;
let sneezeSFX;
let gameOverSFX;

//functions below class
export class gameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.GAME
        });
    }

    init(sceneData) {
        gameProperties = sceneData;

        //get rid of this later
        let gameData = {}
        if(gameData.highScore) {
            highScore = gameData.highScore;
        } else {
            highScore = 0;
        }
        level = 1;

        pedSpeed = gameProperties.width * -0.6;
    }

    create() {
        //let player pause
        gameProperties.buttons.pauseButton.on("pointerdown", () => {
            this.scene.pause();
            this.scene.launch(SCENES.PAUSED);
        });
        
        //sounds
        //jumpSFX = this.sound.add('jumpSound');
        // sneezeSFX = this.sound.add('sneezeSound');
        // coughSFX = this.sound.add('coughSound');
        //gameOverSFX = this.sound.add('gameOverSound');

        //player can view score in upper-left corner
        gameProperties.scoreText = gameProperties.addText(this, {
            content: gameProperties.score,
            widthRatio: 0.05,
            heightRatio: 0.05
        });
        
        //invisible to the player, but adds points when touched by ped
        scoreZone = this.physics.add.sprite((gameProperties.width * 0.1), (gameProperties.height * 0.9 - 50), 'scoreZone').setScale(gameProperties.heightScale);

        //sets up player properties
        player = this.physics.add.sprite((gameProperties.width * 0.1), (gameProperties.height * 0.9 - 50), 'player');
        player.setCollideWorldBounds(true);
        player.setScale(gameProperties.heightScale);

        //sprite "boxes" are larger than the sprite, so we resize them
        hitBoxHeight = player.body.height * 0.7;
        hitBoxWidth = player.body.width * 0.25;

        player.body.setSize(hitBoxWidth, hitBoxHeight, true);

        //sets up peds group and creates first one
        peds = this.physics.add.group();

        const firstPed = `ped${randomPedNumber()}`;
        ped = peds.create((gameProperties.width * 1.2), (gameProperties.height * 0.9 - 50), firstPed);
        ped.setScale(gameProperties.heightScale);
        ped.masked = true;
        ped.body.setSize(hitBoxWidth, hitBoxHeight, true);
        ped.setVelocityX(pedSpeed);

        //sets up virus cloud
        clouds = this.physics.add.group();

        //pedestrian walking animations
        for(let i=1; i<=25; i++) {
            this.anims.create(createWalkingAnim(i, this.anims));
        }

        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 12 }),
            frameRate: 20
        });

        this.anims.create({
            key: 'falling',
            frames: this.anims.generateFrameNumbers('player', { start: 13, end: 15 }),
            frameRate: 5,
            repeat: 1
        });

        this.anims.create({
            key: 'virusCloud',
            frames: this.anims.generateFrameNumbers('cloud', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'gg',
            frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }),
            frameRate: 4
        });

        ped.anims.play('walking1');

        this.physics.add.collider(scoreZone, ground);
        this.physics.add.collider(player, ground);
        this.physics.add.collider(peds, ground);

        scoreCollider = this.physics.add.overlap(scoreZone, peds, addScore, null, this);
        pedCollider = this.physics.add.overlap(player, peds, contact, null, this);
        cloudCollider = this.physics.add.overlap(player, clouds, contact, null, this);
    }

    update() {
        if (player.infected === true) {
            player.anims.play('gg', true);
            let animOver = player.anims.getProgress();
            if(animOver == 1) {
                runGameOver(this.scene);
            }
        } else {
            if (player.body.touching.down === false) {
                player.anims.play('falling');
            } else {
                player.setVelocityX(0);
                player.anims.play('running', true);
            }
      
            if ((gameProperties.cursors.space.isDown || gameProperties.cursors.up.isDown || gameProperties.pointer.isDown) && player.body.touching.down) {
                if(!gameProperties.muted) {
                    //jumpSFX.play();
                }
                player.setVelocityY(gameProperties.height * -1);
            }
            
            sneezeChance = rollRandomNumber();
            if(sneezeChance > 985) {
                //if statements make sure there are
                //peds to sneeze/cough
                //no floating virus clouds
                if(ped && ped.body && ped.body.touching.down) {
                    pedSneeze(ped);
                } 
                if(newped && newped.body && newped.body.touching.down) {
                    pedSneeze(newped);
                }
            } else if(sneezeChance < 30) {
                if(ped && ped.body && ped.body.touching.down) {
                    pedCough(ped);
                } 
                if(newped && newped.body && newped.body.touching.down) {
                    pedCough(newped);
                }
            }
      
            if(gameProperties.score / 10 == level) {
                level++;
                pedSpeed -= (100 * gameProperties.widthScale)
            }
      
            gameProperties.background.bg.tilePositionX += 0.5;
            gameProperties.background.mg.tilePositionX += 2.5;
            gameProperties.background.fg.tilePositionX += 3.75;
        }
    }
};
      
function rollRandomNumber() {
    return Phaser.Math.Between(1, 1000)
}

function pedSneeze(ped) {
    const thisPedSpeed = ped.body.velocity.x || 0;
    const pedPositionX = ped.x + (ped.displayOriginX / 2);
    // if(!gameProperties.muted) {
    //     sneezeSFX.play();
    // }
    
    if (ped.masked == null) {
        cloud = clouds.create(pedPositionX, ped.y + 75, 'cloud');
        cloud.setScale(gameProperties.heightScale);

        cloud.body.setSize(150, 100, true);
        cloud.setVelocityX(thisPedSpeed - 200);
        cloud.anims.play('virusCloud');
    } else {
        cloud = clouds.create(pedPositionX, ped.y + 75, 'cloud');
        cloud.setScale(gameProperties.heightScale);

        cloud.body.setSize(150, 100, true);
        cloud.body.setAllowGravity(false);
        cloud.setVelocityX(thisPedSpeed);
        cloud.anims.play('virusCloud');
    }
}

function pedCough(ped) {
    const thisPedSpeed = ped.body.velocity.x || 0;
    const pedPositionX = ped.x + (ped.displayOriginX / 2);
    // if(!gameProperties.muted) {
    //     coughSFX.play();
    // }

    if (ped.masked == null) {
        cloud = clouds.create(pedPositionX, ped.y + 75, 'cloud');
        cloud.setScale(gameProperties.heightScale);

        cloud.body.setSize(150, 100, true);
        cloud.setVelocityX(thisPedSpeed - 75);
        cloud.anims.play('virusCloud');
    } else {
        cloud = clouds.create(pedPositionX, ped.y + 75, 'cloud');
        cloud.setScale(gameProperties.heightScale);

        cloud.body.setSize(150, 100, true);
        cloud.body.setAllowGravity(false);
        cloud.setVelocityX(thisPedSpeed);
        cloud.anims.play('virusCloud');
    }
}

function addScore(_scoreZone, ped) {
    if (ped.scored == undefined) {
        gameProperties.score += 1;
        gameProperties.scoreText.setText(gameProperties.score);
  
        newpedNum = randomPedNumber();

        newped = peds.create((gameProperties.width * 1.3), (gameProperties.height * 0.9 - 15), `ped${newpedNum}`);
        newped.setScale(gameProperties.heightScale);

        //no flying pedestrians
        newped.setVelocityY(2000);
        newped.setVelocityX(
            Phaser.Math.Between((pedSpeed - 10), (pedSpeed + 10))
        );
        newped.body.setSize(100, 300, true);
        if(newpedNum <= 12) {
            newped.masked = true;
        }
        newped.anims.play(`walking${newpedNum}`);
  
        ped.scored = true;
    }
}

function randomPedNumber() {
    let num = Phaser.Math.Between(1, 25);
    return num;
}

function contact(player, _ped) {
    this.physics.world.removeCollider(pedCollider);
    this.physics.world.removeCollider(cloudCollider);
    this.physics.world.removeCollider(scoreCollider);

    if(!gameProperties.muted) {
        //gameOverSFX.play();
    }

    player.infected = true;
}

function createWalkingAnim(pedId, anims) {
    return {
        key: `walking${pedId}`,
        frames: anims.generateFrameNumbers(`ped${pedId}`, { start: 1, end: 8 }),
        frameRate: 8,
        repeat: -1
    }
}

function runGameOver(scene) {
    scene.start(SCENES.GAMEOVER, { "gameScore": gameProperties.score, "highScore": highScore });
}