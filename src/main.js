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

        { id: "tile_hole", src: "res/holetile.png" },
    ] );
}


function startMainLoop() {
    var world = new GameWorld();
    // initSound();
}


function initSound() {
// if initializeDefaultPlugins returns false, we cannot play sound in this browser
if (!createjs.Sound.initializeDefaultPlugins()) {return;}
var audioPath = "res/";
var manifest = [
{id:"Music", 
src:audioPath+"music.mp3"},
{id:"Thunder", src:audioPath + "Thunder1.mp3|"+audioPath + "Thunder1.ogg"}
];
 
createjs.Sound.addEventListener("loadComplete", handleSoundLoad);
createjs.Sound.registerManifest(manifest);
}
 
function handleSoundLoad(event) {
    console.log(event);
createjs.Sound.play(event.src);
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

    var level = this.level = new Level();

    stage.addChild( level );

    player = this.player = new Player(WORLD_CENTER.x, WORLD_CENTER.y);
 
    stage.addChild( player.sprite );

    labelScore = new createjs.Text("Score: 0", "30px Courier", "#FFFFFF");
    labelScore.x = 10;
    labelScore.y =  30;
    labelScore.textBaseline = "alphabetic";

    stage.addChild( labelScore ); 

    var inputManager = new InputManager();
    inputManager.init( stage, this );

    function update() {
        player.update(level);
        stage.update();
    }
}


GameWorld.prototype.getLayerForPoint = function( x, y) 
{
    return this.level.getLayerForPoint(x, y);
}

GameWorld.prototype.handleInput = function(layer, x, y)
{
        if(Math.abs(x) > Math.abs(y*4))
            this.level.moveLayer( layer, x );
        else 
            this.level.translateWorld( x , y );
}

GameWorld.prototype.handleSwipeDown = function () {
    this.level.moveUp();
}
