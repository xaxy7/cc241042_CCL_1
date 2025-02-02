import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import {Projectile} from "./projectile.js";
class Player extends BaseGameObject {
    name = "Player";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;
    moveWithPlayer = false;
    counter = 0;
    lifes = 3;
    previousLifes = this.lifes; 
    ammoCount  = 12;
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.1,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };
    // reactToCollision = function (collidingObject)   {
    //     if (collidingObject.name == "viewSwitch") {
    //         this.y = this.previousY - this.physicsData.prevFallingVelocity * collidingObject.direction;
    //         console.log(collidingObject.direction)

    //         global.allGameObjects.forEach(gameObject => {
    //             if(gameObject.moveWithPlayer === true)
    //             {
    //                 gameObject.y -= this.physicsData.prevFallingVelocity * collidingObject.direction;
    //                 // console.log(this.previousY - this.y)
    //                 console.log(this.physicsData.prevFallingVelocity)
    
    //             }
    //         });
    //         console.log("collisonReact");
    //     }

    // }
    // reactToCollision = function(collidingObject)
    // {
    //     if(collidingObject.name === "Enemy")
    //     {
    //         this.lifes -= 1;
    //     }
    // }
    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        // let bounds = {
        //     left: this.x +10,
        //     right: this.x + this.width -10,
        //     top: this.y +10 ,
        //     bottom: this.y + this.height -3
        // }
        return bounds;
    }
    useWeapon = function()
    {
        if(global.weaponFire ===true)
        {

            if(global.currentWeapon === 1 && this.counter > 10 && this.ammoCount >0)
            {
                // console.log("pium");
                if(global.playerDirection === "left")
                {
                    new Projectile(this.x,this.y + this.height /2, 15, 15,1)
                    // console.log("new")
                }
                else if(global.playerDirection === "right")
                {
                    new Projectile(this.x + this.width,this.y + this.height /2, 15, 15,1)
                    // console.log("new")
                }

                this.counter = 0;
                this.ammoCount--;
                global.shootSound.pause();
                global.soundManager.play("shoot");
            }
            else if(this.ammoCount === 0)
            {
                global.emptyGun.pause();
                global.soundManager.play("emptyGun");
            }


        }

        // console.log(this.ammoCount)
        this.counter++;
        global.weaponFire = false;
    }
    update = function() {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        //  console.log(this.x,this.y)
        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }
        this.useWeapon();
        // this.y -= this.physicsData.prevFallingVelocity;
        // global.allGameObjects.forEach(gameObject => {
        //     if(gameObject.moveWithPlayer === true)
        //     {
        //         gameObject.y -= this.physicsData.prevFallingVelocity;

        //         // console.log(this.previousY - this.y)
                
        //     }
        // });
        // global.ctx.strokeRect(this.x, this.y, this.width,this.height)
        // global.ctx.strokeRect(this.x + 18, this.y + 14, this.width - 22,this.height - 3)
    }


    
    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        // this.loadImagesFromSpritesheet("./images/BODY_Skeleton.png", 9, 4);
        this.loadImagesFromSpritesheet("./assets/pigeon_animation_2.png",8,1)
    }
}

export {Player}