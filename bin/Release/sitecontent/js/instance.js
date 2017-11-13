;(function(){
    function TileMap(width, height)
    {
        this.width = width;
        this.height = height;
        this.tileData = new Array();
        this.blockData = new Array();
        this.map = null;
        this.layers = new Array();

        this.cachedStringData = '';
        this.isStrCached = false;

        this.tileDataToString = function()
        {
            if(this.isStrCached === true) return this.cachedStringData;

            this.cachedStringData = '';
            for(var i = 0; i < this.width * this.height; i++ )
            {
                this.cachedStringData += Tile.getTileNumberInTileSetFromUINT(this.tileData[i], 20);
                if((i+1) % this.width == 0) this.cachedStringData += '\n';
                else this.cachedStringData += ',';
            }
            this.isStrCached = true;
            return this.cachedStringData;
        };
        this.patchStrTileData = function(start, end)
        {


            this.isStrCached = true;
            return this.cachedStringData;
        };

        this.initTileMap = function(mapData)
        {
            this.tileData  = new Array(this.width * this.height);
            this.blockData = new Array(this.width * this.height);

            var warFogTile = new Tile(Tile.Bioms.WARFOG, Tile.Borders.NONE);
            var warFogVal  = warFogTile.packToUINT8();
            var currRow = 0;
            var currCol = 0;
            var counter = 0;
            for(var i = 0; i < this.width * this.height; i++ )
            {
                currRow = i / width;
                currCol = i % width;
                if( currRow >= mapData.ldCorner.y && currRow <= mapData.ruCorner.y &&
                    currCol >= mapData.ldCorner.x && currCol <= mapData.ruCorner.x)
                {
                    this.tileData[i]  = mapData.tileData[counter];
                    this.blockData[i] = mapData.blockData[counter];
                    counter++;
                }
                else
                {
                    this.tileData[i]  = warFogVal;
                    this.blockData[i] = true; 
                }
            }
            
            var gameManager = getGameManager();
            var game = gameManager.game;

            game.cache.addTilemap('dynamicMap', null, this.tileDataToString(), Phaser.Tilemap.CSV);
            //game.load.tilemap('dynamicMap', null, this.tileDataToString(), Phaser.Tilemap.CSV );
            this.map = game.add.tilemap('dynamicMap', 32, 32, this.width, this.height);
            this.map.addTilesetImage('tiles', 'tiles', 32, 32);
    
            var layer = this.map.createLayer(0);
            layer.resizeWorld();
            this.layers.push(layer);
        };

        this.updateRegion = function(mapData)
        {
            var start = mapData.ldCorner.y * this.width + mapData.ldCorner.x;
            var end   = mapData.ruCorner.y * this.width + mapData.ruCorner.x;

            var currRow = 0;
            var currCol = 0;
            var counter = 0;
            for(var i = start; i <= end; i++ )
            {
                currRow = i / width;
                currCol = i % width;
                if( currCol >= mapData.ldCorner.x && currCol <= mapData.ruCorner.x)
                {
                    this.tileData[i]  = mapData.tileData[counter];
                    if(this.blockData) this.blockData[i] = mapData.blockData[counter];
                    counter++;
                }
            }
            this.patchStrTileData(start, end);
            
            var gameManager = getGameManager();
            var game = gameManager.game;
            game.cache.addTilemap('dynamicMap', null, this.tileDataToString(), Phaser.Tilemap.CSV);
        };
    }

    function Instance(id, width, height, description)
    {
        this.id = id;
        this.width = width;
        this.height = height;
        this.description = description;
        
        if(this.width  < 0 ) this.width  = 0;
        if(this.height < 0 ) this.height = 0;
        this.tileMap = new TileMap(width, height);

        this.loadInstance = function(player)
        {
            var ldCorner = {x : 5,  y : 5};
            var ruCorner = {x : 15, y : 15};
            
            var callbackFunc = this.loadInstanceCallback.bind(this);
            window.gameRequests.gameGetMapData(id, ldCorner, ruCorner, callbackFunc);
        };
        this.loadInstanceCallback = function(mapData)
        {
            this.tileMap.initTileMap(mapData.result);
        };
    }

    window.Instance = Instance;
}());