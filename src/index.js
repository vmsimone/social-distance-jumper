import Phaser from "phaser";

//background and game elements
import background from "./assets/cyberpunk-street-files/PNG/layers/far-buildings.png";
import midground from "./assets/cyberpunk-street-files/PNG/layers/back-buildings.png";
import foreground from "./assets/cyberpunk-street-files/PNG/layers/foreground.png";
import ground from "./assets/ground.png";
import scoreZone from "./assets/score-zone.png";

//characters and obstacles
import player from "./assets/sprites/Main Sprite.png";
import maskped1 from "./assets/sprites/Masked Black Female.png";
import maskped2 from "./assets/sprites/Masked Black Male.png";
import maskped3 from "./assets/sprites/Masked Latin Female.png";
import maskped4 from "./assets/sprites/Masked Latin Male.png";
import maskped5 from "./assets/sprites/Masked Pregnant Female.png";
import maskped6 from "./assets/sprites/Masked White Female.png";
import maskped7 from "./assets/sprites/Masked White Male.png";
import ped1 from "./assets/sprites/Maskless Black Female Sprite.png";
import ped2 from "./assets/sprites/Maskless Black Male Sprite.png";
import ped3 from "./assets/sprites/Maskless Child Sprite.png";
import ped4 from "./assets/sprites/Maskless Latin Female Sprite.png";
import ped5 from "./assets/sprites/Maskless Latin Male Sprite.png";
import ped6 from "./assets/sprites/Maskless Pregnant Sprite.png";
import ped7 from "./assets/sprites/Maskless White Female Sprite.png";
import ped8 from "./assets/sprites/Maskless White Male Sprite.png";
import sneeze from "./assets/sprites/cloud sprite sheet.png";
import drone from "./assets/sprites/drone sprite sheet.png";



let config = {
  type: Phaser.AUTO,
  width: 287,
  height: 208,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 500 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

let game = new Phaser.Game(config);
let score = 0;
let gameOver;
let cursors;
let bg;
let mg;
let fg;
let peds;
let scoreText;

function preload() {
  this.load.image('background', background);
  this.load.image('midground', midground);
  this.load.image('foreground', foreground);
  this.load.image('ground', ground);
  this.load.image('scoreZone', scoreZone);
  this.load.image('sneeze', sneeze);
  this.load.spritesheet(
      'player', 
      player,
      { frameWidth: 64, frameHeight: 64 }
  );
  this.load.spritesheet(
      'ped', 
      pedestrian,
      { frameWidth: 16, frameHeight: 16 }
  );

  cursors = this.input.keyboard.createCursorKeys();
}

function create() {
  bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
  mg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'midground');
  fg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'foreground');

  bg.setOrigin(0, 0);
  mg.setOrigin(0, 0);
  fg.setOrigin(0, 0);

  ground = this.physics.add.staticGroup();
  ground.create(200, 200, 'ground').refreshBody();
  
  scoreZone = this.physics.add.sprite(50, 184, 'scoreZone');

  player = this.physics.add.sprite(50, 150, 'dude');
  player.setCollideWorldBounds(true);

  peds = this.physics.add.group();
  let ped = peds.create(300, 184, 'ped');
  ped.setVelocityX(-100);

  scoreText = this.add.text(0, 0, `score: ${score}`, { fontSize: '16px', fill: '#FFF' });

  this.anims.create({
      key: 'midair',
      frames: [ { key: 'dude', frame: 6 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'running',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 5,
      repeat: -1
  });

  this.anims.create({
      key: 'gg',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.physics.add.collider(scoreZone, ground);
  this.physics.add.collider(player, ground);
  this.physics.add.collider(peds, ground);

  this.physics.add.overlap(scoreZone, peds, addScore, null, this);
  this.physics.add.collider(player, peds, contact, null, this);
}

function update() {
  if (gameOver) {
      //restartGame();
      return;
  } else {
      if (player.body.touching.down === false) {
          player.anims.play('midair');
      } else {
          player.setVelocityX(0);
          player.anims.play('running', true);
      }

      if (cursors.up.isDown && player.body.touching.down) {
          player.setVelocityY(-300);
      }
      
      bg.tilePositionX += 0.1;
      mg.tilePositionX += 0.5;
      fg.tilePositionX += 0.75;   
  }
}

function addScore(scoreZone, ped) {
  if (ped.scored == undefined) {
      score += 10;
      scoreText.setText(`score: ${score}`);

      let newped = peds.create(300, 184, 'ped');
      newped.setVelocityX(Phaser.Math.Between(-75, -200));
      
      ped.scored = true;
  }
}

function contact(player, ped) {
  this.physics.pause();
  player.setTint(0x00ff00);
  player.anims.play('gg');
  gameOver = true;
}

function cough() {

}

function sneeze() {
  
}

function restartGame() {
  gameOver = false;
  score = 0;
  player.setTint(0x000000);
}
