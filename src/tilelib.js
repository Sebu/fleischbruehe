(function(){

    var floor = {
        images: [ "tile_floor0", "tile_floor1", "tile_floor2", "tile_floor3" ],
        physic: function ( x ) { return 10 }
    }
    var wall = {
        images: [ "tile_wall", ],
        physic: function ( x ) { return -1 }
    }
    var hole = {
        images: ["tile_hole", ],
        physic: function ( x ) { return -1 }
    }

    var TILELIB = {
        "_": floor,
        "W": wall,
        " ": hole
        }

    window.TILELIB = TILELIB;
})();