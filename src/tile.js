

var Tile = function(img) {
    this.initialize(img);
};


Tile.prototype = new createjs.Bitmap();
Tile.prototype.constructor = Tile;
Tile.prototype.width = 128;
Tile.prototype.height = 192;


var Layer = function() {
    this.initialize();
}

Layer.prototype = new createjs.Container();
Layer.prototype.constructor = Layer;
Layer.prototype.height = 192;

Layer.prototype.initialize = function() {
    for(var i = 0; i < 10; ++i)
    {
        var block  = new Tile('res/star.png');
        block.x = block.width*i;
        this.addChild( block );
    }
};


Layer.prototype.moveByOffset = function(offset)
{
    this.x += offset;
};


var Level = function()
{
    this.initialize();
}

Level.prototype =  new createjs.Container();

Level.prototype.constructor = Level;

Level.prototype.layers_ = [];

Level.prototype.initialize = function()
{
    for(var i = 0; i < 10; ++i)
    {
        var layer  = new Layer();
        layer.y = layer.height*i;
        this.addChild( layer );
        this.layers_[i] = layer;
    }
};

Level.prototype.moveLayer = function(layerNo, offset)
{
    this.layers_[layerNo].moveByOffset( offset );
};


Level.prototype.getLayerForPoint = function ( x, y )
{
    var layerNum = Math.round((y - this.y) / 192);
    return layerNum;
}
//
//    moveLayerByOffset : function(offsetX)
//    {
//      offsetX_ += offsetX;
//      self.x = offset;
//
//    },
//
//    getLayerForXandY : function(x,y) {
//
//    }


