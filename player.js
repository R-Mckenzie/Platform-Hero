
var Player=function(collider, context){
  this.create(collider, context);
};

var isInvulnerable=false;
var hitTime=0;
var health=2;
var time;
var lastFlickerTime=0;
var playerSprite;
var context;

Player.prototype.create=function(collider, ctx){
  this.playerSprite=ctx.physics.add.sprite(collider.xPos, collider.yPos, 'player');
  this.canJump=false;

  context=ctx;

  this.playerSprite.setSize(collider.width, collider.height);
  this.playerSprite.setCollideWorldBounds(true);

  this.invulnTime=1000;//2 seconds (in ms)
  this.flickerWait=200;
  this.lastFlickerTime=0;
  this.red=false;

  this.alive=true;
}

Player.prototype.getHealth=function(){
  return health;
}

Player.prototype.update=function(controls, currentTime){
  time=currentTime;

  if(time-lastFlickerTime>this.flickerWait&&isInvulnerable){
    this.red=!this.red;
    lastFlickerTime=time;
  }
  if(this.red){
    this.playerSprite.alpha=0.6;
    this.playerSprite.tint=0xff0000;
  }else{
    this.playerSprite.alpha=1;
    this.playerSprite.tint=0xffffff;
  }

  if(time-hitTime>this.invulnTime&&isInvulnerable){
    isInvulnerable=false;
    this.red=false;
    console.log("uninvuln");
  }

  if(health<=0){
    this.die();
  }
  this.move(controls);
}

Player.prototype.move=function(controls){
  if(controls.left.isDown){
    this.playerSprite.setVelocityX(-160);
    this.playerSprite.anims.play('left', true);
  }
  else if(controls.right.isDown){
    this.playerSprite.setVelocityX(160);
    this.playerSprite.anims.play('right', true);
  }
  else if(!controls.right.isDown&&!controls.left.isDown&&this.playerSprite.body.onFloor()){
    this.playerSprite.setVelocityX(0);
    this.playerSprite.anims.play('stop',true);
  }
  if(controls.jump.isDown&&this.playerSprite.body.onFloor()){
    this.jump();
  }
}

Player.prototype.jump=function(){
  this.canJump=false;
  this.playerSprite.setVelocityY(-250);
  this.playerSprite.anims.play('jump');
}

Player.prototype.gotHit=function(){
  if(!isInvulnerable){
    health--;
    hitTime=time;
    lastFlickerTime=time;
    isInvulnerable=true;
    if(health==0){
      return;
    }
    console.log("hit");
  }
}

Player.prototype.die=function(){
  console.log("dead");
  this.alive=false;
}
