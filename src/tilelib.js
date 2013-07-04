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
    var jump = {
        images: ["tile_jump", ],
        physic: function ( x ) { return -1 },
        canEnter: Enter.BOTTOM
    }
    var ladder = {
        images: ["tile_ladder", ],
        physic: function ( x ) { return -1 },
        canEnter: Enter.BOTTOM
    }
    var doorUpA = {
        images: ["tile_door_up_a", ],
        physic: function ( x ) { return -1 },
        canEnter: Enter.BOTTOM
    }
    var doorDownA = {
        images: ["tile_door_down_b", ],
        physic: function ( x ) { return -1 },
        canEnter: Enter.BOTTOM
    }
    var doorUpB = {
        images: ["tile_door_up_b", ],
        physic: function ( x ) { return -1 },
        canEnter: Enter.BOTTOM
    }
    var doorDownB = {
        images: ["tile_door_down_b", ],
        physic: function ( x ) { return -1 },
        canEnter: Enter.BOTTOM
    }

    var TILELIB = {
        "_": floor,
        "W": slimwall,
        " ": hole,
        "J": jump,
        "H": ladder,
        "S": solidwall,
        "^": doorUpA,
        "V": doorDownA,
        "P": doorUpB,
        "B": doorDownB,
        }

    window.TILELIB = TILELIB;
})();