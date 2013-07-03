

var PLAYER_SPEED_X = 3;
var WORLD_CENTER = { x: 320 , y: 500 };
var Player = function(x, y)
{
	this.initialize(x, y);
}

Player.STATES = {
	LEFT : 0,
	RIGHT : 1,
	UP : 2,
	DOWN : 3
};

Player.MAX_SPEED = 12;

// Player.prototype =  new createjs.Bitmap();
Player.prototype.constructor = Player;

Player.prototype.sprite = null;

Player.prototype.speedX = PLAYER_SPEED_X;
Player.prototype.x_ = 0;
Player.prototype.y_ = 0;


Player.prototype.initialize = function(x, y) 
{
	this.state_  = Player.STATES.DOWN;
	this.speed_ = 0;
	this.x_ =  x;
	this.y_ =  y;
	this.sprite = new createjs.Bitmap('res/wendy.png');

}

Player.prototype.translate = function(x, y)
{
	this.setPos(this.x_+x, this.y_+y);
}

Player.prototype.setPos = function (x, y)
{
	this.x_ = x;
	this.y_ = y;
	this.sprite.x = this.x_;
	this.sprite.y = this.y_;
}


Player.prototype.newPosX = function()
{
	var diffX = WORLD_CENTER.x - this.x_; 
	this.speed_ = Math.min( Math.abs(diffX), Player.MAX_SPEED );
	if (diffX<0) 
	{
		this.speed_ *= -1;	
		
	} 

	this.updateState(); 
	var newX = this.x_ + this.speed_;

	return newX;	
}


Player.prototype.updateState = function()
{
	if(this.speed_>0)
	{
		this.state = Player.RIGHT;
		this.sprite.scaleX = -1;
	}
	else  if (this.speed_<0)
	{
		this.state = Player.LEFT;
		this.sprite.scaleX = 1;
	}
	else
	{
		this.state = Player.DOWN;
	}
}

Player.prototype.update = function(level) 
{
	var newX = this.newPosX();

	if (  level.canPlayerMoveTo(newX, this.y_) & (Enter.LEFT | Enter.RIGHT ) ) 
	{
		this.setPos(newX, this.y_);
	} 
}