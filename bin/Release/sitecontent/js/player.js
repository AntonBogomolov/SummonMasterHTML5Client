;(function(){
    function Player(params)
    {
        var gameManager = getGameManager();
        var metrics = getMetrics();
        
        this.name = params.name;
        this.key  = params.key;
        this.creature = params.creature;
        this.movableObject = params.movableObject;
        
        var layer = gameManager.instances[0].tileMap.layers[0];
        var spriteX = layer.getTileX(movableObject.col) + metrics.tileCenterX;
        var spriteY = layer.getTileY(movableObject.row) + metrics.tileCenterY;
        this.sprite = gameManager.game.add.sprite(spriteX, spriteY, "shPlayer");
         
    }
    window.Player = Player;
}());