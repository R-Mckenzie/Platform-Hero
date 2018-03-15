
let Player=function(collider, context){
  this.create(collider, context);
};

Player.prototype.create=function(collider, context){
  this.playerSprite=context.physics.add.sprite(100, 100, 'player');
  this.canJump=false;

  this.playerSprite.setSize(collider.width, collider.height);
  this.playerSprite.setCollideWorldBounds(true);
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
