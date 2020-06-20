const preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Preload() {
        Phaser.Scene.call(this, {key: 'Preload'});
    },

    preload: function() {
        // Preload images for this state
    },

    create: function() {
        console.log("Preload Finished");
        game.scene.start('Preload');
    },
    
    update: function() {
        // Update objects & variables
    }
});

export default preloadState;