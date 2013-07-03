

var TILE_WIDTH = 64;
var TILE_HEIGHT = 64;

var Tile = function(img) {
    this.initialize(img);
};


Tile.prototype = new createjs.Bitmap();
Tile.prototype.constructor = Tile;


var Layer = function() {
    this.initialize();

}

Layer.prototype = new createjs.Container();
Layer.prototype.constructor = Layer;

Layer.prototype.initialize = function() {
    for(var i = 0; i < 10; ++i)
    {
        var block  = new Tile('res/star.png');
        block.x = TILE_WIDTH*i;
        this.addChild( block );
    }
};


Layer.prototype.moveByOffset = function(offset)
{
    this.x += offset;
};

var LayerChunk = function () {
    this.initialize();
}

LayerChunk.prototype = new createjs.Shape();
LayerChunk.prototype.constructor = LayerChunk;

LayerChunk.prototype.initialize = function () {
    var queue = new createjs.LoadQueue();
    queue.addEventListener( "complete", handleComplete );
    queue.loadManifest( [
        { id: "testtile", src: "res/star.png" }
    ] );
    var g = this.graphics;
    var _this = this;
    function handleComplete() {
        var image = queue.getResult( "testtile" );
        var block = new Tile( image );
        g.beginBitmapFill( block.image );
        for ( var i = 0; i < 10; ++i ) {
            g.drawRect( TILE_WIDTH * i, 0, TILE_WIDTH, TILE_HEIGHT );
        }
        _this.cache( 0, 0, TILE_WIDTH * 10, TILE_HEIGHT );
    }
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
    for(var i = 0; i < 10; ++i)
    {
        var layer = new LayerChunk();
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
    var layerNum = Math.round((y - this.y) / 192);
    return layerNum;
};
 


