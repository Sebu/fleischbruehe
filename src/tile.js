var TILE_WIDTH = 128;
var TILE_HEIGHT = 192;
var PLAYER_SPEED_X = 16;

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
    this.player = null;
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


Layer.prototype.snapToGrid = function(layer, deltaX)
{

   var rest =  this.x % TILE_WIDTH;

   var toMove = rest;

    if(rest < -(TILE_WIDTH/2))
        toMove =  TILE_WIDTH + rest;
    else if(rest > (TILE_WIDTH/2)) 
         toMove =  - TILE_WIDTH + rest;

    var prop = { x:  this.x };
    var that = this;
        createjs.Tween.get( prop , {override:true})
            .to({x: this.x - toMove }, 200, createjs.Ease.quadOut)
            .addEventListener("change", function handleChange(event) {
           that.moveTo(prop.x);
    } );
}


Layer.prototype.moveTo = function(x)
{
    this.x = x;

    if ( this.x > 5 * TILE_WIDTH ) {
        this.x -= 5 * TILE_WIDTH;
        this.chunks.unshift( this.chunks.pop() );
        for ( var i = 0; i < this.chunks.length; i++ ) {
            this.chunks[i].x = i * 5 * TILE_WIDTH - 5 * TILE_WIDTH;
        }
        if ( this.player ) {
            this.player.x += 5 * TILE_WIDTH;
            if ( this.player.x > 10 * TILE_WIDTH ) {
                this.player.x -= 15 * TILE_WIDTH;
            }
        }
    }
    else if ( this.x < -5 * TILE_WIDTH ) {
        this.x += 5 * TILE_WIDTH;
        this.chunks.push( this.chunks.shift() );
        for ( var i = 0; i < this.chunks.length; i++ ) {
            this.chunks[i].x = i * 5 * TILE_WIDTH - 5 * TILE_WIDTH;
        }
        if ( this.player ) {
            this.player.x -= 5 * TILE_WIDTH;
            if ( this.player.x < -5 * TILE_WIDTH ) {
                this.player.x += 15 * TILE_WIDTH;
            }
        }
    }
};

Layer.prototype.addPlayer = function ( player, x ) {
    player.x = x - this.x;
    this.addChild( player );
    this.player = player;
    this.parent.setChildIndex( this, levelGlobal.getChildIndex(levelGlobal.zombies) - 1 );

}

Layer.prototype.getPlayerX = function ( player ) {
    return this.x + player.x;
}

Layer.prototype.getTileAt = function ( x ) {
    for ( var i = 0; i < this.chunks.length; i++ ) {
        if ( this.chunks[i].x < x && this.chunks[i].x + TILE_WIDTH * 5 > x ) {
            return this.chunks[i].getTile( x - this.chunks[i].x );
        }
    }
}

Layer.prototype.moveByOffset = function(offset)
{
    var x = this.x + offset;
    this.moveTo(x);
}

Layer.prototype.collidesAt = function ( x ) {
    for ( var i = 0; i < this.chunks.length; i++ ) {
        if ( this.chunks[i].x < x && this.chunks[i].x + TILE_WIDTH * 5 > x ) {
            var tile = TILELIB[ this.chunks[i].getTile( x - this.chunks[i].x ) ];
            if ( tile.physic(( x - this.chunks[i].x ) % TILE_WIDTH ) < 0 ) return true;
        }
    }
    return false;
}

Layer.prototype.removePlayer = function ( ) {
    this.removeChild( this.player );
    this.player = null;
}

Layer.prototype.canPlayerMoveTo = function ( x, y ) {
    var chunk = Math.floor(( x - this.x ) / ( 5 * TILE_WIDTH ) );

    var block = Math.floor(( x - ( 5 * TILE_WIDTH ) * chunk - this.x ) / TILE_WIDTH );
    // var block = Math.floor((x) / TILE_WIDTH) % 5;

    return TILELIB[this.chunks[chunk + 1].tileString.charAt( block )].canEnter;
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

LayerChunk.prototype.getTile = function ( x ) {
    return this.tileString.charAt( Math.floor( x / TILE_WIDTH ) );
}

var PlayerStates = {
    IDLE : 0,
    LEFT : 1,
    RIGHT: 2,
    JUMP: 3,
    FALL: 4,
    CLIMB: 5,
}

var Level = function()
{
    this.alert = new createjs.Bitmap(assetLoader.getResult( "alert" ));
    this.currentLayer = 0;
    this.playerState = PlayerStates.IDLE;
    this.score = 0;
    this.isRunning = true;
    this.initialize();
}

Level.prototype =  new createjs.Container();

Level.prototype.constructor = Level;

Level.prototype.layers = [];
Level.prototype.layerIndex  = 0;
Level.prototype.maxVisibleLayers = 5;
Level.prototype.player = {};

Level.prototype.base_initialize = Level.prototype.initialize;
Level.prototype.initialize = function()
{
    this.base_initialize();

    var images = [
            assetLoader.getResult( "player_stand0" ),
            assetLoader.getResult( "player_stand1" ),

            assetLoader.getResult( "player_walk0" ),
            assetLoader.getResult( "player_walk1" ),
            assetLoader.getResult( "player_walk2" ),

            assetLoader.getResult( "player_fall" ),
            assetLoader.getResult( "player_jump" ),
            assetLoader.getResult( "player_climb0" ),
            assetLoader.getResult( "player_climb1" ),
    ]

    var data = {
        images: images,
        frames: { width: TILE_WIDTH, height: TILE_HEIGHT, count: images.length, regX: TILE_WIDTH / 2, regY: 0 },

        animations: {
            run: [2, 4, "run", 3],
            stand: [0, 1, "stand", 10],
            fall: [5],
            jump: [6],
            climb: [7, 8, "climb", 5],

        }
    }
    var spriteSheet = new createjs.SpriteSheet( data );
    this.player = new createjs.BitmapAnimation( spriteSheet );
    this.player.gotoAndPlay( "stand" );
    this.playerLayer = 3;
    while ( this.currentLayer < 6 ) {
        this.moveUp( true );
    }
    levelGlobal = this;
    this.layers[this.playerLayer].addPlayer( this.player, 2.5 * TILE_WIDTH );

};



Level.prototype.addScore = function(score)
{
    this.score += score;
    labelScore.text = "Score:" + this.score;
}


Level.prototype.moveUp = function ( force ) {

    if ( force ) {
        this.currentLayer++;

    }
    else {
        var playerLayer = this.layers[this.playerLayer];
        var playerTile = playerLayer.getTileAt( this.player.x );
        var upperLayer = this.layers[this.playerLayer + 1];
        var upperPlayerX = this.player.x + playerLayer.x - upperLayer.x;
        var upperTile = upperLayer.getTileAt( upperPlayerX );
        if ( playerTile == "H" && upperTile == " " && ( this.playerState == PlayerStates.IDLE || this.playerState == PlayerStates.LEFT || this.playerState == PlayerStates.RIGHT ) ) {
            this.currentLayer++;
            playerLayer.removePlayer( this.player );
            upperLayer.addPlayer( this.player, this.player.x + playerLayer.x );
            this.playerLayer = this.playerLayer + 1;
            this.playerState = PlayerStates.CLIMB;
            this.player.y = TILE_HEIGHT;
            createjs.Tween.get( this.player ).to( { y: 0 }, 1000 );
            this.player.gotoAndPlay( "climb" );
        } else if ( playerTile == "J" && upperTile == " " && ( this.playerState == PlayerStates.IDLE || this.playerState == PlayerStates.LEFT || this.playerState == PlayerStates.RIGHT ) ) {
            this.currentLayer++;
            playerLayer.removePlayer( this.player );
            upperLayer.addPlayer( this.player, this.player.x + playerLayer.x );
            this.playerLayer = this.playerLayer + 1;
            this.playerState = PlayerStates.JUMP;
            this.player.y = TILE_HEIGHT;
            createjs.Tween.get( this.player ).to( { y: 0 }, 300 );
            this.player.gotoAndPlay( "jump" );
        } else if ( playerTile == "^" ) {
            var foundDoor = false;
            var layerOffset = 0;
            while ( !foundDoor ) {
                layerOffset++;
                upperLayer = this.layers[this.playerLayer + layerOffset];
                for ( i = -5 * TILE_WIDTH + TILE_WIDTH / 2; i < 15 * TILE_WIDTH; i += TILE_WIDTH ) {
                    upperTile = upperLayer.getTileAt( i );
                    if ( upperTile == "V" ) {
                        foundDoor = true;
                        break;
                    }
                }
            }
            this.currentLayer += layerOffset;
            playerLayer.removePlayer( this.player );
            upperLayer.addPlayer( this.player, i + upperLayer.x );
            this.playerLayer = this.playerLayer + layerOffset;
        } else if ( playerTile == "P" ) {
            var foundDoor = false;
            var layerOffset = 0;
            while ( !foundDoor ) {
                layerOffset++;
                upperLayer = this.layers[this.playerLayer + layerOffset];
                for ( i = -5 * TILE_WIDTH + TILE_WIDTH / 2; i < 15 * TILE_WIDTH; i += TILE_WIDTH ) {
                    upperTile = upperLayer.getTileAt( i );
                    if ( upperTile == "B" ) {
                        foundDoor = true;
                        break;
                    }
                }
            }
            this.currentLayer += layerOffset;
            playerLayer.removePlayer( this.player );
            upperLayer.addPlayer( this.player, i + upperLayer.x );
            this.playerLayer = this.playerLayer + layerOffset;
        }
    }
    if ( this.currentLayer > this.layers.length - 5 ) {
        this.addScore(100);
        var pattern = this.requestPattern();
        var i = pattern.length;
        var layer = null;
        while ( i-- ) {
            layer = new Layer( pattern[i] );
            this.layers.push( layer );
            this.addChild( layer );
            this.setChildIndex( layer, 0 );
            layer.y = -TILE_HEIGHT * this.layers.length;
        }
    }

    createjs.Tween.get( this, { override: true } ).to( { y: this.currentLayer * TILE_HEIGHT }, 500, createjs.Ease.quadOut );
}

Level.prototype.moveDown = function () {
    if ( this.currentLayer <= 5 ) return;

    var playerLayer = this.layers[this.playerLayer];
    var playerTile = playerLayer.getTileAt( this.player.x );
    var lowerLayer = this.layers[this.playerLayer - 1];
    var lowerPlayerX = this.player.x + playerLayer.x - lowerLayer.x;
    var lowerTile = lowerLayer.getTileAt( lowerPlayerX );
    if ( playerTile == " " && ( lowerTile != "W" || lowerTile != "S" ) && ( this.playerState == PlayerStates.IDLE || this.playerState == PlayerStates.LEFT || this.playerState == PlayerStates.RIGHT ) ) {
        this.currentLayer--;
        playerLayer.removePlayer( this.player );
        lowerLayer.addPlayer( this.player, this.player.x + playerLayer.x );
        this.playerLayer = this.playerLayer - 1;
        this.playerState = PlayerStates.FALL;
        this.player.y = -TILE_HEIGHT;
        createjs.Tween.get( this.player ).to( { y: 0 }, 1000 );
        this.player.gotoAndPlay( "fall" );
    } else if ( playerTile == "V" ) {
        var foundDoor = false;
        var layerOffset = 0;
        while ( !foundDoor ) {
            layerOffset--;
            lowerLayer = this.layers[this.playerLayer + layerOffset];
            for ( i = -5 * TILE_WIDTH + TILE_WIDTH / 2; i < 15 * TILE_WIDTH; i += TILE_WIDTH ) {
                lowerTile = lowerLayer.getTileAt( i );
                if ( lowerTile == "^" ) {
                    foundDoor = true;
                    break;
                }
            }
        }
        this.currentLayer += layerOffset;
        playerLayer.removePlayer( this.player );
        lowerLayer.addPlayer( this.player, i + lowerLayer.x );
        this.playerLayer = this.playerLayer + layerOffset;
    } else if ( playerTile == "B" ) {
        var foundDoor = false;
        var layerOffset = 0;
        while ( !foundDoor ) {
            layerOffset--;
            lowerLayer = this.layers[this.playerLayer + layerOffset];
            for ( i = -5 * TILE_WIDTH + TILE_WIDTH / 2; i < 15 * TILE_WIDTH; i += TILE_WIDTH ) {
                lowerTile = lowerLayer.getTileAt( i );
                if ( lowerTile == "P" ) {
                    foundDoor = true;
                    break;
                }
            }
        }
        this.currentLayer += layerOffset;
        playerLayer.removePlayer( this.player );
        lowerLayer.addPlayer( this.player, i + lowerLayer.x );
        this.playerLayer = this.playerLayer + layerOffset;
    }

    createjs.Tween.get( this, { override: true } ).to( { y: this.currentLayer * TILE_HEIGHT }, 500, createjs.Ease.quadOut );
}

Level.prototype.update = function () {

    if(!this.isRunning) return;

    var playerX = this.layers[this.playerLayer].getPlayerX( this.player );
    var newPos = this.player.x;
    newPos += Math.max( -PLAYER_SPEED_X, Math.min( PLAYER_SPEED_X, 2.5 * TILE_WIDTH - playerX ) );

    if ( this.player.x < newPos && this.playerState != PlayerStates.RIGHT && this.player.y == 0 ) {
        this.playerState = PlayerStates.RIGHT;
        this.player.gotoAndPlay( "run" );
        this.player.scaleX = 1;
    }
    else if ( this.player.x > newPos && this.playerState != PlayerStates.LEFT && this.player.y == 0 ) {
        this.playerState = PlayerStates.LEFT;
        this.player.gotoAndPlay( "run" );
        this.player.scaleX = -1;
    }
    else if ( this.player.x == newPos && this.playerState != PlayerStates.IDLE && this.player.y == 0 ) {
        this.playerState = PlayerStates.IDLE;
        this.player.gotoAndPlay( "stand" );
    }

    if ( !this.layers[this.playerLayer].collidesAt( newPos ) ) {
        this.player.x = newPos;
    }

    if ( this.player.x + this.layers[this.playerLayer].x < 0 ) {
        if ( !this.alert.parent ) {
            this.alert.alpha = 1;
            createjs.Tween.get( this.alert, { loop: true } ).to( { alpha: 0.5 }, 500 );
            this.addChild( this.alert );
        }
        this.alert.y = this.layers[this.playerLayer].y;
        this.alert.x = 0;
        this.alert.scaleX = 1;
    }
    else if ( this.player.x + this.layers[this.playerLayer].x > TILE_WIDTH * 5 ) {
        if ( !this.alert.parent ) {
            this.alert.alpha = 1;
            createjs.Tween.get( this.alert, { loop: true } ).to( { alpha: 0.5 }, 500 );
            this.addChild( this.alert );
        }
        this.alert.y = this.layers[this.playerLayer].y;
        this.alert.x = TILE_WIDTH * 5;
        this.alert.scaleX = -1;
    }
    else if ( this.alert.parent ) {
        this.removeChild( this.alert );
        createjs.Tween.removeTweens( this.alert );
    }

    this.zombies.update();
    if(-TILE_HEIGHT * (this.currentLayer-2.3) > this.zombies.y) 
    {
        this.gameOver();
    }
    else if ( -TILE_HEIGHT * ( this.currentLayer - 4.3 ) > this.zombies.y ) {
        this.zombies.speed = ZombieLayerSpeeds.SLOW;
    }
    else if ( -TILE_HEIGHT * ( this.currentLayer - 10.3 ) > this.zombies.y ) {
        this.zombies.speed = ZombieLayerSpeeds.NORMAL;
    }
    else if ( -TILE_HEIGHT * ( this.currentLayer - 15.3 ) > this.zombies.y ) {
        this.zombies.speed = ZombieLayerSpeeds.FAST;
    }

    var bla = Math.floor(Math.abs(this.zombies.y / TILE_HEIGHT));
    var layerToRemove = this.layers[bla-2];
    if(layerToRemove && layerToRemove.parent)
    {
            console.log("removing", bla);
            this.removeChild( layerToRemove ); 
    }

};

Level.prototype.requestPattern = function () {
    return GetRandomPattern();
}

Level.prototype.moveLayer = function(layerNo, offset)
{
    if (
        this.playerState == PlayerStates.IDLE ||
        this.playerState == PlayerStates.LEFT ||
        this.playerState == PlayerStates.RIGHT ) {
        this.layers[layerNo].moveByOffset( offset );
    }
};


Level.prototype.moveLayerStart = function()
{
    if (
        this.playerState == PlayerStates.IDLE ||
        this.playerState == PlayerStates.LEFT ||
        this.playerState == PlayerStates.RIGHT ) {
        createjs.Tween.removeTweens( this );
    }
}

Level.prototype.moveLayerEnded = function(layerNo, deltaX, deltaTime)
{
    if (
        this.playerState == PlayerStates.IDLE ||
        this.playerState == PlayerStates.LEFT ||
        this.playerState == PlayerStates.RIGHT ) {

        var lvl = this;
        var l = this.layers[layerNo];

        var speed = Math.abs( deltaX ) / deltaTime;
        var dir = 1;
        if ( deltaX < 0 )
            dir = -1;

        this.twe = dir * speed * 30;



        function onComplete() {
            l.snapToGrid();
        }

        if ( speed > 0.5 ) {
            var that = this;
            createjs.Tween.get( this, { override: true } )
                .to( { twe: dir * 6 }, 2000, createjs.Ease.quadOut )
                .call( onComplete )
                .addEventListener( "change", function handleChange( event ) {
                    lvl.moveLayer( layerNo, that.twe );
                } )
            ;

        } else {
            onComplete();
        }
    }
}

Level.prototype.gameOver = function()
{
    this.isRunning = false;
    this.zombies.isRunning = false;

    $('#gameOver').fadeIn();
}

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

var ZombieLayerSpeeds = {
    SLOW : 0.5,
    NORMAL : 1.5,
    FAST : 5.5,
}

function ZombieLayer() {

    var images = [
            assetLoader.getResult( "zombie0" ),
            assetLoader.getResult( "zombie1" ),
            assetLoader.getResult( "zombie2" ),
    ]

    var data = {
        images: images,
        frames: { width: 640, height: 392, count: 3 },
        animations: {
            normal: [0, 2, "normal", 60],
        }
    }
    var spriteSheet = new createjs.SpriteSheet( data );
    this.initialize( spriteSheet );
    this.x = 0;
    this.y = -300;
    this.speed = .5;
    this.isRunning = true;
    this.gotoAndPlay( "normal" );
} 


    ZombieLayer.prototype = new createjs.BitmapAnimation();
    ZombieLayer.prototype.update = function() 
    {
        if(this.isRunning)
            this.y -= this.speed;
    }









