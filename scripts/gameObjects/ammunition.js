import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";


class Ammunition extends BaseGameObject{
    name = "Ammuition"

    reactToCollision = function(collidingObject)
    {
        if(collidingObject.name === "Player")
        {
            this.active = false;
            collidingObject.ammoCount  =12;
            global.reload.pause();
            global.soundManager.play("reload");

        }
    }
    constructor(x,y,width,height)
    {
        super(x,y,width,height)
        this.loadImages(["./assets/ammobox.png"])
    }

}
export{Ammunition}