
let testScene=new Phaser.Scene('testScene');

testScene.preload=function(){
  this.load.tilemapTiledJSON('map', 'assets/TestMap.json');
}

let player;
let controls;
let coinLayer;
let text;
let score;

testScene.create=function(){
  score=0;
  var map=this.make.tilemap({key:'map'});
  var tiles=map.addTilesetImage('Dirt', 'dirt');
  var coins=map.addTilesetImage('Coin', 'coin');
  var groundlayer=map.createDynamicLayer('GroundLayer', tiles, 0, 0);
  coinLayer=map.createDynamicLayer('CoinLayer', coins, 0, 0)
  groundlayer.setCollisionByProperty({collidable:true});

  //coinLayer.setTileIndexCallback(-1, hitCoin, this);

  player=new Player({width:16, height:30}, this);
  this.physics.add.collider(groundlayer, player.playerSprite);
  this.physics.add.overlap(coinLayer, player.playerSprite, hitCoin, null, this);

  controls=this.input.keyboard.addKeys({
    left:Phaser.Input.Keyboard.KeyCodes.A,
    right:Phaser.Input.Keyboard.KeyCodes.D,
    jump:Phaser.Input.Keyboard.KeyCodes.SPACE
  });

  text=this.add.text(0,0,"Coins: 0",{color:'#000000'});
}

testScene.update=function(){
  player.move(controls);
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
