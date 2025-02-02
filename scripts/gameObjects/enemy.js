import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { hpBar } from "./hpBar.js";
import { Projectile } from "./projectile.js";
class Enemy extends BaseGameObject{
    useGravityForces = false;
    name = "Enemy";
    xVelocity = 50;
    yVelocity = 150;
    direction = -1;
    random;
    counter = 0;
    enemyType;
    enemyHealth = 4;
    spriteLeft = 4;
    spriteRight = 0;
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.3,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };
    // yVelocity = 1;
    reactToCollision = function( collidingObject)
    {
        if(collidingObject.name === "Player")
        {
            // global.playerObject.active = false;
            collidingObject.lifes -= 1;
            global.damageSound.pause();
            global.soundManager.play("damageSound");
            if(collidingObject.lifes === 0)
                global.soundManager.play("deathSound");
            global.restartGame()
        }
    }
    constructor(x,y,width, height,block,enemyType, id)
    {
        super(x,y,width,height)
        this.block = block;
        this.id = id;
        if(enemyType === 0)
        {
            this.enemyType = "walking";
            this.loadImagesFromSpritesheet(["./assets/worm_v2.png"],8,1)
      
        }
        else if(enemyType === 1)
        {
            this.enemyType = "flying";
            this.loadImages(["./assets/ship.png"])
        }
        
        global.allEnemies.push(this);
        console.log(this.id)
        // this.switchCurrentSprites(4,7)
        if(this.enemyType === "flying")
        {
            new hpBar(this.x + 10 , this.y -20 , 70, 10,block,this.enemyType, this.id);
        }
        else
            new hpBar(this.x, this.y -20 , 70, 10,block,this.enemyType, this.id);
    }
    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        if(this.enemyType === 0)
        {
            let bounds = {
                left: this.x,
                right: this.x + this.width,
                top: this.y + 22,
                bottom: this.y + this.height
            }
            return bounds
            console.log("jajco")
        }
        else if(this.enemyType ===1)
        {
            bounds = {
                left: this.x + 3 * 1.5,
                right: this.x + this.width -4*1.5,
                top: this.y + 13*1.5,
                bottom: this.y + this.height - 5*1.5
            }
            return bounds;
        }
        return bounds;

    };
    newBullet =function()
    {
        new Projectile(this.x,this.y,10,10,2)
    }
    update= function()
    {
        if(this.enemyType === "walking")
        {
            // if(this.direction === 1)
            // {
            //     this.switchCurrentSprites(0,3)
            // }
            // else if(this.direction === -1)
            // {
            //     this.spriteLeft++;
            //     this.switchCurrentSprites(this.spriteLeft,this.spriteLeft+1)
            //     if(this.spriteLeft == 6)
            //         this.spriteLeft = 4;
            // }

            if(this.counter > -this.block && this.direction == 1)
                {
 
                    this.counter--;

                }
                else if(this.counter < this.block && this.direction  == -1)
                {
                    this.counter++;
                    // this.switchCurrentSprites(4,7)
                    
                }
                if(this.counter === this.block )
                {
                    this.direction = 1;
                    this.switchCurrentSprites(0,3)


                }
                else if(this.counter === -this.block )
                {
                    this.direction = -1;
                    this.switchCurrentSprites(4,7)
                }
        
                this.x += this.direction * this.xVelocity * global.deltaTime;


        }
        else if(this.enemyType === "flying")
        {
            this.useGravityForces= false;
            if(this.counter > -this.block && this.direction == 1)
                {
                    this.counter--;
        
                }
                else if(this.counter < this.block && this.direction  == -1)
                {
                    this.counter++;
                    
                }
                if(this.counter === this.block )
                {
                    this.direction = 1;
                }
                else if(this.counter === -this.block )
                {
                        this.direction = -1;
                }
                // console.log(this.counter)
                this.y += this.direction * this.yVelocity * global.deltaTime;
        }

        //  global.ctx.strokeRect(this.getBoxBounds().left, this.getBoxBounds().top, this.getBoxBounds().right - this.x, this.getBoxBounds().bottom - this.y)


        // this.applyGravity();
    }
}
export{Enemy}