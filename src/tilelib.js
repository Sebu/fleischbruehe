(function(){

    var floor = {
        images: [ "tile_floor0", "tile_floor1", "tile_floor2", "tile_floor3" ],
        physic: function ( x ) { return 10 },
        canEnter : Enter.LEFT | Enter.RIGHT 
    }
    var wall = {
        images: [ "tile_wall0", "tile_wall1" ],
        physic: function ( x ) { return -1 },
        canEnter : 0
    }
    var hole = {
        images: ["tile_hole", ],
        physic: function ( x ) { return -1 },
        canEnter : Enter.BOTTOM
    }

    var TILELIB = {
        "_": floor,
        "W": wall,
        " ": hole
        }

    window.TILELIB = TILELIB;
})();