import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Lava extends BaseGameObject{
    name = "Lava";

    constructor(x,y,width,height)
    {
        super(x,y,width,height);
        this.loadImages(["./assets/lava2.jpg"]);
    }

    reactToCollision = function( collidingObject)
    {
        if(collidingObject.name === "Player")
        {
            // global.playerObject.active = false;
            collidingObject.lifes -= 1;
            global.restartGame()
        }
    }
}
export {Lava};