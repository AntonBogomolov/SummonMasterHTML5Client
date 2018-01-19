;(function(){
    function MapObject(params)
    {
        this.col        = params.col;
        this.row        = params.row;
        this.position   = params.position;
        this.object     = params.object;
        this.layerId    = params.layerId;
        this.instanceId = params.instanceId;
    }

    function SpriteDescriptor(name, width, height)
    {
        this.name = name;
    }

    window.MapObject = MapObject;
}());
