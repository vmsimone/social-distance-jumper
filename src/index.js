import Phaser from "phaser";

//background and game elements
import backgroundAsset from "./assets/cyberpunk-street-files/PNG/layers/far-buildings.png";
import midgroundAsset from "./assets/cyberpunk-street-files/PNG/layers/back-buildings.png";
import foregroundAsset from "./assets/cyberpunk-street-files/PNG/layers/foreground.png";
import groundAsset from "./assets/ground.png";
import scoreZoneAsset from "./assets/score-zone.png";

//characters and obstacles
import playerAsset from "./assets/sprites/Main Sprite.png";
import ped1Asset from "./assets/sprites/Masked Black Female.png";
import ped2Asset from "./assets/sprites/Masked Black Male.png";
import ped3Asset from "./assets/sprites/Masked Latin Female.png";
import ped4Asset from "./assets/sprites/Masked Latin Male.png";
import ped5Asset from "./assets/sprites/Masked Pregnant Female.png";
import ped6Asset from "./assets/sprites/Masked White Female.png";
import ped7Asset from "./assets/sprites/Masked White Male.png";
import ped8Asset from "./assets/sprites/Maskless Black Female Sprite.png";
import ped9Asset from "./assets/sprites/Maskless Black Male Sprite.png";
import ped10Asset from "./assets/sprites/Maskless Child Sprite.png";
import ped11Asset from "./assets/sprites/Maskless Latin Female Sprite.png";
import ped12Asset from "./assets/sprites/Maskless Latin Male Sprite.png";
import ped13Asset from "./assets/sprites/Maskless Pregnant Sprite.png";
import ped14Asset from "./assets/sprites/Maskless White Female Sprite.png";
import ped15Asset from "./assets/sprites/Maskless White Male Sprite.png";
import virusAsset from "./assets/sprites/cloud sprite sheet.png";
import droneAsset from "./assets/sprites/drone sprite sheet.png";

let config = {
  type: Phaser.AUTO,
  width: 287,
  height: 208,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 500 },
          debug: true
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

//scene: socialDistancing.scenes
//import from globals.js

let game = new Phaser.Game(config);

// setting globals for use later
// is this best practice? Probably not. Look into later
let score = 0;
let scoreText;
let scoreZone;
let level = 1;
let gameOver;
let cursors;
let sneezeChance;

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

function preload() {
  this.load.image('background', backgroundAsset);
  this.load.image('midground', midgroundAsset);
  this.load.image('foreground', foregroundAsset);
  this.load.image('ground', groundAsset);
  this.load.image('scoreZone', scoreZoneAsset);
  this.load.spritesheet(
    'virus', 
    virusAsset,
    { frameWidth: 32, frameHeight: 32 }
  );
  this.load.spritesheet(
      'player', 
      playerAsset,
      { frameWidth: 64, frameHeight: 64 }
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

  cursors = this.input.keyboard.createCursorKeys();
}

function create() {
  //create the background
  bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
  mg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'midground');
  fg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'foreground');

  bg.setOrigin(0, 0);
  mg.setOrigin(0, 0);
  fg.setOrigin(0, 0);

  //floor to run on
  let ground = this.physics.add.staticGroup();
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
    frameRate: 20,
    repeat: 0
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
      frames: [ { key: 'player', frame: 4 } ],
      frameRate: 4
  });

  ped.anims.play('walking1');
  // cloud.anims.play('virusCloud');

  this.physics.add.collider(scoreZone, ground);
  this.physics.add.collider(player, ground);
  this.physics.add.collider(peds, ground);

  this.physics.add.overlap(scoreZone, peds, addScore, null, this);
  this.physics.add.collider(player, peds, contact, null, this);
  this.physics.add.collider(player, virus, contact, null, this);
}

function createWalkingAnim(pedId, anims) {
  return {
    key: `walking${pedId}`,
    frames: anims.generateFrameNumbers(`ped${pedId}`, { start: 1, end: 8 }),
    frameRate: 8,
    repeat: -1
  }
}

function update() {
  if (gameOver) {
      //restartGame();
      player.anims.play('gg');
      ped.anims.stop('walking1');
      newped.anims.stop(`walking${newpedNum}`);
      return;
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

function pedCough() {

}

function addScore(scoreZone, ped) {
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
  this.physics.pause();
  player.setTint(0x00ff00);
  player.anims.play('gg');
  gameOver = true;
}

function restartGame() {
  gameOver = false;
  score = 0;
  player.setTint(0x000000);
}