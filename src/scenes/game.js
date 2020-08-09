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
            } else {
                //set up our new ped's properties
                newped = gameProperties.gameObjects.peds.create(
                    zone.x + (gameProperties.spriteScale * 384), 
                    zone.y + (gameProperties.spriteScale * 384), 
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
                if(!gameProperties.muted && gameProperties.gameObjects.player.isInMotion == true) {
                    gameProperties.sounds.jumpSFX.play();
                }
                gameProperties.gameObjects.player.setVelocityY(gameProperties.jumpVelocity);
            }
        } else {
            gameProperties.gameObjects.player.anims.play('gg', true);
            let animOver = gameProperties.gameObjects.player.anims.getProgress();
            if(animOver == 1) {
                this.scene.launch(SCENES.GAMEOVER, gameProperties);
            }
        }
    }
};