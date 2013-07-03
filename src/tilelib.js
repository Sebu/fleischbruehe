(function(){

    var floor = {
        image: 0,
        physic: function ( x ) { return 10 }
    }
    var wall = {
        image: 1,
        physic: function ( x ) { return -1 }
    }

    var TILELIB = {
        "_": floor,
        "W": wall,
        }

    window.TILELIB = TILELIB;
})();