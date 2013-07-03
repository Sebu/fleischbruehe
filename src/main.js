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
        { id: "tile_wall0", src: "res/wall.png" },
        { id: "tile_wall1", src: "res/wall1.png" },

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


