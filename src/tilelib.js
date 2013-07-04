(function(){

    var floor = {
        images: [ "tile_floor0", "tile_floor1", "tile_floor2", "tile_floor3" ],
        physic: function ( x ) { return 10 },
        canEnter : Enter.LEFT | Enter.RIGHT 
    }
    var slimwall = {
        images: [ "tile_obstacle" ],
        physic: function ( x ) { return -1 },
        canEnter : Enter.BOTTOM
    }
    var solidwall = {
        images: ["tile_wall0", "tile_wall1"],
        physic: function ( x ) { return -1 },
        canEnter : Enter.BOTTOM
    }
    var wall = {
        images: [ "tile_wall0", "tile_wall1" ],
        physic: function ( x ) { return -1 },
        canEnter: Enter.BOTTOM
    }
    var hole = {
        images: ["tile_hole", ],
        physic: function ( x ) { return -1 },
        canEnter : Enter.BOTTOM
    }

    var TILELIB = {
        "_": floor,
        "W": slimwall,
        " ": hole,
        "J": floor,
        "H": floor,
        "S": solidwall,
        "^": floor,
        "V": floor,
        "B": floor,
        "P": floor,
        }

    window.TILELIB = TILELIB;
})();