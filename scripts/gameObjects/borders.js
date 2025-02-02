import { BaseGameObject } from "./baseGameObject.js";

class Border extends BaseGameObject 
{
    moveWithPlayer = true;

    reactToCollision = function(collidingObject)
    {
        if(collidingObject.name === "Player")
        {
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
        }
    }
    constructor(x,y,width,height)
    {
        super(x,y,width,height)
        this.loadImages(["./images/wall.jpg"]);
    }
}
export {Border}