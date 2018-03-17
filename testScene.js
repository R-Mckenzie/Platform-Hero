
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
let score;

var map;
var tiles;
var coins;
var groundlayer;

testScene.create=function(){
  score=0;
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

  scoreText=this.add.text(0,0,"Coins: 0",{color:'#000000'});
  healthText=this.add.text(0,30,"Health: 2",{color:'#000000'});
}

testScene.update=function(time, delta){
  player.update(controls, time);
  healthText.setText('Health: '+player.getHealth());
  enemies.forEach(function(e){
    e.move();
  })

  if(score>=12){
    enemies.length=0;
    player.playerSprite.destroy();
    this.scene.stop('testScene');
    this.scene.start('level2');
  }

  if(!player.alive){

  }
}

function hitCoin(sprite, tile){
  if(tile.index!=-1){
    console.log("coin hit");
    score++;
    coinLayer.removeTileAt(tile.x, tile.y);
    scoreText.setText('Coins: '+score);
  }
  return false;
}
