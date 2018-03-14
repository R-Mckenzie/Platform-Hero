let titleScene=new Phaser.Scene('titleScene');

titleScene.preload=function(){
}

titleScene.create=function(){
  this.add.text(320, 150, "Platform\nHero", {fontSize:120, color:'#000000', align:'center'}).setOrigin(0.5);
  this.add.text(320, 300, "Press 'Q' to play!", {fontSize:30, color:'#000000', align:'center'}).setOrigin(0.5);
}

titleScene.update=function(){
  if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q).isDown){
    this.scene.start('testScene');
  }
}
