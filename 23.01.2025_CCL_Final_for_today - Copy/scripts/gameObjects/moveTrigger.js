import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class MoveTrigger extends BaseGameObject {
    backGroundDiv = null;
    moveWithPlayer = false;
    counter = 0;
    startingX;
    startingY;
    update = function () {
        // this.backGroundDiv.style.backgroundPositionX = global.backgroundShift + "px";
        // global.canvas.style.marginLeft =  global.backgroundShift  + "px";
    }

    draw = function () {
        //   global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Player") {
            collidingObject.x = collidingObject.previousX;

            global.allGameObjects.forEach(gameObject => {
                if(gameObject.moveWithPlayer === true)
                {
                    // if(collidingObject.xVelocity > 0  && global.counter < 70000)
                    // {
                    //     // global.counterRight = 0;
                    //     global.counter++;
    
                    // }
                    // else if(collidingObject.xVelocity < 0 && global.counter >= -3000)
                    // {
                    //     global.counter--;
                    // }

                    // // console.log(global.counter);
                    // if(global.counter>= -3000 && global.counter < 70000)
                    // {
                        gameObject.x -= collidingObject.xVelocity * global.deltaTime;

                    // }

                }
                console.log(global.counter);
            });

        }
    // reactToCollision = function (collidingObject)   {
    //     if (collidingObject.name == "Player") {
    //         let shiftBy = collidingObject.xVelocity * global.deltaTime;
    //         // let shiftBy = 1000;
    //         global.backgroundShift += shiftBy * -1 ;

    //         if (global.backgroundShift < global.backgroundMaxShift) {
    //             global.backgroundShift = global.backgroundMaxShift;
    //             collidingObject.x = collidingObject.previousX;
    //         }
    //         else if (global.backgroundShift > 0) {
    //             global.backgroundShift = 0;
    //             collidingObject.x = collidingObject.previousX;
    //         }
    //         else {
    //             global.leftMoveTrigger.x += shiftBy;
    //             global.rightMoveTrigger.x += shiftBy;
    //         }
    //     }

    }

    constructor(x, y, width, height) {
        super(x, y, width, height);

        //this.loadImages(["./images/apple.png"]);
        this.backGroundDiv = document.querySelector("#background");
    }
}

export {MoveTrigger}