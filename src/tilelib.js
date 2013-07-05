(function(){

    var floor = {
        images: ["tile_floor0", "tile_floor1", "tile_floor2", "tile_floor3", "tile_floor4", "tile_floor5"],
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
        canEnter: Enter.NONE
    }
    var hole = {
        images: ["tile_hole", ],
        physic: function ( x ) { return 10 },
        canEnter: Enter.LEFT | Enter.RIGHT
    }
    var jump = {
        images: ["tile_jump", ],
        physic: function ( x ) { return 10 },
        canEnter: Enter.LEFT | Enter.RIGHT
    }
    var ladder = {
        images: ["tile_ladder", ],
        physic: function ( x ) { return 10 },
        canEnter: Enter.LEFT | Enter.RIGHT
    }
    var doorUpA = {
        images: ["tile_door_up_a", ],
        physic: function ( x ) { return 10 },
        canEnter: Enter.LEFT | Enter.RIGHT
    }
    var doorDownA = {
        images: ["tile_door_down_a", ],
        physic: function ( x ) { return 10 },
        canEnter: Enter.LEFT | Enter.RIGHT
    }
    var doorUpB = {
        images: ["tile_door_up_b", ],
        physic: function ( x ) { return 10 },
        canEnter: Enter.LEFT | Enter.RIGHT
    }
    var doorDownB = {
        images: ["tile_door_down_b", ],
        physic: function ( x ) { return 10 },
        canEnter: Enter.LEFT | Enter.RIGHT
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