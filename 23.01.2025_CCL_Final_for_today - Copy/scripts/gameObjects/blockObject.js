import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class BlockObject extends BaseGameObject {
    name = "BlockObject";
    blockGravityForces = true;
    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Player") {
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
            
        }
    }

    constructor (x, y, width, height,blockType) {
        super(x, y, width, height);
        if(blockType === 1)
            this.loadImages(["./assets/platform_with_columns_2.png"]);
        else if(blockType === 2)
            this.loadImages(["./assets/blockobject1.png"]);
    }
}

export {BlockObject};