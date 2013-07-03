var FakeLevel = {
    getLayerForPoint: function ( x, y ) { return Math.floor( y / 960 * 5 ) },
    moveLayer: function ( layer, offset ) { console.info( "moveLayer: " + layer + "/" + offset ) }
};

function InputManager() {
    this.stage = null;
    this.level = null;
    this.activeTouches = {};
    this.fakeLevel = FakeLevel;
}

InputManager.prototype.init = function ( stage, level ) {
    this.stage = stage;
    this.level = level;

    this.stage.addEventListener( "stagemousedown", this.handleTouchStart.bind( this ) );
    this.stage.addEventListener( "stagemousemove", this.handleTouchMove.bind( this ) );
    this.stage.addEventListener( "stagemouseup", this.handleTouchEnd.bind( this ) );
    createjs.Touch.enable( this.stage );
}

InputManager.prototype.handleTouchStart = function ( event ) {
    this.activeTouches[ event.pointerID ] = {
        layer: this.fakeLevel.getLayerForPoint( event.stageX, event.stageY ),
        stageX: event.stageX,
        stageY: event.stageY
    }
}

InputManager.prototype.handleTouchMove = function ( event ) {
    var touch = this.activeTouches[ event.pointerID ];
    if ( touch ) {
        this.fakeLevel.moveLayer( touch.layer, touch.stageX - event.stageX );
        touch.stageX = event.stageX;
        touch.stageY = event.stageY;
    }
}

InputManager.prototype.handleTouchEnd = function ( event ) {
    var touch = this.activeTouches[event.pointerID];
    if ( touch ) {
        delete this.activeTouches[event.pointerID];
    }
}