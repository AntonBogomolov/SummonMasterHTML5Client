;(function(){
    function Player(params)
    {
        this.name = params.name;
        this.key  = params.key;
        this.creature = params.creature;
        this.movableObject = params.movableObject;
    }
    window.Player = Player;
}());