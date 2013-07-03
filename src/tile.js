

var TILE_WIDTH = 128;
var TILE_HEIGHT = 196;

var Tile = function(img) {
    this.initialize(img);
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

Layer.prototype.initialize = function() {
};


Layer.prototype.moveByOffset = function(offset)
{
    this.x += offset;
};

var LayerChunk = function ( tileString ) {
    this.tileString = tileString;
    this.initialize();
}

LayerChunk.prototype = new createjs.Shape();
LayerChunk.prototype.constructor = LayerChunk;

LayerChunk.prototype.initialize = function () {
    this.graphics.c();
    for ( var i = 0; i < this.tileString.length; i++ ) {
        var image = assetLoader.getResult( TILELIB[this.tileString.charAt( i ) ].image );
        var block = new Tile( image );
        this.graphics
            .bf( block.image )
            .drawRect( TILE_WIDTH * i, 0, TILE_WIDTH, TILE_HEIGHT );
    }
    this.cache( 0, 0, TILE_WIDTH * this.tileString.length, TILE_HEIGHT );
};

LayerChunk.prototype.moveByOffset = function ( offset ) {
    this.x += offset;
};

var Level = function()
{
    this.initialize();
}

Level.prototype =  new createjs.Container();

Level.prototype.constructor = Level;

Level.prototype.layers_ = [];
Level.prototype.layerIndex_ = 0;
Level.prototype.maxVisibleLayers = 5;

Level.prototype.initialize = function()
{
    for(var i = 0; i < 6; ++i)
    {
        var layer = new LayerChunk("W__W_");
        layer.y = TILE_HEIGHT*i;
        this.addChild( layer );
        this.layers_[i] = layer;
    }
};

Level.prototype.moveLayer = function(layerNo, offset)
{
    this.layers_[layerNo].moveByOffset( offset );
};

Level.prototype.translateWorld = function(x, y)
{
    // this.y = y % TILE_WIDTH;
};

Level.prototype.getLayerForPoint = function ( x, y )
{
    var layerNum = Math.round((y - this.y) / TILE_HEIGHT);
    return layerNum;
};
 


