var D100Dungeon = D100Dungeon || {};

D100Dungeon.Room = function(state, x, y, frame, roomData, directionEntered) {
  Phaser.Sprite.call(this, state, x, y, 'rooms', frame);
  this.state = state;
  this.game = state.game;
  this.frame = frame;
  // save before rotation
  this.directionEntered = directionEntered;
  this.rotation = this.rotationAngleMatrix[directionEntered];  

  this.roomData = JSON.parse(JSON.stringify(roomData));
  this.roomData.exits.forEach(element => {
    element.direction = this.rotationDirectionMatrix[directionEntered][element.direction];
  });
  this.roomAttributes = this.game.add.group();
  this.redraw();
}

D100Dungeon.Room.prototype = Object.create(Phaser.Sprite.prototype);
D100Dungeon.Room.prototype.constructor = D100Dungeon.Room;
D100Dungeon.Room.prototype.rotationAngleMatrix = {'N':0, 'S':Math.PI, 'W':Math.PI*3/2, 'E':Math.PI/2};
D100Dungeon.Room.prototype.rotationDirectionMatrix = {
N: {N:'N', S:'S',W:'W',E:'E'},
S: {N:'S', S:'N',W:'E',E:'W'},
W: {N:'W', S:'E',W:'S',E:'N'},
E: {N:'E', S:'W',W:'N',E:'S'},
};
D100Dungeon.Room.prototype.redraw = function () {
  this.children.length=0;

  if (this.x===0 && this.y===0) {
    let d = new Phaser.Sprite(this.game, 0, 27.5, 'door');
    d.anchor.setTo(0.5);
    this.addChild(d);
  }

  if (this.roomData.room.searched || true) {
    let s = new Phaser.Sprite(this.game, -27.5, 27.5, 'SearchIcon');
    s.anchor.setTo(0,1);
    this.addChild(s);
    
  }
  if (this.roomData.room.interacted || true) {
    let i = new Phaser.Sprite(this.game, 27.5, 27.5, 'InteractIcon');
    i.anchor.setTo(1,1);
    this.addChild(i);
  }
}