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

function showInstancesList(obj)
{
	for (var index in obj.result)
	{
		var elem  = obj.result[index];
		var description = elem.description;
		var id = elem.objectId;
		$("#instances").append('<div id="inst'+id+'" onclick="gameGetInstanceInfo('+id+')"><p> id: ' + id + ' descr: '+description+'</p></div>');
	}
}

function showInstanceInfo(id, obj)
{
	var elem  = obj.result;
	var width  = elem.width;
	var height = elem.height;

	$("#inst"+id).append('<div class="instanceInfo"><p>width:'+width+' height:'+height+'</p></div>');
	$("#inst"+id).append('<div class="instanceControls"><input type="button" value="load" onclick="loadInstance()"/></div>');
}

function gameGetInstanceInfo(id)
{
	var comUrl = 'http://summonmastercore.com?command=getInstanceDescription';	
	var userId = $("input[name='user_id']").val();
	var postData = '&user_id='+userId+'&instance_id='+id;

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
  		showInstanceInfo(id, obj);
  		return msg;	
  	},
	error: function (msg) 
  	{  		
  		alert("error");	
  		return '';
  	}
	});
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
  		showInstancesList(obj);
  		return msg;	
  	},
	error: function (msg) 
  	{  		
  		alert("error");	
  		return '';
  	}
	});
}