
let Enemy=function(collider, context){
  this.create(collider, context);
};

Enemy.prototype.create=function(collider, context){
  this.sprite=context.physics.add.sprite(collider.xPos, collider.yPos, 'enemy');

  this.sprite.setSize(collider.width, collider.height);
  this.sprite.setCollideWorldBounds(true);

  this.direction=100;
}

Enemy.prototype.update=function(){
  this.move();
}

Enemy.prototype.move=function(){
  if(this.sprite.body.velocity.x==0){
    this.direction*=-1;
  }
  this.sprite.setVelocityX(this.direction);
}
