
let level2=new Phaser.Scene('level2');

level2.preload=function(){
  this.load.tilemapTiledJSON('map2', 'assets/level2.json');
}

ctx=this;

var map;
var groundlayer;

level2.create=function(){
  map=this.make.tilemap({key:'map2'});
  tiles=map.addTilesetImage('Dirt', 'dirt');
  coins=map.addTilesetImage('Coin', 'coin');
  groundlayer=map.createDynamicLayer('GroundLayer', tiles, 0, 0);
  coinLayer=map.createDynamicLayer('CoinLayer', coins, 0, 0)
  groundlayer.setCollisionByProperty({collidable:true});

  player=new Player({width:16, height:30, xPos:0, yPos:0}, this);
  this.physics.add.collider(groundlayer, player.playerSprite);
  this.physics.add.overlap(coinLayer, player.playerSprite, hitCoin, null, this);

  enemies=[new Enemy({width:16, height:30, xPos:500, yPos:300},this),
    new Enemy({width:16, height:30, xPos:300, yPos:300},this),
    new Enemy({width:16, height:30, xPos:50, yPos:300},this)];

  for(i=0;i<enemies.length;i++){
    this.physics.add.collider(enemies[i].sprite, groundlayer);
    this.physics.add.overlap(enemies[i].sprite, player.playerSprite, player.gotHit);
  }

  scoreText=this.add.text(0,0,"Coins: 0",{color:'#000000'});
  healthText=this.add.text(0,30,"Health: 2",{color:'#000000'});
}

level2.update=function(time, delta){
  player.update(controls, time);
  healthText.setText('Health: '+player.getHealth());
  enemies.forEach(function(e){
    e.move();
  })
  if(!player.alive){

  }

  if(score>=19+12){
    enemies.length=0;
    player.playerSprite.destroy();
    this.scene.stop('level2');
    this.scene.start('testScene');
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
