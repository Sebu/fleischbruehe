

function InputManager() {
    this.stage = null;
    this.level = null;
    this.activeTouches = {};
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
        layer: this.level.getLayerForPoint( event.stageX, event.stageY ),
        stageX: event.stageX,
        stageY: event.stageY
    }
}

InputManager.prototype.handleTouchMove = function ( event ) {
    var touch = this.activeTouches[ event.pointerID ];
    if ( touch ) {
        this.level.moveLayer( touch.layer, event.stageX - touch.stageX );
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