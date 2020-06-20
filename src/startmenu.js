const startMenuState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function MainMenu(){
        Phaser.Scene.call(this, {key: 'StartMenu'});
    },
  
    preload: function() {
        // Preload images for this state
    },

    create: function() {
        console.log("Menu loaded");
        game.scene.start('StartMenu');
    },

    update: function() {
        // Update objects & variables
    }
});

export default startMenuState;