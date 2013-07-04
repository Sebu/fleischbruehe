var TILE_WIDTH = 128;
var TILE_HEIGHT = 192;

var Tile = function(img) {
    this.initialize(img);
};

var Enter  = {
    NONE: 0,
    LEFT: 1,
    RIGHT : 2,
    TOP : 4,
    BOTTOM : 8
};

Tile.prototype = new createjs.Bitmap();
Tile.prototype.constructor = Tile;


var Layer = function( tileString ) {
    this.chunks = [];
    this.tileString = tileString;
    this.initialize();
}

Layer.prototype = new createjs.Container();
Layer.prototype.constructor = Layer;

Layer.prototype.base_initialize = Layer.prototype.initialize;
Layer.prototype.initialize = function () {
    this.base_initialize();
    this.chunks.push( new LayerChunk( this.tileString.substring( 0, 5 ) ) );
    this.chunks.push( new LayerChunk( this.tileString.substring( 5, 10 ) ) );
    this.chunks.push( new LayerChunk( this.tileString.substring( 10, 15 ) ) );
    for ( var i = 0; i < this.chunks.length; i++ ) {
        this.addChild( this.chunks[i] );
        this.chunks[i].x = i * 5 * TILE_WIDTH - 5 * TILE_WIDTH;
    }
};


Layer.prototype.moveByOffset = function(offset)
{
    this.x += offset;
    if ( this.x > 5 * TILE_WIDTH ) {
        this.x -= 5 * TILE_WIDTH;
        this.chunks.unshift( this.chunks.pop() );
        for ( var i = 0; i < this.chunks.length; i++ ) {
            this.chunks[i].x = i * 5 * TILE_WIDTH - 5 * TILE_WIDTH;
        }
    }
    else if ( this.x < -5 * TILE_WIDTH ) {
        this.x += 5 * TILE_WIDTH;
        this.chunks.push( this.chunks.shift() );
        for ( var i = 0; i < this.chunks.length; i++ ) {
            this.chunks[i].x = i * 5 * TILE_WIDTH - 5 * TILE_WIDTH;
        }
    }
};

var LayerChunk = function ( tileString ) {
    this.tileString = tileString;
    this.initialize();
}

LayerChunk.prototype = new createjs.Shape();
LayerChunk.prototype.constructor = LayerChunk;

LayerChunk.prototype.base_initialize = LayerChunk.prototype.initialize;
LayerChunk.prototype.initialize = function () {
    this.base_initialize();
    this.graphics.c();
    for ( var i = 0; i < this.tileString.length; i++ ) {
        var images = TILELIB[this.tileString.charAt( i ) ].images;
        var image = assetLoader.getResult( images[ Math.floor( Math.random() * images.length ) ] );
        var bgimage = assetLoader.getResult( "tile_bg" + Math.floor( Math.random() * 6 ) );
        this.graphics
            .bf( new Tile( bgimage ).image )
            .drawRect( TILE_WIDTH * i, 0, TILE_WIDTH, TILE_HEIGHT )
            .bf( new Tile( image ).image )
            .drawRect( TILE_WIDTH * i, 0, TILE_WIDTH, TILE_HEIGHT );
    }
    this.cache( 0, 0, TILE_WIDTH * this.tileString.length, TILE_HEIGHT );
};




Layer.prototype.canPlayerMoveTo = function(x,y)
{
    var chunk = Math.floor((x-this.x) / (5*TILE_WIDTH));

    var block = Math.floor((x - (5*TILE_WIDTH)*chunk  - this.x) / TILE_WIDTH); 
    // var block = Math.floor((x) / TILE_WIDTH) % 5;

    return TILELIB[this.chunks[chunk+1].tileString.charAt( block ) ].canEnter;
};

var Level = function()
{
    this.currentLayer = 0;
    this.initialize();
}

Level.prototype =  new createjs.Container();

Level.prototype.constructor = Level;

Level.prototype.layers = [];
Level.prototype.layerIndex  = 0;
Level.prototype.maxVisibleLayers = 5;

Level.prototype.base_initialize = Level.prototype.initialize;
Level.prototype.initialize = function()
{
    this.base_initialize();
    while ( this.currentLayer < 6 ) {
        this.moveUp();
    }
};

Level.prototype.moveUp = function () {
    this.currentLayer++;
    player.addScore(100);
    if ( this.currentLayer > this.layers.length - 5 ) {
        var pattern = this.requestPattern();
        var i = pattern.length;
        var layer = null;
        while ( i-- ) {
            layer = new Layer( pattern[i] );
            this.layers.push( layer );
            this.addChild( layer );
            layer.y = -TILE_HEIGHT * this.layers.length;
        }
    }
    createjs.Tween.get( this, { override: true } ).to( { y: this.currentLayer * TILE_HEIGHT }, 500, createjs.Ease.quadOut );
}

Level.prototype.moveDown = function () {
    if ( this.currentLayer > 5 ) {
        this.currentLayer--;
        createjs.Tween.get( this, { override: true } ).to( { y: this.currentLayer * TILE_HEIGHT }, 500, createjs.Ease.quadOut );
    }
}

Level.prototype.requestPattern = function () {
    return GetRandomPattern();
}

Level.prototype.moveLayer = function(layerNo, offset)
{
    console.log(this.currentLayer);
        this.layers[layerNo].moveByOffset( offset );
        if(layerNo == this.currentLayer - 3)

            player.translate(offset, 0);
};

Level.prototype.moveLayerEnded = function(layerNo, deltaX, deltaTime)
{
    console.log(deltaX);
    var rest = deltaX % TILE_WIDTH;

    if(rest > TILE_WIDTH/2)
        this.moveLayer(layerNo, TILE_WIDTH - rest);
    else
        this.moveLayer(layerNo, -rest);
}

Level.prototype.translateWorld = function(x, y)
{

};

Level.prototype.getLayerForPoint = function ( x, y )
{
    var layerNum = Math.floor((this.y - y) / TILE_HEIGHT);
    return layerNum;
};

 
Level.prototype.canPlayerMoveTo = function(x,y) 
{
    var layerNo = this.getLayerForPoint( x, y );

    return this.layers[layerNo].canPlayerMoveTo(x, y);
};

function ZombieLayer() {
    
}
