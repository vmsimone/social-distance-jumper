import { GLOBALS } from "../globals.js";

let score = 0;
let scoreText;
let scoreZone;
let level = 1;
let cursors;
let gameOver;
let sneezeChance;
let pedCollider;

let bg;
let mg;
let fg;
let ground;

let player;
let peds;
let ped;
let newped;
let newpedNum;
let virus;
let cloud;
      
function rollRandomNumber() {
    return Phaser.Math.Between(1, 1000)
}

function pedSneeze(ped) {
    if(ped.masked == null) {
        cloud = virus.create(ped.x, ped.y, 'virus');
        cloud.body.setSize(20, 32, true);
        cloud.setVelocityX(-200);
    } else {
        cloud = virus.create(ped.x, ped.y, 'virus');
        cloud.body.setSize(20, 32, true);
    }
}

function addScore(_scoreZone, ped) {
    if (ped.scored == undefined) {
        score += 10;
        scoreText.setText(`score: ${score}`);
  
        newpedNum = randomPedNumber();
  
        newped = peds.create(350, 200, `ped${newpedNum}`);
        newped.setVelocityX(
            Phaser.Math.Between(-90, -150)
        );
        newped.body.setSize(20, 48, true);
        if(newpedNum <= 8) {
            newped.masked = true;
        }
        newped.anims.play(`walking${newpedNum}`);
  
        ped.scored = true;
    }
}

function randomPedNumber() {
    let num = Phaser.Math.Between(1, 15);
    return num;
}

function contact(player, _ped) {
    player.infected = true;
    // if(pedCollider) {
    //     pedCollider.destroy();
    // }
}

function createWalkingAnim(pedId, anims) {
    return {
        key: `walking${pedId}`,
        frames: anims.generateFrameNumbers(`ped${pedId}`, { start: 1, end: 8 }),
        frameRate: 8,
        repeat: -1
    }
}

export class gameScene extends Phaser.Scene {
    constructor() {
        super({
            key: GLOBALS.SCENES.GAME
        });
    }

    init(data) {
        console.log(data);
    }

    create() {
        console.log("Game Created");
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
        ground.create(200, 200, 'ground').refreshBody();
        
        //invisible to the player, but adds points when touched by ped
        scoreZone = this.physics.add.sprite(50, 184, 'scoreZone');

        //sets up player properties
        player = this.physics.add.sprite(50, 150, 'player');
        player.setCollideWorldBounds(true);
        player.body.setSize(20, 50, true);

        //sets up peds group and creates first one
        peds = this.physics.add.group();

        const firstPed = `ped${randomPedNumber()}`;
        ped = peds.create(300, 150, firstPed);
        ped.masked = true;
        ped.body.setSize(20, 48, true);
        ped.setVelocityX(-90);

        //sets up virus cloud
        virus = this.physics.add.group();

        scoreText = this.add.text(5, 5, `score: ${score}`, { fontSize: '16px', fill: '#FFF' });

        //pedestrian walking animations
        for(let i=1; i<=15; i++) {
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
            repeat: -1
        });

        this.anims.create({
            key: 'virusCloud',
            frames: this.anims.generateFrameNumbers('cloud', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'gg',
            frames: this.anims.generateFrameNumbers('player', { start: 17, end: 23 }),
            frameRate: 4
        });

        ped.anims.play('walking1');
        // cloud.anims.play('virusCloud');

        this.physics.add.collider(scoreZone, ground);
        this.physics.add.collider(player, ground);
        this.physics.add.collider(peds, ground);

        this.physics.add.overlap(scoreZone, peds, addScore, null, this);
        pedCollider = this.physics.add.overlap(player, peds, contact, null, this);
        this.physics.add.collider(player, virus, contact, null, this);
    }

    update() {
        if (player.infected === true && player.body.touching.down) {
            player.anims.play('gg', true);
            //restartGame();
            this.physics.pause();
            this.scene.start(GLOBALS.SCENES.GAMEOVER, "GAME OVER");
        } else {
            if (player.body.touching.down === false) {
                player.anims.play('falling');
            } else {
                player.setVelocityX(0);
                player.anims.play('running', true);
            }
      
            if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-300);
            }
            
            sneezeChance = rollRandomNumber();
            if(sneezeChance > 990) {
                pedSneeze(ped);
                if(newped) {
                    pedSneeze(newped);
                }
            }
      
            if(score / 100 == level) {
                level++;
                console.log(level);
            }
      
            bg.tilePositionX += 0.1;
            mg.tilePositionX += 0.5;
            fg.tilePositionX += 0.75;
        }
    }
};