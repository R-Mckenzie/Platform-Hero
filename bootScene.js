let bootScene=new Phaser.Scene('bootScene');

bootScene.preload=function(){
  this.load.spritesheet('player', 'assets/playerSprites.png',
    {frameWidth:32, frameHeight:32});
  this.load.spritesheet('enemy', 'assets/enemySprites.png',
    {frameWidth:32, frameHeight:32});
  this.load.spritesheet('coin', 'assets/coin.png',{frameWidth:32,frameHeight:32});
  this.load.image('dirt', 'assets/DirtAtlas.png');
}

bootScene.create=function(){

  loadPlayerAnims();
  loadEnemyAnims();

  this.scene.start('titleScene');
}

bootScene.update=function(){

}

function loadPlayerAnims(){
  bootScene.anims.create({
    key: 'left',
    frames: bootScene.anims.generateFrameNumbers('player', {start:0, end:3}),
    frameRate:10,
    repeat:-1
  });
  bootScene.anims.create({
    key:'right',
    frames: bootScene.anims.generateFrameNumbers('player', {start:4, end:7}),
    frameRate:10,
    repeat:-1
  });
  bootScene.anims.create({
    key:'jump',
    frames:bootScene.anims.generateFrameNumbers('player', {start:8, end:11}),
    frameRate:5,
    yoyo:true,
    repeat:0
  });
  bootScene.anims.create({
    key:'stop',
    frames:[{key:'player', frame:8}],
    frameRate: 20
  });
}

function loadEnemyAnims(){
  bootScene.anims.create({
    key: 'enemyLeft',
    frames: bootScene.anims.generateFrameNumbers('enemy', {start:0, end:3}),
    frameRate:10,
    repeat:-1
  });
  bootScene.anims.create({
    key:'enemyRight',
    frames: bootScene.anims.generateFrameNumbers('enemy', {start:4, end:7}),
    frameRate:10,
    repeat:-1
  });
  bootScene.anims.create({
    key:'enemyJump',
    frames:bootScene.anims.generateFrameNumbers('enemy', {start:8, end:11}),
    frameRate:5,
    yoyo:true,
    repeat:0
  });
  bootScene.anims.create({
    key:'enemyStop',
    frames:[{key:'enemy', frame:8}],
    frameRate: 20
  });
}
