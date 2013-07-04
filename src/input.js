

function InputManager() {
    this.stage = null;
    this.level = null;
    this.activeTouches = {};
}

InputManager.prototype.init = function ( stage, world ) {
    this.stage = stage;
    this.world = world;

    this.stage.addEventListener( "stagemousedown", this.handleTouchStart.bind( this ) );
    this.stage.addEventListener( "stagemousemove", this.handleTouchMove.bind( this ) );
    this.stage.addEventListener( "stagemouseup", this.handleTouchEnd.bind( this ) );
    createjs.Touch.enable( this.stage );
}

InputManager.prototype.handleTouchStart = function ( event ) {
    this.activeTouches[ event.pointerID ] = {
        layer: this.world.getLayerForPoint( event.stageX, event.stageY ),
        stageX: event.stageX,
        stageY: event.stageY,
        travelX: 0,
        travelY: 0,
        startTime: new Date().getTime()
    }
}

InputManager.prototype.handleTouchMove = function ( event ) {
    var touch = this.activeTouches[ event.pointerID ];
    if ( touch ) {
        var deltaX = event.stageX - touch.stageX;
        var deltaY = event.stageY - touch.stageY;
        this.world.handleInput(touch.layer, deltaX, deltaY);
        touch.stageX = event.stageX;
        touch.stageY = event.stageY;
        touch.travelX += deltaX;
        touch.travelY += deltaY;
    }
}

InputManager.prototype.handleTouchEnd = function ( event ) {
    var touch = this.activeTouches[event.pointerID];
    if ( touch ) {
        delete this.activeTouches[event.pointerID];
        var timeDelta =  new Date().getTime() - touch.startTime;

        if ( timeDelta < 1000 && touch.travelY > 250 ) {
            this.world.handleSwipeDown();
        }
        this.world.level.moveLayerEnded(touch.layer, touch.travelX, timeDelta);
    }
}