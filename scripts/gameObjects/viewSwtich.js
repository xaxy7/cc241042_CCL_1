import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class ViewSwitch extends BaseGameObject
{
    name = "viewSwitch";
    moveWithPlayer = false;
    blockGravityForces = false;
    direction;
    draw = function () {
        // global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    constructor(x,y,width,height, z)
    {

        super(x,y,width,height)
        this.direction = z;
    }
}
export {ViewSwitch}