var D100Dungeon = D100Dungeon || {};

D100Dungeon.BootState = {
  init: function () {
    this.game.stage.backgroundColor = "#ccc";

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAllVertically = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },
  preload: function () {
  },
  create: function () {
    this.state.start('Preload');
  }

};