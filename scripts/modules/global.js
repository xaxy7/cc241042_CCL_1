const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.canvas.width =1900;
global.windowWidth = global.canvas.width /2;
// global.canvas.height = 910;
global.canvas.height = 938;
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.allHpBars = [];
global.allEnemies = [];
global.playerObject = {};
global.backgroundShift = 0;
global.backgroundMaxShift = -1000;
global.gravityForce = 9.8;
// global.gravityForce = 15;
global.pixelToMeter = 100;
global.leftMoveTrigger;
global.rightMoveTrigger;
global.topMoveTrigger;
global.bottomMoveTrigger;
global.playerDirection;
global.currentWeapon;
global.weaponFire = false;
global.score = 0;
global.counter = 0;


global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}
global.drawPoints = function()
{
    global.ctx.textAlign = 'left';
    global.ctx.font = '30px Optimus';

    global.ctx.fillStyle = 'red';
    global.ctx.fillText(`Seeds:${global.score}`, 50, 100);
}
global.drawLifes = function()
{
    global.ctx.textAlign = "left"
    global.ctx.font = '30px  Optimus';

    global.ctx.fillStyle = 'red';
    global.ctx.fillText(`Lifes:${global.playerObject.lifes}`, 170, 100);
}
global.drawAmmoCount = function()
{
    global.ctx.textAlign = "left"
    global.ctx.font = '30px Optimus';

    global.ctx.fillStyle = 'red';
    global.ctx.fillText(`Ammo:${global.playerObject.ammoCount}/12`, 270, 100);   
}
global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = givenObject.index; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}
global.gameWon = function()
{
    document.getElementById("wonScreen").style.display= "block";
    // document.getElementById("canvas").style.display = "none";
    document.getElementById("canvas").style.opacity = 0.5;
    document.getElementById("seeds").innerHTML = `Seeds collected: ${global.score}/11`;
    global.playerObject.active = false;
    global.allGameObjects.forEach(gameObject => {
        if(gameObject.moveWithPlayer === true)
        {
            gameObject.x = gameObject.startingX;
            gameObject.y = gameObject.startingY;
            gameObject.counter = 0;
            // gameObject.xVelocity = 0;
            // gameObject.yVelocity = 0;
            if(gameObject.name === "Enemy")
            {
                gameObject.enemyHealth  = 4;
                gameObject.active = false;
            }
            if(gameObject.name === "hpBar")
                {
                    gameObject.active = false;
                    gameObject.hits = 0;
                    gameObject.switchCurrentSprites(0,0)
                }
            if(gameObject.name === "Projectile")
            {
                gameObject.active = false;
            }
    

        }
    });
    global.playerObject.y = global.playerObject.startingY;
    global.playerObject.ammoCount =12;
    global.score = 0;
    global.counter = 0;
}
global.restartGame = function(){
    global.allGameObjects.forEach(gameObject => {
        if(gameObject.moveWithPlayer === true)
        {
            gameObject.x = gameObject.startingX;
            gameObject.y = gameObject.startingY;
            gameObject.counter = 0;
            // gameObject.xVelocity = 0;
            // gameObject.yVelocity = 0;
            if(gameObject.name === "Enemy")
            {
                gameObject.active = true;
                gameObject.enemyHealth  = 4;
            }
            if(gameObject.name === "hpBar")
            {
                gameObject.active = true;
                gameObject.hits  = 0;
                gameObject.switchCurrentSprites(0,0)
            }
            if(gameObject.name === "Projectile")
                {
                    gameObject.active = false;
                }
        }
    });
    global.playerObject.ammoCount =12;
    global.playerObject.y = global.playerObject.startingY;
    global.counter = 0;
}
// global.drawBackground = function(ctx, offsetX)
// {
//     global.offset = 0;
//     global.width = global.windowWidth;
//     global.breakpoint = 0.5;
//     if(offsetX > global.width * global.breakpoint)
//     {
//         global.offset = offsetX - global.width*breakpoint;

//     }
//     global.offset = Math.min(global.offset,global.ctx.width - global.width)
//     ctx.drawImage(global.width,global.offset, 0, global.canvas.width, global.canvas.height, 0, 0,global.canvas.width, global.canvas.height )
//     return global.offset;
// }

global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}


export { global }