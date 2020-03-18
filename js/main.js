var D100Dungeon = D100Dungeon || {};

D100Dungeon.game = new Phaser.Game(600,600, Phaser.AUTO);

D100Dungeon.game.state.add('Boot', D100Dungeon.BootState);
D100Dungeon.game.state.add('Preload', D100Dungeon.PreloadState);
D100Dungeon.game.state.add('Game', D100Dungeon.GameState);

D100Dungeon.game.state.start('Boot');
