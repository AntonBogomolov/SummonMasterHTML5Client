;(function(){
    function gameRequests()
    {

    }
    
    function showInstancesList(obj)
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
        }
    }
    
    function showInstanceInfo(id, obj)
    {
  
    }

    function gameGetMapData(id, ldCorner, ruCorner)
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
              alert(msg.byteLength);
              var obj = CBOR.decode(msg);
              //alert(JSON.stringify(obj, null, 4));
              return obj;	
          },
        error: function (msg) 
          {  		
              alert("error");	
              return '';
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
            //alert(JSON.stringify(obj, null, 4));
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

    gameRequests.gameGetMapData = gameGetMapData;
    gameRequests.gameGetInstancesList = gameGetInstancesList;
    window.gameRequests = gameRequests;
}());