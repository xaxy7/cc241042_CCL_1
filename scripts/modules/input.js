import { global } from "./global.js";

function move(event) {

    //Example Movement for the PacMan Game
    switch(event.key) {
        case "d":
            if (global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(4,7)
                // global.playerObject.switchCurrentSprites(27, 35);
  
            global.playerObject.xVelocity = 300;
            global.playerObject.yVelocity = 0;
            global.playerDirection = "right";

            break;
        case "a":
            if (global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(0,3)
                // global.playerObject.switchCurrentSprites(9, 17);
            global.playerObject.xVelocity = -300;
            global.playerObject.yVelocity = 0;
            global.playerDirection = "left";
            break;
        case "w":
            global.playerObject.setJumpForce(7);
            break;
        case "e":
            global.weaponFire = true;
            // console.log("e");
            break;
       /* case "s":
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = 100;
            global.playerObwject.switchCurrentSprites(3, 5);
            break; */
    }
}

function stop(event) {
    switch(event.key) {
        case "d":
            global.playerObject.xVelocity = 0;
            break;
        case "a":
            global.playerObject.xVelocity = 0;
            break;   
    }
}

document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);