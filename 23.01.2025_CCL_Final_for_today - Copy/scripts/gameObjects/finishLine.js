import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class FinishLine extends BaseGameObject{
    name = "Finishline";

    reactToCollision = function(collidingObject)
    {
        if(collidingObject.name === "Player")
        {
            console.log("finish")
            global.gameWon();
        }
    }

    constructor(x,y,width,height)
    {
        super(x,y,width,height);
        this.loadImages(["./assets/rocket.png"])
    }
}
export{FinishLine}