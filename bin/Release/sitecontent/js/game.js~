/* GLOBAL OBJECTS */

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

/* FUNCTIONS */

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

function gameGetInstancesList()
{
	var comUrl = 'http://summonmastercore.com?command=getInstancesList';	
	var userId = $("input[name='user_id']").val();
	var postData = '&user_id='+userId;
					
	$.ajax({
	type: 'POST',
  	url: comUrl,
  	data: postData, 
  	dataType: "binary",
  	processData: false,
  	responseType:'arraybuffer',
  	success: function(msg)
  	{  
  		var obj = CBOR.decode(msg);
  		alert(JSON.stringify(obj, null, 4));
  		return msg;	
  	},
	error: function (msg) 
  	{  		
  		alert(msg);	
  		alert("error");	
  		return '';
  	}
	});
}