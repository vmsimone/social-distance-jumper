import { SCENES } from "../sceneHandler.js";

let gameProperties;

//functions below class
export class gameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.GAME
        });
    }

    init(sceneData) {
        gameProperties = sceneData;
    }

    preload() {
        //the ped zones should already be on the ground by the time the game scene preloads
        gameProperties.addRandomPed = () => {
            const randomPedNum = Phaser.Math.Between(1, 25);
            
            const randomPed = `ped${randomPedNum}`;
            const randomZone = `pedZone${Phaser.Math.Between(1, 3)}`;
            const zone = gameProperties.gameObjects[randomZone];
            
            let newped; 
            //the first ped is different for some reason so we have to do this nonsense
            if(gameProperties.score == 0) {
                //set up our new ped's properties
                newped = gameProperties.gameObjects.peds.create(
                    zone.x, 
                    zone.y, 
                    randomPed
                ).setScale(gameProperties.spriteScale);
            // for bigger screens with bigger sprites
            } else if(gameProperties.spriteScale < 0.5) {
                newped = gameProperties.gameObjects.peds.create(
                    zone.x + (gameProperties.spriteScale * 384), 
                    zone.y + (gameProperties.spriteScale * 384), //extra numbers here to avoid "flying pedestrians"
                    randomPed
                ).setScale(gameProperties.spriteScale);
            // for smaller screens we have to do this or they'll appear below the ground
            } else {
                //set up our new ped's properties
                newped = gameProperties.gameObjects.peds.create(
                    zone.x + (gameProperties.spriteScale * 200), 
                    zone.y + (gameProperties.spriteScale * 100), //extra numbers here to avoid "flying pedestrians"
                    randomPed
                ).setScale(gameProperties.spriteScale);
            }
            
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
                    (gameProperties.pedSpeed - 20), 
                    (gameProperties.pedSpeed + 20)
                )
            );

            return newped;
        }

        gameProperties.buttons.pauseButton.setVisible(true);

        //player can view score in upper-left corner
        gameProperties.scoreText = gameProperties.addText(this, {
            content: gameProperties.score,
            widthRatio: 0.05,
            heightRatio: 0.05,
            fill: '#FFFFFF'
        });
        
        gameProperties.addOverlaps();
    }

    create() {
        //add first pedestrian to the scene and puts them in the active peds array
        gameProperties.pointer = this.input.activePointer;
        
        gameProperties.activePeds.unshift(
            gameProperties.addRandomPed()
        );

        gameProperties.gameObjects.player.setVisible(true);
        gameProperties.gameObjects.player.isInMotion = true;
    }

    update() {
        //scroll the parallax background while player in motion
        if (gameProperties.gameObjects.player.isDown != true) {
            //stops the bg from scrolling during game over screen
            if(gameProperties.gameObjects.player.isInMotion) {
                gameProperties.background.bg.tilePositionX += 0.5;
                gameProperties.background.mg.tilePositionX += 2.5;
                gameProperties.background.fg.tilePositionX += 3.75;
            }

            //play will start to fall while in midair if the let go of the pointer
            if (gameProperties.gameObjects.player.body.touching.down === false) {
                //when the player reaches the peak of their jump, they fall
                if(
                    gameProperties.gameObjects.player.y <= gameProperties.maxJump
                    ||
                    (gameProperties.pointer.isDown == false && gameProperties.cursors.space.isDown == false)
                ) {
                    gameProperties.gameObjects.player.falling = true;
                    //this never plays??
                    gameProperties.gameObjects.player.anims.playReverse('jumping');
                }
            } else {
                gameProperties.gameObjects.player.anims.play('running', true);
                gameProperties.gameObjects.player.falling = false;
            }
    
            //jump using spacebar or clicking/tapping while not falling
            if (
                    (gameProperties.pointer.isDown || gameProperties.cursors.space.isDown) 
                    && 
                    gameProperties.gameObjects.player.falling == false
                ) {
                //jumpSFX won't play is not in motion
                if(!gameProperties.muted && gameProperties.gameObjects.player.isInMotion == true) {
                    gameProperties.sounds.jumpSFX.play();
                }
                //the jump annimation plays even when this is hidden??
                //gameProperties.gameObjects.player.anims.play('jumping');
                gameProperties.gameObjects.player.setVelocityY(gameProperties.jumpVelocity);
            }
        //game stops when player is touched by ped or obstacle
        } else {
            gameProperties.gameObjects.player.anims.play('gg', true);
            let animOver = gameProperties.gameObjects.player.anims.getProgress();
            if(animOver == 1) {
                this.scene.launch(SCENES.GAMEOVER, gameProperties);
            }
        }
    }
};