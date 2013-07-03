function startMainLoop() {
    var stage = new createjs.Stage( "canvas" );

    createjs.Ticker.addEventListener( "tick", update );
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS( 60 );

    var level = new Level();


    stage.addChild( level );

    // REMOVE ME: Touch controls
    createjs.Touch.enable( stage );

    stage.addEventListener( "stagemousedown", touchStart );
    stage.addEventListener( "stagemouseup", touchEnd );

    function update() {

        stage.update();
    }

    function touchStart( evt ) {
        level.moveLayerByOffset(0, 10);
    //        reatejs.Tween.get( circle, { override : true } ).to( { scaleX: 2 }, 200 );
    }

    function touchEnd( evt ) {
//        createjs.Tween.get( circle, { override: true } ).to( { scaleX: 1 }, 200 );
    }
}