import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";



class Weapon extends BaseGameObject
{
    name = "Weapon";

    reactToCollision = function(collidingObject)
    {

        if(collidingObject.name === "Player" )
        {
            // if(weaponType === 1)
            this.active = false;
            global.currentWeapon = this.weaponType;

        }

    }
    constructor(x, y,width, height, weaponType)
    {
        super(x,y,width,height);
        this.weaponType = weaponType
    
        if(this.weaponType == 1)
        {
            this.loadImages(["./assets/power_up_with_outline.png"]);
        }
 
    }

}
export {Weapon};