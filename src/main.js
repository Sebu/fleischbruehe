﻿var assetLoader = new createjs.LoadQueue();
function preloadAssetsAndStart() {
    assetLoader.addEventListener( "complete", startMainLoop );
    assetLoader.loadManifest( [
        { id: "tile_wall0", src: "res/wall.png" },
        { id: "tile_wall1", src: "res/wall1.png" },

        { id: "tile_obstacle", src: "res/obstacle.png" },

        { id: "tile_bg0", src: "res/bgtile1.png" },
        { id: "tile_bg1", src: "res/bgtile2.png" },
        { id: "tile_bg2", src: "res/bgtile3.png" },
        { id: "tile_bg3", src: "res/bgtile4.png" },
        { id: "tile_bg4", src: "res/bgtile5.png" },
        { id: "tile_bg5", src: "res/bgtile6.png" },

        { id: "tile_floor0", src: "res/floortile1.png" },
        { id: "tile_floor1", src: "res/floortile2.png" },
        { id: "tile_floor2", src: "res/floortile3.png" },
        { id: "tile_floor3", src: "res/floortile4.png" },

        { id: "tile_hole", src: "res/hole2.png" },
        { id: "tile_ladder", src: "res/ladder.png" },
        { id: "tile_jump", src: "res/jump.png" },
        { id: "tile_door_up_a", src: "res/door1up.png" },
        { id: "tile_door_down_a", src: "res/door1down.png" },
        { id: "tile_door_up_b", src: "res/door2up.png" },
        { id: "tile_door_down_b", src: "res/door2down.png" },

        { id: "player_stand0", src: "res/character_basic.png" },
        { id: "player_stand1", src: "res/character_idle1.png" },

        { id: "player_walk0", src: "res/character_basic.png" },
        { id: "player_walk1", src: "res/character_walk1.png" },
        { id: "player_walk2", src: "res/character_walk2.png" },

        { id: "player_jump", src: "res/character_jump.png" },
    ] );
}


function startMainLoop() {
    var world = new GameWorld();
    initSound();
}


function initSound() {
// if initializeDefaultPlugins returns false, we cannot play sound in this browser
createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
createjs.Sound.addEventListener("fileload", handleSoundLoad);
createjs.Sound.registerSound("res/princes-do-do-do.mp3", "princes");

}
 
function handleSoundLoad(event) {
    console.log(event);
createjs.Sound.play("princes");
}

var GameWorld  = function()
{
    this.init();
}



GameWorld.prototype.contructor = GameWorld;

GameWorld.prototype.init = function() 
{
    var stage = this.stage = new createjs.Stage( "canvas" );

    createjs.Ticker.addEventListener( "tick", update );
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS( 30 );

    labelScore = new createjs.Text("Score: 0", "30px Courier", "#FFFFFF");
    labelScore.x = 10;
    labelScore.y =  30;
    labelScore.textBaseline = "alphabetic";


    //player = this.player = new Player(WORLD_CENTER.x, WORLD_CENTER.y);
    var level = this.level = new Level();

    stage.addChild( level );

 
    //stage.addChild( player.sprite );

 
    zombies = new ZombieLayer();
    level.addChild(zombies);
    stage.addChild( labelScore ); 

    var inputManager = new InputManager();
    inputManager.init( stage, this );

    function update() {
        //player.update(level);
        zombies.y -= 1;
        stage.update();
        level.update();
    }
}


GameWorld.prototype.getLayerForPoint = function( x, y) 
{
    return this.level.getLayerForPoint(x, y);
}

GameWorld.prototype.handleInput = function(layer, x, y)
{
    if(Math.abs(x) > Math.abs(y*2))
        this.level.moveLayer( layer, x );
}

GameWorld.prototype.handleSwipeDown = function () {
    this.level.moveUp();
}

GameWorld.prototype.handleSwipeUp = function () {
    this.level.moveDown();
}
