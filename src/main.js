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


var GameWorld  = function()
{
    this.init();
}



GameWorld.prototype.contructor = GameWorld;

GameWorld.prototype.init = function() 
{
    var stage = this.stage  = new createjs.Stage( "canvas" );

    createjs.Ticker.addEventListener( "tick", update );
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS( 30 );

    var level = this.level = new Level();

    var player = this.player = new Player(WORLD_CENTER.x, WORLD_CENTER.y);

    stage.addChild( player.sprite );

    stage.addChild( level );

    var inputManager = new InputManager();
    inputManager.init( stage, this );

    function update() {
        player.update(levelMock);
        stage.update();
    }
}

GameWorld.prototype.handleInput  = function(layer, x, y)
{
        this.level.moveLayer( layer, x );
        this.level.translateWorld( 0 , y );
}


