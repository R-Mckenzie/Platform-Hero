let titleScene=new Phaser.Scene('titleScene');

titleScene.preload=function(){
  this.load.spritesheet('player', 'assets/playerSprites.png',
    {frameWidth:32, frameHeight:32});
  this.load.spritesheet('coin', 'assets/coin.png',{frameWidth:32,frameHeight:32});
  this.load.image('dirt', 'assets/DirtAtlas.png');
}

titleScene.create=function(){
  this.add.text(320, 150, "Platform\nHero",
   {fontSize:120, color:'#000000', align:'center'}).setOrigin(0.5);
  this.add.text(320, 300, "Press 'Q' to play!",
   {fontSize:30, color:'#000000', align:'center'}).setOrigin(0.5);

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
}

titleScene.update=function(){
  if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q).isDown){
    this.scene.start('testScene');
  }
}
