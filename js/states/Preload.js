var D100Dungeon = D100Dungeon || {};

D100Dungeon.PreloadState = {
  preload: function () {
    this.load.image('player','assets/images/player.png');
    this.load.image('button', 'assets/images/button.png');
    this.load.spritesheet('rooms', 'assets/tilesets/rooms_sheet.png', 57, 57, 100, 1, 1);
    this.load.image('SearchIcon', 'assets/images/SearchIcon.png');
    this.load.image('door', 'assets/images/door.png');
    this.load.image('background', 'assets/tilesets/backgroundtile.png');
    this.load.image('InteractIcon', 'assets/images/InteractedIcon.png');
    this.load.image('compass', 'assets/images/compass.png');
    this.load.text('roomData', 'assets/json/rooms.json');
    
  },
  create: function () {
    this.state.start('Game');
  }
};