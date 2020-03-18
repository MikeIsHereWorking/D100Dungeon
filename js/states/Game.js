var D100Dungeon = D100Dungeon || {};

D100Dungeon.GameState = {
  init: function () {
    this.game.physics.arcade.gravity.y=0;
  },
  create: function () {
    this.game.world.setBounds(0,0,1197,1197);    
    this.tiles = this.add.group();
    this.buttons = this.add.group();
    this.buttons.fixedToCamera = true;
    this.worldgroup = this.add.group();
    this.worldgroup.pivot.x = 0;//this.game.world.centerX;
    this.worldgroup.pivot.y = 0;//this.game.world.centerY;
    this.worldgroup.x = this.game.world.centerX;
    this.worldgroup.y = this.game.world.centerY;
    this.game.camera.x = this.game.world.centerX-300;
    this.game.camera.y = this.game.world.centerY-300;

    this.TILE_SIZE = 57.0;
    this.HALF_TILE = this.TILE_SIZE /2;

    this.roomData = JSON.parse(this.game.cache.getText('roomData'));

    this.createGui();
  },
  update: function () { 
    if (this.cursors.up.isDown) this.game.camera.y -= this.TILE_SIZE;
    if (this.cursors.down.isDown) this.game.camera.y +=this.TILE_SIZE;
    if (this.cursors.left.isDown) this.game.camera.x -=this.TILE_SIZE;
    if (this.cursors.right.isDown) this.game.camera.x +=this.TILE_SIZE;
  },
  createGui: function() {
    var world = this.world;
      
    this.board = this.add.tileSprite(world.centerX, world.centerY, world.width, world.height, 'background');
    this.board.anchor.set(0.5);
    this.board.sendToBack();
    this.cursors = this.game.input.keyboard.createCursorKeys();
    //this.buttons.add(new Phaser.Button(this.game, 420, this.game.height - 35, 'button', this.addRoom, this));
    //this.buttons.add(new Phaser.Button(this.game, 160, this.game.height - 35, 'button', this.rotateRoom, this));

    let button = this.buttons.add(new Phaser.Button(this.game, 420, this.game.height - 35, 'button', this.addRoom, this));
    this.buttons.add(button);        
    button = this.buttons.add(new Phaser.Button(this.game, 160, this.game.height - 35, 'button', this.rotateRoom, this));
    this.buttons.add(button);
    button = this.buttons.add(new Phaser.Sprite(this.game, 10, 10, 'compass'));
    this.buttons.add(button);


  },
  addRoom: function() {
    console.log('Add Room');    
    let x,y,direction;
    if (!this.currentRoom) {
      x=0; y=0; direction='N';
    } else {
      direction = this.currentRoom.roomData.exits[0].direction;

      switch (direction) {
        case 'N':
          y = this.currentRoom.y-this.TILE_SIZE;
          x = this.currentRoom.x;
          break;
        case 'S':
          y = this.currentRoom.y+this.TILE_SIZE;
          x = this.currentRoom.x;
          break;
        
        case 'W':
           y = this.currentRoom.y;
           x = this.currentRoom.x - this.TILE_SIZE;
          break;
        case 'E':
          y = this.currentRoom.y;
           x = this.currentRoom.x + this.TILE_SIZE;
          break;      
        default:
          break;
      }

    }
    this.currentRoom =this.createRoom(x,y, direction);
  },
  rotateRoom: function() {
    console.log('rotate');
    this.worldgroup.rotation += Math.PI/2;
  },
  render: function() {
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
    
    //this.game.debug.spriteInfo(this.worldgroup.children[0],32,128+0*32)
  },
  createRoom: function(x,y, direction) {
    let room = this.worldgroup.children.find((r)=>r.x==x && r.y==y);

    if (!room) {
      let frame = this.game.rnd.integerInRange(0,19);
      room = new D100Dungeon.Room(this, x,y, frame, this.roomData[frame.toString()],direction );
      room.anchor.setTo(0.5);
      this.worldgroup.add(room);   
                
    }

    return room;
  }
}