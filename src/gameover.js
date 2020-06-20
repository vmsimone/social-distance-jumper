const gameOverState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function MainMenu(){
        Phaser.Scene.call(this, {key: 'GameOver'});
    },
  
    preload: function() {
        // Preload images for this state
    },

    create: function() {
        console.log("Menu loaded");
        game.scene.start('GameOver');
    },

    update: function() {
        // Update objects & variables
    }
});

export default gameOverState;