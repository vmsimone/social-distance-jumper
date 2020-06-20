var startMenuState = new Phaser.Class({
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
        game.scene.start('Main');
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
socialDistancing.scenes.push(startMenuState);