let config={
  type: Phaser.AUTO,
  width: 600,
  height: 400,
  parent: 'game',
  backgroundColor: '#ffffff',
  scene:{
    preload: preload,
    create: create,
    update: update
  }
};

let game=new Phaser.Game(config);

function preload(){
  this.load.image('player', 'assets/stickman.png');
}

function create(){
  this.add.image(16, 16, 'player');
}

function update(){

}
