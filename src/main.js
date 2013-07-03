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

    // REMOVE ME: Touch controls
    createjs.Touch.enable( stage );

    stage.addEventListener( "stagemousedown", touchStart );
    stage.addEventListener( "stagemouseup", touchEnd );

    function update() {
        stage.update();
    }

    function touchStart( evt ) {
        createjs.Tween.get( circle, { override : true } ).to( { scaleX: 2 }, 200 );
    }

    function touchEnd( evt ) {
        createjs.Tween.get( circle, { override: true } ).to( { scaleX: 1 }, 200 );
    }
}