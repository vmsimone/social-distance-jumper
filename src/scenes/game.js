import { SCENES } from "../sceneHandler.js";

let gameProperties;

let scoreCollider;

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

    preload() {
        //the ped zones should already be on the ground by the time the game scene preloads
        gameProperties.addRandomPed = () => {
            const randomPedNum = Phaser.Math.Between(1, 25);
            
            const randomPed = `ped${randomPedNum}`;
            const randomZone = `pedZone${Phaser.Math.Between(1, 3)}`;
            const zone = gameProperties.gameObjects['pedZone1']; //randomZone];

            //set up our new ped's properties
            let newped; 
            newped = gameProperties.gameObjects.peds.create(
                zone.x, zone.y, randomPed
            )
            console.log('ped height (pre-scale):' + gameProperties.gameObjects.player.height)
            newped.setScale(gameProperties.spriteScale);
            console.log('ped height (post-scale):' + gameProperties.gameObjects.player.height)
            newped.body.setSize(
                gameProperties.gameObjects.hitBoxWidth, 
                gameProperties.gameObjects.hitBoxHeight, 
                true
            );
            if(randomPedNum <= 12) {
                newped.masked = true;
            }

            //ped starts walking
            newped.anims.play(`walking${randomPedNum}`);
            newped.setVelocityX(
                Phaser.Math.Between(
                    (gameProperties.pedSpeed - 10), 
                    (gameProperties.pedSpeed + 10)
                )
            );

            return newped;
        }

        // function increaseScore() {
        //     console.log('increase score called');
        //     if(gameProperties.gameObjects.ped) {
        //         if(gameProperties.gameObjects.ped.scored == undefined) {
        //             gameProperties.score += 1;
        //             gameProperties.scoreText.setText(gameProperties.score);
        //             gameProperties.gameObjects.ped.scored = true;
              
        //             gameProperties.gameObjects.ped = gameProperties.addRandomPed();
        //             gameProperties.gameObjects.ped.body.setSize(
        //                 gameProperties.gameObjects.hitBoxWidth, 
        //                 gameProperties.gameObjects.hitBoxHeight, 
        //                 true
        //             ).setVelocityX(
        //                 Phaser.Math.Between(
        //                     (gameProperties.pedSpeed - 10), 
        //                     (gameProperties.pedSpeed + 10)
        //                 )
        //             );
        //             if(gameProperties.activePed <= 12) {
        //                 gameProperties.gameObjects.newPed.masked = true;
        //             }
        //             gameProperties.gameObjects.newPed.anims.play(`walking${gameProperties.activePed}`);
    
        //             console.log(gameProperties.gameObjects.newPed);
        //         }
        //     }
            
        //     if(gameProperties.score / 10 == gameProperties.level) {
        //         gameProperties.level++;
        //         gameProperties.pedSpeed -= (100 * gameProperties.widthScale)
        //     }
        // }
    }

    create() {
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
        
        //add first pedestrian to the scene and puts them in the active peds array
        gameProperties.activePeds.unshift(
            gameProperties.addRandomPed()
        );
        console.log(gameProperties.activePeds);

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

        console.log(gameProperties.colliders);
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

function addScore() {
    console.log('scored');
    console.log(gameProperties.gameObjects.ped);
    if (ped.scored == undefined) {
        gameProperties.score += 1;
        gameProperties.scoreText.setText(gameProperties.score);
  
        gameProperties.addRandomPed();
  
        gameProperties.gameObjects.ped.scored = true;
      
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