var PATTERN_LIST = [
    [
        "__________",
        "W__v__WWWW",
        "__________",
        "___^______",
        "_ _____H__",
        "_J________",
    ],
    [
        "__________",
        "W__v__WWWW",
        "__________"
    ],
];

var assetLoader = new createjs.LoadQueue();
function preloadAssetsAndStart() {
    assetLoader.addEventListener( "complete", startMainLoop );
    assetLoader.loadManifest( [
        { id: "testtile", src: "res/star.png" },
        { id: "tile_floor", src: "res/tile_floor.png" },
        { id: "tile_wall", src: "res/tile_wall.png" },

        { id: "tile_bg0", src: "res/bgtile1.png" },
        { id: "tile_bg1", src: "res/bgtile2.png" },
        { id: "tile_bg2", src: "res/bgtile3.png" },
        { id: "tile_bg3", src: "res/bgtile4.png" },
        { id: "tile_bg4", src: "res/bgtile5.png" },

        { id: "tile_floor0", src: "res/floortile1.png" },
        { id: "tile_floor1", src: "res/floortile2.png" },
        { id: "tile_floor2", src: "res/floortile3.png" },
        { id: "tile_floor3", src: "res/floortile4.png" },

        { id: "tile_hole", src: "res/holetile.png" },
    ] );
}


function startMainLoop() {
    var world = new GameWorld();
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

    var player = this.player = new Player(WORLD_CENTER.x, WORLD_CENTER.y);
 
    stage.addChild( player.sprite );



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
        if(layer==2)
            this.player.translate(x, 0);
    
        if(Math.abs(x) > Math.abs(y*2))
            this.level.moveLayer( layer, x );
        else
            this.level.translateWorld( x , y );
}


