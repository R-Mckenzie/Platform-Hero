let config={
  type: Phaser.AUTO,
  width: 640,
  height: 384,
  parent: 'game',
  pixelArt:true,
  backgroundColor:'#fdfdfd',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene:[bootScene, titleScene, testScene, level2, gameOverScene]
};

let game=new Phaser.Game(config);
