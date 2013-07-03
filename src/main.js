function startMainLoop() {
    var stage = new createjs.Stage( "canvas" );

    createjs.Ticker.addEventListener( "tick", update );
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS( 60 );

    var level = new Level();


    stage.addChild( level );

    var inputManager = new InputManager();
    inputManager.init( stage, level );

    function update() {

        stage.update();
    }
}