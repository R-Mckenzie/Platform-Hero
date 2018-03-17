let gameOverScene=new Phaser.Scene('gameOverScene');

gameOverScene.preload=function(){

}

gameOverScene.create=function(){
  this.add.text(320, 150, "Game\nOver!",
   {fontSize:120, color:'#000000', align:'center'}).setOrigin(0.5);
  this.add.text(320, 300, "Press 'R' to restart!",
   {fontSize:30, color:'#000000', align:'center'}).setOrigin(0.5);
}

gameOverScene.update=function(){
  if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R).isDown){
    this.scene.start('titleScene');
  }
}
