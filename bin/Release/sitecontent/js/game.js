;(function(){
	var game = {};
	var cursors;

	function preload()
	{
		game.load.image('einstein', 'ra_einstein.png');
		game.load.image('tiles', 'tiles.png');
	};
	function create()
	{
		//var s = game.add.sprite(80, 0, 'einstein');
		//s.rotation = 0.5;

		cursors = game.input.keyboard.createCursorKeys();
			
		var gameManager = getGameManager();
		var callbackFunc = gameManager.onInstancesInfoLoaded.bind(gameManager);
		GameManager.requests.gameGetInstancesList(callbackFunc);
	};
	function update()
	{
		if (cursors.left.isDown)
		{
			game.camera.x--;
		}
		else if (cursors.right.isDown)
		{
			game.camera.x++;
		}
		if (cursors.up.isDown)
		{
			game.camera.y--;
		}
		else if (cursors.down.isDown)
		{
			game.camera.y++;
		}
	};

	function GameManager(width, height)
	{	
		game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-example',
		{ preload: preload, create: create, update: update });
		this.game = game;

		this.instances = new Array();

		this.onInstancesInfoLoaded = function()
		{
			if(this.instances.length > 0)
			{
				this.instances[0].loadInstance(null);
			}
		};
	}

	GameManager.requests = window.gameRequests;
	GameManager.game = game;

	window.GameManager = GameManager;
	window.types.gameManager = GameManager;
}());