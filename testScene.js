
let testScene=new Phaser.Scene('testScene');

testScene.preload=function(){
  this.load.tilemapTiledJSON('map', 'assets/TestMap.json');
}

let ctx=this;

let player;
let enemies;
let controls;
let coinLayer;
let scoreText;
let healthText;
let coinsCollected;
let score=0;

var map;
var tiles;
var coins;
var groundlayer;

testScene.create=function(){
  coinsCollected=0;
  map=this.make.tilemap({key:'map'});
  tiles=map.addTilesetImage('Dirt', 'dirt');
  coins=map.addTilesetImage('Coin', 'coin');
  groundlayer=map.createDynamicLayer('GroundLayer', tiles, 0, 0);
  coinLayer=map.createDynamicLayer('CoinLayer', coins, 0, 0)
  groundlayer.setCollisionByProperty({collidable:true});

  player=new Player({width:16, height:30, xPos:100, yPos:100}, this);
  this.physics.add.collider(groundlayer, player.playerSprite);
  this.physics.add.overlap(coinLayer, player.playerSprite, hitCoin, null, this);

  enemies=[new Enemy({width:16, height:30, xPos:500, yPos:300},this),
    new Enemy({width:16, height:30, xPos:300, yPos:300},this)];

  for(i=0;i<enemies.length;i++){
    this.physics.add.collider(enemies[i].sprite, groundlayer);
    this.physics.add.overlap(enemies[i].sprite, player.playerSprite, player.gotHit);
  }

  controls=this.input.keyboard.addKeys({
    left:Phaser.Input.Keyboard.KeyCodes.A,
    right:Phaser.Input.Keyboard.KeyCodes.D,
    jump:Phaser.Input.Keyboard.KeyCodes.SPACE
  });

  scoreText=this.add.text(0,0,"Coins: "+score,{color:'#000000'});
  healthText=this.add.text(0,18,"Health: "+health,{color:'#000000'});
}

testScene.update=function(time, delta){
  player.update(controls, time);
  healthText.setText('Health: '+player.getHealth());
  enemies.forEach(function(e){
    e.move();
  })

  if(coinsCollected>=12){
    enemies.length=0;
    player.playerSprite.destroy();
    this.scene.stop('testScene');
    this.scene.start('level2');
  }

  if(!player.alive){
    enemies.length=0;
    health=2;
    score=0;
    player.playerSprite.destroy();
    this.scene.stop('testScene');
    this.scene.start('gameOverScene');
  }
}

function hitCoin(sprite, tile){
  if(tile.index!=-1){
    console.log("coin hit");
    score++;
    coinsCollected++;
    coinLayer.removeTileAt(tile.x, tile.y);
    scoreText.setText('Coins: '+score);
  }
  return false;
}
