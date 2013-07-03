function startMainLoop() {
    var stage = new createjs.Stage( "canvas" );

    createjs.Ticker.addEventListener( "tick", update );
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS( 60 );

    // REMOVE ME: Test graphic
    var circle = new createjs.Shape();
    circle.graphics.beginFill( "red" ).drawCircle( 0, 0, 50 );
    circle.x = 100;
    circle.y = 100;
    stage.addChild( circle );

    var inputManager = new InputManager();
    inputManager.init( stage, {} );

    function update() {
        stage.update();
    }
}