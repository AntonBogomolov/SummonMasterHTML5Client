;(function(){
    function gameRequests()
    {

    }
    
/*     function initInstancesList(obj) {
        for (var index in obj.result) {
            var elem = obj.result[index];
            var description = elem.description;
            var id = elem.objectId;
            var width = elem.map.width;
            var height = elem.map.height;

            $("#instances").append('<div id="inst' + id + '"><p> id: ' + id + ' descr: ' + description + '</p></div>');
            $("#inst" + id).append('<div class="instanceInfo"><p>width:' + width + ' height:' + height + '</p></div>');
            $("#inst" + id).append('<div class="instanceControls"><input type="button" value="load" onclick="window.gameManager.loadInstance(' + id + ')"/></div>');

            var gameManager = getGameManager();
            var instance = new window.Instance(id, width, height, description);
            gameManager.instances.push(instance);
        }
    } */
    
    function gameGetPlayer(instanceId, playerKey, callback)
    {
        var comUrl = 'http://summonmastercore.com?command=getPlayer';	
        var userId = $("input[name='user_id']").val();
        var postData = '&user_id='+userId+'&key='+playerKey;
    
        doAjaxRequest(comUrl, postData, "binary", "arraybuffer", callback);
    }
    function gameCreatePlayer(instanceId, playerParams, callback)
    {
        var comUrl = 'http://summonmastercore.com?command=createPlayer';	
        var userId = $("input[name='user_id']").val();
        var postData = '&user_id='+userId+'&name='+playerParams.name;
    
        doAjaxRequest(comUrl, postData, "binary", "arraybuffer", callback);
    }
    function gameLoginPlayer(instanceId, playerKey, instanceId, callback)
    {
        var comUrl = 'http://summonmastercore.com?command=loginPlayer';	
        var userId = $("input[name='user_id']").val();
        var postData = '&user_id='+userId+'&key='+playerKey+'&instance_id='+instanceId;
    
        doAjaxRequest(comUrl, postData, "binary", "arraybuffer", callback);
    }
    function gameLogoutPlayer(instanceId, playerKey, callback)
    {
        var comUrl = 'http://summonmastercore.com?command=logoutPlayer';	
        var userId = $("input[name='user_id']").val();
        var postData = '&user_id='+userId+'&key='+playerKey;
    
        doAjaxRequest(comUrl, postData, "binary", "arraybuffer", callback);
    }

    function gameGetMapData(id, ldCorner, ruCorner, callback)
    {
        var comUrl = 'http://summonmastercore.com?command=getMapData';	
        var userId = $("input[name='user_id']").val();
        var postData = '&user_id='+userId+'&map_id='+id+'&ldX='+ldCorner.x+'&ldY='+ldCorner.y+'&ruX='+ruCorner.x+'&ruY='+ruCorner.y;
    
        doAjaxRequest(comUrl, postData, "binary", "arraybuffer", callback);
    }

    function gameGetMapObject(instanceId, objectId, callback)
    {
        var comUrl = 'http://summonmastercore.com?command=getMapObject';	
        var userId = $("input[name='user_id']").val();
        var postData = '&user_id='+userId+'&instance_id='+instanceId+'&object_id='+objectId;
    
        doAjaxRequest(comUrl, postData, "binary", "arraybuffer", callback);
    }

    function gameGetMapObjects(instanceId, ldCorner, ruCorner, filter, callback)
    {
        var comUrl = 'http://summonmastercore.com?command=getMapObjects';	
        var userId = $("input[name='user_id']").val();
        var postData = '&user_id='+userId+'&instance_id='+instanceId+'&ldX='+ldCorner.x+'&ldY='+ldCorner.y+'&ruX='+ruCorner.x+
                        '&ruY='+ruCorner.y+'&filter_mode='+filter.mode+'&filter_tags='+filter.getIdsStr();
    
        doAjaxRequest(comUrl, postData, "binary", "arraybuffer", callback);
    }

    function gameSetPathTarget(instanceId, objectId, target, callback)
    {
        var comUrl = 'http://summonmastercore.com?command=getMapObjects';	
        var userId = $("input[name='user_id']").val();
        var postData = '&user_id='+userId+'&instance_id='+instanceId+'&object_id='+objectId+'&targetX='+target.x+'&targetY='+target.y;
    
        doAjaxRequest(comUrl, postData, "binary", "arraybuffer", callback);
    }

    function gameGetInstanceInfo(id, callback)
    {
        var comUrl = 'http://summonmastercore.com?command=getInstanceDescription';	
        var userId = $("input[name='user_id']").val();
        var postData = '&user_id='+userId+'&instance_id='+id;
    
        doAjaxRequest(comUrl, postData, "binary", "arraybuffer", callback);
    }
    
    function gameGetInstancesList(callback)
    {
        var comUrl = 'http://summonmastercore.com?command=getInstancesList';	
        var userId = $("input[name='user_id']").val();
        var postData = '&user_id='+userId;
                        
        doAjaxRequest(comUrl, postData, "binary", "arraybuffer", callback);
    }

    function doAjaxRequest(requestURL, requestData, dataRequestType, respType, callback)
    {
        var isBinary = dataRequestType == "binary";

        $.ajax({
            type: 'POST',
            url: requestURL,
            data: requestData, 
            dataType: dataRequestType,
            processData: !isBinary,
            responseType: respType,
            success: function(msg)
            {  
                if(isBinary)
                {
                    var obj = CBOR.decode(msg);
                    callback(obj);
                }
                else
                { 
                    callback(msg);
                }
                return;	
            },
            error: function (msg) 
            {  		
                alert("error");	
                return;
            }
        });
    }

    gameRequests.gameCreatePlayer = gameCreatePlayer;
    gameRequests.gameGetMapObject = gameGetMapObject;
    gameRequests.gameGetMapObjects = gameGetMapObjects;
    gameRequests.gameGetMapData = gameGetMapData;
    gameRequests.gameLoginPlayer = gameLoginPlayer;
    gameRequests.gameLogoutPlayer = gameLogoutPlayer;
    gameRequests.gameGetPlayer = gameGetPlayer;
    gameRequests.gameSetPathTarget = gameSetPathTarget;
    gameRequests.gameGetInstancesList = gameGetInstancesList;

    window.gameRequests = gameRequests;
}());