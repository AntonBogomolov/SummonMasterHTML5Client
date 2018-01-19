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
        this.patchStrTileData = function(startRow, endRow)
        {
            if(startRow > endRow ) return this.cachedStringData;

            var start = 0;
            var pos = 0;
            if(startRow <= this.width / 2)
            {
                for(var i = 0; i < startRow; i++)
                {
                    pos = this.cachedStringData.indexOf('\n', pos + 1);
                    if(pos == -1) break;
                }
            }
            else
            {
                pos = this.cachedStringData.length;
                for(var i = 0; i < startRow; i++)
                {
                    pos = this.cachedStringData.lastIndexOf('\n', pos - 1);
                    if(pos == -1) break;
                }
            }
            if(pos != -1) start = pos + 1;

            var end = 0;
            pos = 0;
            if(endRow <= this.width / 2)
            {
                for(var i = 0; i < endRow; i++)
                {
                    pos = this.cachedStringData.indexOf('\n', pos + 1);
                    if(pos == -1) break;
                }
            }
            else
            {
                pos = this.cachedStringData.length;
                for(var i = 0; i < endRow; i++)
                {
                    pos = this.cachedStringData.lastIndexOf('\n', pos - 1);
                    if(pos == -1) break;
                }
            }
            if(pos != -1) end = pos + 1;
            
            var strPart1 = this.cachedStringData.substr(0, start);
            var strPart3 = this.cachedStringData.substr(end + 1);
            var strPart2 = '';
            for(var i = 0; i < end - start; i++ )
            {
                strPart2 += Tile.getTileNumberInTileSetFromUINT(this.tileData[i], 20);
                if((i+1) % this.width == 0) strPart2 += '\n';
                else strPart2 += ',';
            }
            this.cachedStringData = strPart1 + strPart2 + strPart3;

            this.isStrCached = true;
            return this.cachedStringData;
        };

        this.initTileMap = function(mapData)
        {
            this.tileData  = new Array(this.width * this.height);
            this.blockData = new Array(this.width * this.height);

            var warFogTile = new Tile(Tile.Bioms.WARFOG, Tile.Borders.NONE);
            var warFogVal  = warFogTile.packToUINT16();
            var currRow = 0;
            var currCol = 0;
            var counter = 0;
            for(var i = 0; i < this.width * this.height; i++ )
            {
                currRow = Math.floor(i / width);
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

            var currCol = 0;
            var currRow = 0;
            var counter = 0;

            this.map.setPreventRecalculate(true);
            for(var i = start; i <= end; i++ )
            {
                currCol = i % width;
                currRow = Math.floor(i / width);
                if( currCol >= mapData.ldCorner.x && currCol <= mapData.ruCorner.x)
                {
                    this.tileData[i]  = mapData.tileData[counter];
                    if(this.blockData) this.blockData[i] = mapData.blockData[counter];

                    var currTile = Tile.getTileNumberInTileSetFromUINT(this.tileData[i], 20);
                    this.map.putTile(currTile, Number(currCol), Number(currRow), this.layers[0]);

                    counter++;
                }
            }
            this.map.setPreventRecalculate(false);
            this.isStrCached = false;
 
            var gameManager = getGameManager();
            var game = gameManager.game;
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
            window.gameRequests.gameGetMapData(this.id, ldCorner, ruCorner, callbackFunc);
        };
        this.loadInstanceCallback = function(mapData)
        {
            this.tileMap.initTileMap(mapData.result);
        };

        this.updateMapRegion = function(ldCorner, ruCorner)
        {
            if(ldCorner.x < 0) ldCorner.x = 0;
            if(ldCorner.y < 0) ldCorner.y = 0;
            if(ruCorner.x < 0) ruCorner.x = 0;
            if(ruCorner.y < 0) ruCorner.y = 0;

            if(ldCorner.x >= this.width )  ldCorner.x = this.width;
            if(ldCorner.y >= this.height ) ldCorner.y = this.height;
            if(ruCorner.x >= this.width )  ruCorner.x = this.width;
            if(ruCorner.y >= this.height ) ruCorner.y = this.height;
            
            var callbackFunc = this.updateMapRegionCallback.bind(this);
            window.gameRequests.gameGetMapData(id, ldCorner, ruCorner, callbackFunc);
        }
        this.updateMapRegionCallback = function(mapData)
        {
            this.tileMap.updateRegion(mapData.result);
        }
    }

    window.Instance = Instance;
}());