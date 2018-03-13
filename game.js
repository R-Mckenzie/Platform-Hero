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
  this.load.image('player', 'assets/stickman.png');
}

let player;
let cursors;
let controls;
function create(){
  player=this.physics.add.sprite(100, 100, 'player');
  player.setCollideWorldBounds(true);
  controls=this.input.keyboard.addKeys({
    left:Phaser.Input.Keyboard.KeyCodes.A,
    right:Phaser.Input.Keyboard.KeyCodes.D,
    jump:Phaser.Input.Keyboard.KeyCodes.SPACE
  });
}

function update(){
  if(controls.left.isDown){
    player.setVelocityX(-160);
  }
  else if(controls.right.isDown){
    player.setVelocityX(160);
  }
  else{
    player.setVelocityX(0);
  }
  if(controls.jump.isDown&&player.body.onFloor()){
    player.setVelocityY(-100);
  }
}
