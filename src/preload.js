var preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Preload() {
        Phaser.Scene.call(this, {key: 'Preload'});
    },
    preload: function() {
        // Preload images for this state
    },

    create: function() {
        console.log("Preload Finished");
        game.scene.start('StartMenu');
    },
    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
socialDistancing.scenes.push(preloadState);