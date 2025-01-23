import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Projectile extends BaseGameObject
{
    moveWithPlayer = true;
    xVelocity = 500;
    direction = 1;
    name = "Projectile"

    update = function()
    {
        if(this.projectileType === 1)
        {
            this.x += this.xVelocity * this.direction * global.deltaTime;
            if(Math.abs(this.xShot - this.x) > 1000)
            {
                this.active = false;
            }
            console.log("projectile");
        }

    }
    reactToCollision = function(collidingObject)
    {
        if(collidingObject.name ==="Enemy" && this.projectileType ===1)
        {   
            global.allHpBars.forEach(element => {
                // console.log(element.id, collidingObject.id)
                if(element.id === collidingObject.id)
                {

                    collidingObject.enemyHealth--;
                    // console.log(collidingObject.enemyHealth);

                    if(collidingObject.enemyHealth === 0)
                    {
                        collidingObject.active = false
                        element.active = false;
                        element.hits = 0;
                    }
                    else
                    {
                        element.hits++;
                        element.switchCurrentSprites(element.hits, element.hits)
                    }
                    console.log(element.hits)

                }
            });
        
            console.log("hitcheck")
            // collidingObject.active = false;
            this.active = false;
        }
        if(collidingObject.name ==="BlockObject")
        {
            this.active = false;
        }
        if(collidingObject.name === "Player" && this.projectileType ===2)
        {
            this.active = false;
            collidingObject.lifes--;
        }
    }
    constructor(x,y,width,height, projectileType)
    {
        super(x,y,width,height)
        if(global.playerDirection == "left")
            this.direction = -1;
        else if(global.playerDirection == "right")
            this.direction = 1;
        this.xShot = x;
        this.projectileType = projectileType;
        this.loadImages(["./assets/projectile_white.png"])
    }
}
export {Projectile};