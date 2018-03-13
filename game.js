let config={
  type: Phaser.AUTO,
  width: 640,
  height: 384,
  parent: 'game',
  backgroundColor: '#ffffff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene:{
    preload: preload,
    create: create,
    update: update
  }
};

let game=new Phaser.Game(config);

function preload(){
  //this.load.image('player', 'assets/stickman.png');
  this.load.spritesheet('player', 'assets/playerSprites.png',
    {frameWidth:32, frameHeight:32});
}

let player;
let cursors;
let controls;

function create(){
  player=this.physics.add.sprite(100, 100, 'player');
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', {start:0, end:3}),
    frameRate:10,
    repeat:-1
  });
  this.anims.create({
    key:'right',
    frames: this.anims.generateFrameNumbers('player', {start:4, end:7}),
    frameRate:10,
    repeat:-1
  });
  this.anims.create({
    key:'jump',
    frames:this.anims.generateFrameNumbers('player', {start:8, end:11}),
    frameRate:10,
    repeat:-1
  });
  this.anims.create({
    key:'stop',
    frames:[{key:'player', frame:4}],
    frameRate: 20
  });

  controls=this.input.keyboard.addKeys({
    left:Phaser.Input.Keyboard.KeyCodes.A,
    right:Phaser.Input.Keyboard.KeyCodes.D,
    jump:Phaser.Input.Keyboard.KeyCodes.SPACE
  });
}

function update(){
  if(controls.left.isDown){
    player.setVelocityX(-160);
    player.anims.play('left', true);
  }
  else if(controls.right.isDown){
    player.setVelocityX(160);
    player.anims.play('right', true);
  }
  else{
    player.setVelocityX(0);
    player.anims.play('stop');
  }
  if(controls.jump.isDown&&player.body.onFloor()){
    player.setVelocityY(-100);
  }
}
