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


function startMainLoop() {
    var stage = new createjs.Stage( "canvas" );

    createjs.Ticker.addEventListener( "tick", update );
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS( 30 );

    var level = new Level();

    var player = new Player(WORLD_CENTER.x, WORLD_CENTER.y);

    stage.addChild( player.sprite );
    stage.addChild( level );

    var inputManager = new InputManager();
    inputManager.init( stage, level );

    function update() {
        player.update(levelMock);
        stage.update();
    }
}


