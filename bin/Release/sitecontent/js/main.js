
function setVisibility(block, isVisible)
{
	if(isVisible) block.show();
	else block.hide();
}

function insertBlockAfter(newBlock, prevBlock) 
{
	$(newBlock).insertAfter(prevBlock);
}

function gotoPage(pageURI)
{
  location.href = pageURI;
}

function initVars() 
{
  gameManager = new window.GameManager(800, 600);
  metrics = new window.Metrics();
}

function getGameManager()
{
  return gameManager;
}
function getMetrics()
{
  return metrics;
}

function loginPlayer()
{
  var playerKey = $("input[name='playerKey']").val();
  
  var callbackFunc = gameManager.onAcceptedUserPlayer.bind(gameManager);
  window.GameManager.requests.gameLoginPlayer(gameManager.activeInstance.id, playerKey, callbackFunc);
}
function logoutPlayer()
{
  var playerKey = $("input[name='playerKey']").val();

  var callbackFunc = gameManager.onLogoutUserPlayer.bind(gameManager);
  window.GameManager.requests.gameLogoutPlayer(playerKey, callbackFunc);
}

function createPlayer()
{
  var playerName = $("input[name='playerName']").val();
  var playerParams = {};
  playerParams.name = playerName;

  var callbackFunc = gameManager.onAcceptedUserPlayer.bind(gameManager);
  window.GameManager.requests.gameCreatePlayer(playerParams, callbackFunc);
}

function initInstances()
{
  var callbackFunc = gameManager.onInstancesInfoLoaded.bind(gameManager);
  window.GameManager.requests.gameGetInstancesList(callbackFunc);
}

function loginUser()
{
  var login = $("input[name='login']").val();
  var pass  = $("input[name='pass']").val();
  var isNew = $("input[name='isNew']").is(':checked');

  var callbackFunc = onLoginUser;
  window.GameManager.requests.loginUser(login, pass, isNew, callbackFunc);
}
function logoutUser()
{
  var callbackFunc = onLogoutUser;
  window.GameManager.requests.logoutUser(callbackFunc);
}
function onLoginUser(msg)
{
  var obj = JSON.parse(msg);
  if(msg.length > 4 && obj.cookie != undefined && obj.cookie != "GUEST")
  {
    $("input[name='userSession']").val(obj.cookie);
    $("input[name='user_id']").val(obj.id);
    $("input[name='playerKey']").val(obj.key);
    $("#loginStatus").text("success");
  }
  else
  {
    $("#loginStatus").text("unsuccess");
  }
}
function onLogoutUser(msg)
{
  $("input[name='userSession']").val("");
  $("input[name='user_id']").val("");

  $("input[name='login']").val("");
  $("input[name='pass']").val("");
}

////////////////////////////////////////////////////////////////

String.prototype.insert = function(index, string) 
{
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

function escapeRegExp(string) 
{
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) 
{
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
	  
 //////////////////////////////////////////////////////////////////////////////////
 
 $.fn.center = function() 
 {
    this.css("position", "fixed");
    this.css("top", ($(window).height()/2 - this.height()/2) + "px");
    this.css("left", ($(window).width()/2 - this.width()/2) + "px");
    return this;
}

// use this transport for "binary" data type
$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
    {
        return {
            // create new XMLHttpRequest
            send: function(headers, callback){
		// setup all variables
      var xhr = new XMLHttpRequest(),
		url = options.url,
		type = options.type,
		async = options.async || true,
		// blob or arraybuffer. Default is blob
		dataType = options.responseType || "blob",
		data = options.data || null,
		username = options.username || null,
		password = options.password || null;
					
      xhr.addEventListener('load', function(){
			var data = {};
			data[options.dataType] = xhr.response;
			// make callback and send data
			callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
      });
 
      xhr.open(type, url, async, username, password);
				
		// setup custom headers
		for (var i in headers ) {
			xhr.setRequestHeader(i, headers[i] );
		}
				
      xhr.responseType = dataType;
      xhr.send(data);
      },
      abort: function(){
      	jqXHR.abort();
      }
     };
    }
});
jQuery.support.cors = true;

window.types = {};
var gameManager = null;
var metrics = null;

$(document).ready(
	function() 
	{		
		initVars();
	}
);