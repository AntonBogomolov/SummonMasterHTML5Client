;(function(){
    function gameRequests()
    {

    }
    
    function initInstancesList(obj)
    {
        for (var index in obj.result)
        {
            var elem  = obj.result[index];
            var description = elem.description;
            var id = elem.objectId;
            var width  = elem.map.width;
            var height = elem.map.height;

            $("#instances").append('<div id="inst'+id+'"><p> id: ' + id + ' descr: '+description+'</p></div>');
            $("#inst"+id).append('<div class="instanceInfo"><p>width:'+width+' height:'+height+'</p></div>');
            $("#inst"+id).append('<div class="instanceControls"><input type="button" value="load" onclick="window.gameManager.loadInstance('+id+')"/></div>');
            
            var gameManager = getGameManager();
            var instance = new window.Instance(id, width, height, description);
            gameManager.instances.push(instance);
        }
    }
    
    function showInstanceInfo(id, obj)
    {
  
    }

    function gameGetMapData(id, ldCorner, ruCorner, callback)
    {
        var comUrl = 'http://summonmastercore.com?command=getMapData';	
        var userId = $("input[name='user_id']").val();
        var postData = '&user_id='+userId+'&map_id='+id+'&ldX='+ldCorner.x+'&ldY='+ldCorner.y+'&ruX='+ruCorner.x+'&ruY='+ruCorner.y;
    
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
              callback(obj);
              return;	
          },
        error: function (msg) 
          {  		
              alert("error");	
              return;
          }
        });
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
              //alert(JSON.stringify(obj, null, 4));
              //showInstanceInfo(id, obj);
              return msg;	
          },
        error: function (msg) 
          {  		
              alert("error");	
              return '';
          }
        });
    }
    
    function gameGetInstancesList(callback)
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
            //alert(JSON.stringify(obj, null, 4));
            initInstancesList(obj);
            callback();
            return;	
          },
          error: function (msg) 
          {  		
            alert("error");	
            return;
          }
        });
    }

    gameRequests.gameGetMapData = gameGetMapData;
    gameRequests.gameGetInstancesList = gameGetInstancesList;
    window.gameRequests = gameRequests;
}());