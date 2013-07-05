function init() {
    preloadAssetsAndStart();
    initSound();


    topPos = 0;
    var that = this;
    this.splashStatus = $('#splash-status');

    //$('body').delay('1000').animate({ scrollTop: '0px' }, 'slow');


    window.onresize = function(e) { resize(e) };

    $('#restartButton').click( function handleChange(event) {
        window.location.reload();
    });

    $('<div>')
    .addClass('button right')
    .click( function() {
        createjs.Sound.play("princes");
  
      
    })
    .text('PLAY')
    .attr('value','ok')
    .appendTo(this.splashStatus);


    $('#story0').click( function() {
        createjs.Sound.play("oh_my_god");
        scrollStory();
    });

    $('#story1').click( function() {
        createjs.Sound.play("do_do_do");
        scrollStory();
    });

    $('#story2').click( function() {
        createjs.Sound.play("scream");
        scrollStory();
    });

    $('#story3').click( function() {
        // scrollStory();
        $('#mainMenu').fadeOut(400, function() {
              world.level.isRunning = true;
        });
    });

    resize();
}

function scrollStory() {
    topPos -= window.innerHeight;

    $("#mainMenu").animate({top: topPos});
}


var assetLoader = new createjs.LoadQueue();
function preloadAssetsAndStart() {
    assetLoader.addEventListener( "complete", startMainLoop );
    assetLoader.loadManifest( [
        { id: "tile_wall0", src: "res/wall.png" },
        { id: "tile_wall1", src: "res/wall1.png" },

        { id: "tile_obstacle", src: "res/obstacle.png" },

        { id: "tile_bg0", src: "res/bgtile1.png" },
        { id: "tile_bg1", src: "res/bgtile2.png" },
        { id: "tile_bg2", src: "res/bgtile3.png" },
        { id: "tile_bg3", src: "res/bgtile4.png" },
        { id: "tile_bg4", src: "res/bgtile5.png" },
        { id: "tile_bg5", src: "res/bgtile6.png" },

        { id: "tile_floor0", src: "res/floortile1.png" },
        { id: "tile_floor1", src: "res/floortile2.png" },
        { id: "tile_floor2", src: "res/floortile3.png" },
        { id: "tile_floor3", src: "res/floortile4.png" },
        { id: "tile_floor4", src: "res/floortile5.png" },
        { id: "tile_floor5", src: "res/floortile6.png" },

        { id: "tile_hole", src: "res/hole2.png" },
        { id: "tile_ladder", src: "res/ladder.png" },
        { id: "tile_jump", src: "res/trampoline.png" },
        { id: "tile_door_up_a", src: "res/door1up.png" },
        { id: "tile_door_down_a", src: "res/door1down.png" },
        { id: "tile_door_up_b", src: "res/door2up.png" },
        { id: "tile_door_down_b", src: "res/door2down.png" },

        { id: "player_stand0", src: "res/character_basic.png" },
        { id: "player_stand1", src: "res/character_idle1.png" },

        { id: "player_walk0", src: "res/character_basic.png" },
        { id: "player_walk1", src: "res/character_walk1.png" },
        { id: "player_walk2", src: "res/character_walk2.png" },

        { id: "player_jump", src: "res/character_jump.png" },
        { id: "player_fall", src: "res/character_fall.png" },
        { id: "player_climb0", src: "res/character_climb.png" },
        { id: "player_climb1", src: "res/character_climb2.png" },

        { id: "alert", src: "res/alert.png" },

        { id: "zombie0", src: "res/zombiewave1.png" },
        { id: "zombie1", src: "res/zombiewave2.png" },
        { id: "zombie2", src: "res/zombiewave3.png" },

        { id: "story0", src: "res/startscreen.png" },
        { id: "story1", src: "res/story1.png" },
        { id: "story2", src: "res/story2.png" },
        { id: "story3", src: "res/story3.png" }

    ] );
}


 resize = function() {
  var 
  width =  window.innerWidth,
  height =  window.innerHeight,
  canvas =  $('#game');

  var aspect = height / width;
  var aspectedWidth = (height/3) * 2;

  if(aspect>1.2)
    aspectedWidth = width;

  
  canvas.css('margin-left', '' + (-aspectedWidth/2) + 'px');
  canvas.width(aspectedWidth);
  canvas.height(height);
  canvas.css('left', '50%');

};

function startMainLoop() {
      world = new GameWorld();
}


function initSound() {
               if (!createjs.Sound.initializeDefaultPlugins()) {return;}
                var audioPath = "res/";
                var manifest = [
                {id:"story1", src:audioPath+"princes_oh_my_god.mp3"},
                    {id:"story2", src:audioPath+"princes-do-do-do.mp3"},
                    {id:"story3", src:audioPath+"princes_scream.mp3"}
                ];
                createjs.Sound.registerManifest(manifest);

}
 
var GameWorld  = function()
{
    this.init();
}



GameWorld.prototype.contructor = GameWorld;

GameWorld.prototype.init = function() 
{

    stage = this.stage = new createjs.Stage( "canvas" );

    createjs.Ticker.addEventListener( "tick", update );
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS( 30 );

    labelScore = new createjs.Text("Score: 0", "30px Courier", "#FFFFFF");
    labelScore.x = 10;
    labelScore.y =  30;
    labelScore.textBaseline = "alphabetic";


    //player = this.player = new Player(WORLD_CENTER.x, WORLD_CENTER.y);
    var level = this.level = new Level();
    level.isRunning  = false;
    stage.addChild( level );

    this.tutorialStep = 0;
 
    this.storyCurrent = new  createjs.Bitmap(assetLoader.getResult('story0'));
   

    level.zombies = new ZombieLayer();

    level.addChild( level.zombies );
     stage.addChild( labelScore ); 
     stage.addChild(this.storyCurrent);

    var inputManager = new InputManager();
    inputManager.init( stage, this );

    function update() {
            stage.update();
            level.update();
    }
}

GameWorld.prototype.updateTutorialStep = function()
 {
    this.tutorialStep++;
    if(this.tutorialStep<4)
    {
        createjs.Sound.play('story' + this.tutorialStep );
        this.storyNext = new createjs.Bitmap(assetLoader.getResult('story' + this.tutorialStep ));
        this.storyNext.y = 960;
        stage.addChild(this.storyNext);
        createjs.Tween.get( this.storyCurrent ).to( { y: -960 }, 400 );
        var that = this;
        createjs.Tween.get( this.storyNext ).to( { y: 0 }, 400 ).call( function() {
            stage.removeChild(that.storyCurrent);
            that.storyCurrent = that.storyNext;
            that.storyCurrent.y = 0;
        }); 
    }
    if(this.tutorialStep==4) {
         var that = this;
        createjs.Tween.get( this.storyCurrent ).to( { alpha: 0 }, 400 ).call( function() {
            stage.removeChild(that.storyCurrent);
            that.level.isRunning = true;
        }); 
    }


}


GameWorld.prototype.getLayerForPoint = function( x, y) 
{
    return this.level.getLayerForPoint(x, y);
}

GameWorld.prototype.handleInput = function(layer, x, y)
{
    if(Math.abs(x) > Math.abs(y*2))
        this.level.moveLayer( layer, x );
}

GameWorld.prototype.handleSwipeDown = function () {
    this.level.moveUp();
}

GameWorld.prototype.handleSwipeUp = function () {
    this.level.moveDown();
}
