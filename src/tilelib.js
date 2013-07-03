(function(){

    var floor = {
        image: "tile_floor",
        physic: function ( x ) { return 10 }
    }
    var wall = {
        image: "tile_wall",
        physic: function ( x ) { return -1 }
    }

    var TILELIB = {
        "_": floor,
        "W": wall,
        }

    window.TILELIB = TILELIB;
})();