
let testScene=new Phaser.Scene('testScene');

testScene.preload=function(){
  this.load.spritesheet('player', 'assets/playerSprites.png',
    {frameWidth:32, frameHeight:32});
  this.load.spritesheet('coin', 'assets/coin.png',{frameWidth:32,frameHeight:32});
  this.load.image('dirt', 'assets/DirtAtlas.png');
  this.load.tilemapTiledJSON('map', 'assets/TestMap.json');
}

let player;
let coin;
let canJump;
let graceTimerConfig;
let jumpGraceTimer;
let controls;
let coinLayer;
let text;
let score;

testScene.create=function(){
  score=0;
  var map=this.make.tilemap({key:'map'});

  var tiles=map.addTilesetImage('Dirt', 'dirt');
  var coins=map.addTilesetImage('Coin', 'coin');
  var backgroundLayer=map.createDynamicLayer('BackgroundLayer', tiles, 0, 0)
  var groundlayer=map.createDynamicLayer('GroundLayer', tiles, 0, 0);
  coinLayer=map.createDynamicLayer('CoinLayer', coins, 0, 0)
  groundlayer.setCollisionByProperty({collidable:true});

  //coinLayer.setTileIndexCallback(-1, hitCoin, this);

  player=this.physics.add.sprite(100, 100, 'player');
  player.setSize(16, 30);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(groundlayer, player);
  this.physics.add.overlap(coinLayer, player, hitCoin, null, this);
  canJump=false;

  graceTimerConfig={delay:100, paused:true, startAt:0, loop:true, callback:graceEvent};
  jumpGraceTimer = this.time.addEvent(graceTimerConfig);

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

  text=this.add.text(0,0,"Coins: 0",{color:'#000000'});
}

function hitCoin(sprite, tile){
  if(tile.index!=-1){
    console.log("coin hit");
    score++;
    coinLayer.removeTileAt(tile.x, tile.y);
    text.setText('Coins: '+score);
  }
  return false;
}

testScene.update=function(){
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

  if(player.body.onFloor()){
    canJump=true;
  }
  if(!player.body.onFloor()&&jumpGraceTimer.paused){
    jumpGraceTimer.paused=false;
  }

  if(controls.jump.isDown&&canJump){
    canJump=false;
    player.setVelocityY(-250);
    player.anims.play('jump');
  }
}

function graceEvent(){
  jumpGraceTimer.reset(graceTimerConfig);
  canJump=false;
}
