let config={
  type: Phaser.AUTO,
  width: 640,
  height: 384,
  parent: 'game',
  pixelArt:true,
  backgroundColor:'#77c0ff',
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
  this.load.spritesheet('player', 'assets/playerSprites.png',
    {frameWidth:32, frameHeight:32});
  this.load.image('dirt', 'assets/DirtAtlas.png');
  this.load.tilemapTiledJSON('map', 'assets/TestMap.json');
}

let player;
let cursors;
let controls;

function create(){
  player=this.physics.add.sprite(100, 100, 'player');
  player.setSize(16, 30);
  player.setCollideWorldBounds(true);

  var map=this.make.tilemap({key:'map'});
  var tiles=map.addTilesetImage('Dirt', 'dirt');
  var layer=map.createStaticLayer(0, tiles, 0, 0);
  layer.setCollisionByProperty({ collidable: true });

  this.physics.add.collider(player, layer);

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
    frameRate:5,
    yoyo:true,
    repeat:0
  });
  this.anims.create({
    key:'stop',
    frames:[{key:'player', frame:8}],
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
  else if(!controls.right.isDown&&!controls.left.isDown&&player.body.onFloor()){
    player.setVelocityX(0);
    player.anims.play('stop',true);
  }

  if(controls.jump.isDown&&player.body.onFloor()){
    player.setVelocityY(-250);
    player.anims.play('jump');
  }
}
