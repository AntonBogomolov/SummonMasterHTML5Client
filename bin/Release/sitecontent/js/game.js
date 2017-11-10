;(function(){

	var game = new Phaser.Game(200, 150, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

	function gameManager()
	{	

	}
	function preload() {

		//  You can fill the preloader with as many assets as your game requires

		//  Here we are loading an image. The first parameter is the unique
		//  string by which we'll identify the image later in our code.

		//  The second parameter is the URL of the image (relative)
		game.load.image('einstein', 'ra_einstein.png');

	}
	function create() {

		//  This creates a simple sprite that is using our loaded image and
		//  displays it on-screen
		var s = game.add.sprite(80, 0, 'einstein');
		s.rotation = 0.5;
	}

	function loadInstance(id)
	{
		var ldCorner = {x : 10,  y : 10};
		var ruCorner = {x : 900, y : 1100};
		this.requests.gameGetMapData(id, ldCorner, ruCorner);
		//alert(JSON.stringify(result, null, 4));
	}

	gameManager.loadInstance = loadInstance;

	gameManager.requests = window.gameRequests;
	gameManager.game = game;
	window.gameManager = gameManager;
}());