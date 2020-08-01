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

        gameProperties.gameObjects.player.setVisible(true);
        // ped.setScale(gameProperties.heightScale);
        // ped.masked = true;
        // ped.body.setSize(hitBoxWidth, hitBoxHeight, true);
        // ped.setVelocityX(pedSpeed);
        gameProperties.gameObjects.ped.setVelocityX(pedSpeed);

        //sets up virus cloud

        gameProperties.gameObjects.ped.anims.play('walking1');


    }

    update() {
        // if (gameProperties.gameObjects.player.infected === true) {
        //     gameProperties.gameObjects.player.anims.play('gg', true);
        //     let animOver = player.anims.getProgress();
        //     if(animOver == 1) {
        //         runGameOver(this.scene);
        //     }
        // } else {
        //     if (gameProperties.gameObjects.player.body.touching.down === false) {
        //         gameProperties.gameObjects.player.anims.play('falling');
        //     } else {
        //         gameProperties.gameObjects.player.setVelocityX(0);
        //         gameProperties.gameObjects.player.anims.play('running', true);
        //     }
      
        //     if (
        //         (gameProperties.cursors.space.isDown || 
        //             gameProperties.cursors.up.isDown || 
        //             gameProperties.pointer.isDown) && 
        //             gameProperties.gameObjects.player.body.touching.down
        //         ) {
        //         if(!gameProperties.muted) {
        //             //jumpSFX.play();
        //         }
        //         gameProperties.gameObjects.player.setVelocityY(gameProperties.height * -1);
        //     }
            
        //     sneezeChance = rollRandomNumber();
        //     if(sneezeChance > 985) {
        //         //if statements make sure there are
        //         //peds to sneeze/cough
        //         //no floating virus clouds
        //         if(ped && ped.body && ped.body.touching.down) {
        //             pedSneeze(ped);
        //         } 
        //         if(newped && newped.body && newped.body.touching.down) {
        //             pedSneeze(newped);
        //         }
        //     } else if(sneezeChance < 30) {
        //         if(ped && ped.body && ped.body.touching.down) {
        //             pedCough(ped);
        //         } 
        //         if(newped && newped.body && newped.body.touching.down) {
        //             pedCough(newped);
        //         }
        //     }
      
        //     if(gameProperties.score / 10 == level) {
        //         level++;
        //         pedSpeed -= (100 * gameProperties.widthScale)
        //     }
      
            gameProperties.background.bg.tilePositionX += 0.5;
            gameProperties.background.mg.tilePositionX += 2.5;
            gameProperties.background.fg.tilePositionX += 3.75;
        //}
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

function runGameOver(scene) {
    scene.start(SCENES.GAMEOVER, { "gameScore": gameProperties.score, "highScore": highScore });
}