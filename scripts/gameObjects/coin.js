import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
class Coin extends BaseGameObject
{
    name = "Coin"
    reactToCollision = function(collidingObject)
    {
        if(collidingObject.name === "Player")
        {
            this.active = false;
            global.score++;
            console.log(global.score)
            global.coinSound.pause();
            global.soundManager.play("coinSound");
        }
    }
    constructor(x,y,width,height)
    {
        super(x,y,width,height)
        this.loadImages(["./assets/seed_with_outline.png"])
    }
}
export{Coin};