;(function(){
    function Tile(biom, border, isHasRoad, isHasRiver)
    {
        this.biom = biom;
        this.border = border;
        this.isHasRoad = isHasRoad;
        this.isHasRiver = isHasRiver;

        this.packToUINT16 = function()
        {
            var result = 0;
            result = ((result & 0xFFF0) | (this.biom   & 0x000F));
            result = ((result & 0xFF0F) | ((this.border << 4) & 0x00F0));

            var road = 0;
            if(this.isHasRoad) road = 1;
            result = ((result & 65279)  | ((road << 8) & 256));
            var river = 0;
            if(this.isHasRiver) river = 1;
            result = ((result & 65023)  | ((river << 9) & 512));

            return result;
        };
    }
    function createTileFromUINTValue(val)
    {
        var biom = val & 0x000F;
        var border = ((val & 0x00F0) >> 4 );
        var isHasRoad  = ((val & 256) >> 8 );
        var isHasRiver = ((val & 512) >> 9 );

        return new Tile(biom, border, isHasRoad, isHasRiver);
    }
    function getTileNumberInTileSetFromUINT(tileVal, tileSetWidth)
    {
        var biom = tileVal & 0x000F;
        var border = ((tileVal & 0x00F0) >> 4 );

        return biom * tileSetWidth + border;
    }

    Tile.Bioms = {};
    Tile.Bioms.GRASS = 0;
    Tile.Bioms.DESERT = 1;
    Tile.Bioms.SNOW = 2;
    Tile.Bioms.WATER = 3;
    Tile.Bioms.LAVA = 4;
    Tile.Bioms.WARFOG = 5;

    Tile.Borders = {};
    Tile.Borders.NONE = 0;
    Tile.Borders.H_A = 1;
    Tile.Borders.H_B = 2;
    Tile.Borders.V_A = 3;
    Tile.Borders.V_B = 4;
    Tile.Borders.C_DR_A = 5;
    Tile.Borders.C_DR_B = 6;
    Tile.Borders.C_DL_A = 7;
    Tile.Borders.C_DL_B = 8;
    Tile.Borders.C_UR_A = 9;
    Tile.Borders.C_UR_B = 10;
    Tile.Borders.C_UL_A = 11;
    Tile.Borders.C_UL_B = 12;

    Tile.createTileFromUINTValue = createTileFromUINTValue;
    Tile.getTileNumberInTileSetFromUINT = getTileNumberInTileSetFromUINT;
    
    window.Tile = Tile;
}());