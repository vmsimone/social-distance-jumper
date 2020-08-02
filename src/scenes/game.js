import { SCENES } from "../sceneHandler.js";

let gameProperties;

let highScore;
let level;
let pedSpeed; //peds move right to left

let clouds;
let cloud;

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
        console.log(gameProperties);

        //let player pause
        gameProperties.buttons.pauseButton.on("pointerdown", () => {
            this.scene.pause();
            this.scene.launch(SCENES.PAUSED);
        });

        //player can view score in upper-left corner
        gameProperties.scoreText = gameProperties.addText(this, {
            content: gameProperties.score,
            widthRatio: 0.05,
            heightRatio: 0.05
        });

        gameProperties.gameObjects.ped.anims.play('walking1');
        gameProperties.gameObjects.ped.setVelocityX(gameProperties.pedSpeed);

        //overlaps that affect the game; callback functions listed after update()
        gameProperties.colliders.scoreCollider = this.physics.add.overlap(
            gameProperties.gameObjects.scoreZone, 
            gameProperties.gameObjects.peds, 
            addScore,
            null, 
            this
        );
        gameProperties.colliders.pedCollider = this.physics.add.overlap(
            gameProperties.gameObjects.player, 
            gameProperties.gameObjects.peds, 
            contact, 
            null, 
            this
        );
        gameProperties.colliders.pedCollider = this.physics.add.overlap(
            gameProperties.gameObjects.player, 
            gameProperties.gameObjects.peds, 
            contact, 
            null, 
            this
        );
        gameProperties.colliders.cloudCollider = this.physics.add.overlap(
            gameProperties.gameObjects.player, 
            gameProperties.gameObjects.clouds, 
            contact, 
            null, 
            this
        );
    }

    update() {
        //scroll the parallax background while player in motion
        if (gameProperties.gameObjects.player.isRunning != true) {
            gameProperties.background.bg.tilePositionX += 0.5;
            gameProperties.background.mg.tilePositionX += 2.5;
            gameProperties.background.fg.tilePositionX += 3.75;
        }

        if (gameProperties.gameObjects.player.body.touching.down === false) {
            gameProperties.gameObjects.player.anims.play('falling');
        } else {
            gameProperties.gameObjects.player.anims.play('running', true);
        }
    
        if (
            (gameProperties.cursors.space.isDown || gameProperties.pointer.isDown) 
            && 
            gameProperties.gameObjects.player.body.touching.down
        ) {
            if(!gameProperties.muted) {
                //jumpSFX.play();
            }
            gameProperties.gameObjects.player.setVelocityY(gameProperties.jumpVelocity);
        }
    
    }
};

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
        cloud.anims.play('cloudIdle');
    } else {
        cloud = clouds.create(pedPositionX, ped.y + 75, 'cloud');
        cloud.setScale(gameProperties.heightScale);

        cloud.body.setSize(150, 100, true);
        cloud.body.setAllowGravity(false);
        cloud.setVelocityX(thisPedSpeed);
        cloud.anims.play('cloudIdle');
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
        cloud.anims.play('cloudIdle');
    } else {
        cloud = clouds.create(pedPositionX, ped.y + 75, 'cloud');
        cloud.setScale(gameProperties.heightScale);

        cloud.body.setSize(150, 100, true);
        cloud.body.setAllowGravity(false);
        cloud.setVelocityX(thisPedSpeed);
        cloud.anims.play('cloudIdle');
    }
}

function addScore(_scoreZone, ped) {
    if (ped.scored == undefined) {
        gameProperties.score += 1;
        gameProperties.scoreText.setText(gameProperties.score);
  
        createNewPed();
  
        ped.scored = true;
      
        if(gameProperties.score / 10 == level) {
            gameProperties.level++;
            gameProperties.pedSpeed -= (100 * gameProperties.widthScale)
        }
    }
}

function createNewPed() {
    const newpedNum = randomPedNumber();
        const pedZoneNum = 1; //Phaser.Math.Between(1, 3);

        gameProperties.gameObjects.newped = gameProperties.gameObjects.peds.create(
            gameProperties.gameObjects[`pedZone${pedZoneNum}`].x, 
            gameProperties.gameObjects[`pedZone${pedZoneNum}`].y, 
            `ped${newpedNum}`
        ).setScale(gameProperties.heightScale)
        gameProperties.gameObjects.newped.body.setSize(
            gameProperties.gameObjects.hitBoxWidth, 
            gameProperties.gameObjects.hitBoxHeight,
            true
        );
        gameProperties.gameObjects.newped.setVelocityX(
            Phaser.Math.Between(
                (gameProperties.pedSpeed - 10), 
                (gameProperties.pedSpeed + 10)
            )
        );
        if(newpedNum <= 12) {
            gameProperties.gameObjects.newped.masked = true;
        }
        gameProperties.gameObjects.newped.anims.play(`walking${newpedNum}`);
}

function randomPedNumber() {
    let num = Phaser.Math.Between(1, 25);
    return num;
}

function contact(player, _ped) {
    this.physics.world.removeCollider(gameProperties.colliders.pedCollider);
    this.physics.world.removeCollider(gameProperties.colliders.cloudCollider);
    this.physics.world.removeCollider(gameProperties.colliders.scoreCollider);

    player.isRunning = true;

    if(!gameProperties.muted) {
        //gameOverSFX.play();
    }

    player.anims.play('gg', true);
    let animOver = player.anims.getProgress();
    if(animOver == 1) {
        runGameOver(this.scene);
    }
}

function runGameOver(scene) {
    scene.start(SCENES.GAMEOVER, { "gameScore": gameProperties.score, "highScore": highScore });
}