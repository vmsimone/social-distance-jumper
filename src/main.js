const gameState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize: function GamePlay(){
        Phaser.Scene.call(this, {key: 'Main'});
    },
  
    preload: function() {
        // Preload images for this state
    },

    create: function() {
        // Create objects
        console.log("Game Start");
        game.scene.start('Preload');
    },

    update: function() {
        // Update objects & variables
    }
});

export default gameState;