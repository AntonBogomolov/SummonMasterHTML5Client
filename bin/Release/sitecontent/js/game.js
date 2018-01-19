;(function(){
	var game = {};
	var cursors;

	function preload()
	{
		game.load.image('tiles', 'tiles.png');
		game.load.spritesheet('shPlayer', 'ghost.png',   100, 90, 1);
		game.load.spritesheet('shMon', 'minotaurus.png', 120, 95, 1);
	};
	function create()
	{	
		var gameManager = getGameManager();
		
		cursors = game.input.keyboard.createCursorKeys();
		game.input.onDown.add(gameManager.onClick, gameManager);

		var callbackFunc = gameManager.onInstancesInfoLoaded.bind(gameManager);
		GameManager.requests.gameGetInstancesList(callbackFunc);
	};
	function update()
	{
		if (cursors.left.isDown)
		{
			game.camera.x-= 5;
		}
		else if (cursors.right.isDown)
		{
			game.camera.x+= 5;
		}
		if (cursors.up.isDown)
		{
			game.camera.y-= 5;
		}
		else if (cursors.down.isDown)
		{
			game.camera.y+= 5;
		}
	};

	function Metrics()
	{
		this.tileWidth = 32;
		this.tileHeight = 32;
		this.tileCenterX = this.tileWidth  / 2;
		this.tileCenterY = this.tileHeight / 2;
		
		this.onAcceptServerMetrics = function(serverMetrics)
		{
			alert(serverMetrics.result.cellWidth);
		};

		var callbackFunc = this.onAcceptServerMetrics.bind(this);
		GameManager.requests.gameGetMetrics(callbackFunc);
	};

	function GameManager(width, height)
	{	
		game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-example',
		{ preload: preload, create: create, update: update });
		this.game = game;
		this.player = {};
		this.activeInstance = {};

		this.instances = new Array();

		this.onInstancesInfoLoaded = function(obj)
		{
			for (var index in obj.result)
			{
				var elem  = obj.result[index];
				var description = elem.description;
				var id = elem.objectId;
				var width  = elem.map.width;
				var height = elem.map.height;

				var instance = new window.Instance(id, width, height, description);
				this.instances.push(instance);
			}

			if(this.instances.length > 0)
			{
				this.instances[0].loadInstance(null);
				this.activeInstance = this.instances[0];
			}
		};
		this.onClick = function()
		{
			if(this.instances.length > 0)
			{
				var gameManager = getGameManager();

				var layer = this.instances[0].tileMap.layers[0];
				ldCorner = {};
				ldCorner.x = layer.getTileX(game.input.activePointer.worldX) - 10;
				ldCorner.y = layer.getTileY(game.input.activePointer.worldY) - 10;

				ruCorner = {};
				ruCorner.x = layer.getTileX(game.input.activePointer.worldX) + 10;
				ruCorner.y = layer.getTileY(game.input.activePointer.worldY) + 10;

				this.instances[0].updateMapRegion(ldCorner, ruCorner);
			}
		};
		this.onAcceptedUserPlayer = function(playerJSON)
		{
			player = new window.Player(playerJSON.result);
			$("input[name='playerKey']").val(player.key);
		};
		this.onLogoutUserPlayer = function(jsonResult)
		{
			alert(jsonResult.result.key);
			$("input[name='playerKey']").val("");
		}
	}

	GameManager.requests = window.gameRequests;
	GameManager.game = game;

	window.Metrics = Metrics;
	window.GameManager = GameManager;
	window.types.gameManager = GameManager;
}());