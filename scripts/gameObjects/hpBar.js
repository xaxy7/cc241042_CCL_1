import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class hpBar extends BaseGameObject{
    name="hpBar"
    useGravityForces = false;
    enemyType;
    counter  = 0;
    xVelocity = 50;
    direction = -1;
    yVelocity = 150;
    id;
    hits = 0;
    update= function()
    {
        if(this.enemyType === "walking")
        {
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
        
                this.x += this.direction * this.xVelocity * global.deltaTime;
                // console.log(this.x, this.y)
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

        // global.ctx.strokeRect(this.x, this.y, this.width, this.height)

        // console.log(this.x, this.y )
        
        // this.applyGravity();

    }
    constructor(x,y,width, height, block,enemyType, id)
    {

        super(x,y,width,height);
        this.block = block;
        this.enemyType= enemyType;
        this.id = id;
        console.log(this.x, this.y )
        // this.loadImages(["./images/hpbar.png"])
        global.allHpBars.push(this);
        this.loadImagesFromSpritesheet(["./images/hpbar2.png"], 1, 4)
    }
}
export{hpBar}