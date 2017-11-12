;(function(){
    function Instance(id, width, height, description)
    {
        this.id = id;
        this.width = width;
        this.height = height;
        this.description = description;

        if(this.width  < 0 ) this.width  = 0;
        if(this.height < 0 ) this.height = 0;
        this.tileData = null;

        this.loadInstance = function(player)
        {
            var ldCorner = {x : 490,  y : 490};
            var ruCorner = {x : 510, y : 510};
            
            var callbackFunc = this.loadInstanceCallback.bind(this);
            window.gameRequests.gameGetMapData(id, ldCorner, ruCorner, callbackFunc);
        };
        this.loadInstanceCallback = function(mapData)
        {
            this.tileData = new Array(this.width * this.height);
            alert('instance: ' + this.id + ' - loaded');
           

            var tileData  = mapData.tileData; 
            var blockData = mapData.blockData;

            var tile = new Tile(Tile.Bioms.LAVA, Tile.Borders.V_A);
            alert(tile.biom);
            alert(tile.border);
            var tileVal = tile.packToUINT8();
            alert(tileVal);
            var tileFromVal = Tile.createTileFromUINTValue(tileVal);
            alert(tileFromVal.biom);
            alert(tileFromVal.border);

            //alert(tileData);
            //alert(blockData);
        
        };
    }

    window.Instance = Instance;
}());