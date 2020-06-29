import { GLOBALS } from "../globals.js";

let highScore;
let score;
let scoreText;
let scoreZone;
let level;
let pedSpeed; //peds move right to left
let cursors;
let sneezeChance;
let pedCollider;
let cloudCollider;
let scoreCollider;

let bg;
let mg;
let fg;
let ground;

let player;
let peds;
let ped;
let newped;
let newpedNum;
let clouds;
let cloud;

let jumpSFX;
let coughSFX;
let sneezeSFX;
let gameOverSFX;

//functions below class
export class gameScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.GAME
        });
    }

    init(gameData) {
        if(gameData.highScore) {
            highScore = gameData.highScore;
        } else {
            highScore = "00";
        }

        score = 0;
        level = 1;
        pedSpeed = -650;
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        //create the background
        bg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'background').setDepth(0);
        mg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'midground').setDepth(0);
        fg = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, 'foreground').setDepth(0);

        bg.setOrigin(0);
        mg.setOrigin(0);
        fg.setOrigin(0);

        //floor to run on
        ground = this.physics.add.staticGroup();
        ground.create(840, 1900, 'ground').refreshBody();
        
        //invisible to the player, but adds points when touched by ped
        scoreZone = this.physics.add.sprite(200, 1700, 'scoreZone');

        //sounds
        jumpSFX = this.sound.add('jumpSound');
        sneezeSFX = this.sound.add('sneezeSound');
        coughSFX = this.sound.add('coughSound');
        gameOverSFX = this.sound.add('gameOverSound');

        //sets up player properties
        player = this.physics.add.sprite(200, 1700, 'player');
        player.setCollideWorldBounds(true);
        player.body.setSize(100, 300, true);

        //sets up peds group and creates first one
        peds = this.physics.add.group();

        const firstPed = `ped${randomPedNumber()}`;
        ped = peds.create(1680, 1700, firstPed);
        ped.masked = true;
        ped.body.setSize(100, 280, true);
        ped.setVelocityX(pedSpeed + 200);

        //sets up virus cloud
        clouds = this.physics.add.group();

        scoreText = this.add.text(10, 10, `score: ${score}`, { fontFamily: "dogicapixel", fontSize: '64px', fill: '#FFF' });
        score = 0;

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
      
            if (cursors.up.isDown && player.body.touching.down) {
                jumpSFX.play();
                player.setVelocityY(-1600);
            }
            
            sneezeChance = rollRandomNumber();
            if(sneezeChance > 985) {
                if(ped && ped.body) {
                    pedSneeze(ped);
                } 
                if(newped && newped.body) {
                    pedSneeze(newped);
                }
            } else if(sneezeChance < 30) {
                if(ped && ped.body) {
                    pedCough(ped);
                } 
                if(newped && newped.body) {
                    pedCough(newped);
                }
            }
      
            if(score / 100 == level) {
                level++;
                pedSpeed -= 100
            }
      
            bg.tilePositionX += 0.5;
            mg.tilePositionX += 2.5;
            fg.tilePositionX += 3.75;
        }
    }
};
      
function rollRandomNumber() {
    return Phaser.Math.Between(1, 1000)
}

function pedSneeze(ped) {
    const thisPedSpeed = ped.body.velocity.x || 0;
    sneezeSFX.play();
    
    if (ped.masked == null) {
        cloud = clouds.create(ped.x, ped.y + 100, 'cloud');
        cloud.body.setSize(150, 100, true);
        cloud.setVelocityX(thisPedSpeed - 300);
        cloud.anims.play('virusCloud');
    } else {
        cloud = clouds.create(ped.x + 50, ped.y + 100, 'cloud');
        cloud.body.setSize(150, 100, true);
        cloud.body.setAllowGravity(false);
        cloud.setVelocityX(thisPedSpeed);
        cloud.anims.play('virusCloud');
    }
}

function pedCough(ped) {
    const thisPedSpeed = ped.body.velocity.x || 0;
    coughSFX.play();

    if (ped.masked == null) {
        cloud = clouds.create(ped.x, ped.y + 100, 'cloud');
        cloud.body.setSize(150, 100, true);
        cloud.setVelocityX(thisPedSpeed - 100);
        cloud.anims.play('virusCloud');
    } else {
        cloud = clouds.create(ped.x + 50, ped.y + 100, 'cloud');
        cloud.body.setSize(150, 100, true);
        cloud.body.setAllowGravity(false);
        cloud.setVelocityX(thisPedSpeed);
        cloud.anims.play('virusCloud');
    }
}

function addScore(_scoreZone, ped) {
    if (ped.scored == undefined) {
        score += 10;
        scoreText.setText(`score: ${score}`);
  
        newpedNum = randomPedNumber();
  
        newped = peds.create(1680, 1900, `ped${newpedNum}`);
        newped.setVelocityX(
            Phaser.Math.Between((pedSpeed - 200), (pedSpeed + 200))
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

    gameOverSFX.play();

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

function testAnim(arg) {
    console.log(arg);
    return;
}

function runGameOver(scene) {
    if (score == 0) {
        score = "00";
    }
    scene.start(GLOBALS.SCENES.GAMEOVER, { "gameScore": score, "highScore": highScore });
}