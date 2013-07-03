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
    ] );
}

function startMainLoop() {

    var stage = new createjs.Stage( "canvas" );

    createjs.Ticker.addEventListener( "tick", update );
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS( 30 );

    var level = new Level();

    stage.addChild( level );

    var inputManager = new InputManager();
    inputManager.init( stage, level );

    function update() {
        stage.update();
    }
}


