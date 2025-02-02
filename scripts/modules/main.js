import { global } from "./global.js";
import { Player } from "../gameObjects/Player.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Floor } from "../gameObjects/floor.js";
import {Coin} from "../gameObjects/coin.js"
import { Enemy } from "../gameObjects/enemy.js";
import { ViewSwitch } from "../gameObjects/viewSwtich.js";
import { Weapon } from "../gameObjects/weapons.js";
import { Border } from "../gameObjects/borders.js";
import { FinishLine } from "../gameObjects/finishLine.js";
import { Ammunition } from "../gameObjects/ammunition.js";
import { Column } from "../gameObjects/columns.js";
import { Lava } from "../gameObjects/lava.js";
import SoundManager from "./sound.js";

function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    
    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            if(global.allGameObjects[i].name != "Column")
                global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }

    }

    if(global.playerObject.lifes ===0)
    {
        document.getElementById("lostScreen").style.display= "block";
        global.playerObject.active = false;
        document.getElementById("canvas").style.opacity = 0.5;
        global.score = 0;
        global.soundtrack.pause();
    }
    global.drawPoints();
    global.drawLifes();
    global.drawAmmoCount();
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {

    // global.leftMoveTrigger = new MoveTrigger(100, 100, 20, 900, 100);
    // global.rightMoveTrigger = new MoveTrigger(800, 100, 20, 900, -100);
    global.leftMoveTrigger = new MoveTrigger(340, -100, 20, 1500, 100);
    global.rightMoveTrigger = new MoveTrigger(400, -100, 20, 1500, -100);
    global.topMoveTrigger = new ViewSwitch(0,270,9000,20,1)
    global.bottomMoveTrigger = new ViewSwitch(0,730,9000,20,-1)

    // new BlockObject(0,0,10,1000)
    // new Border(0,0,10,1000)
     new BlockObject(500, 770, 150, 30,1);
    new Column(500,800,150,1000)
    new BlockObject(200,270,150,30,1);
    new Column(200,300,150,1000)
    new BlockObject(10,470,150,30,2);
    new BlockObject(500, 370, 150, 30,2);
    
    new BlockObject(700, 670, 150, 30,2);
    // new Column(700,700,150,1000);

    new BlockObject(700, 470, 150, 30,2);
    new BlockObject(720, 270, 150, 30,2);
    new BlockObject(900,570,150,30,1);
    new Column(900,600,150,1000)

    new BlockObject(1100,470,150,30,2);
    // new Column(1100,500,150,1000);


    new BlockObject(1200,270,150,30,2);


    new BlockObject(1300,370,150,30,2);
    // new Column(1300,400,150,1000);
    // new BlockObject(1600,370,150,30,1);
    //  new Column(1600,400,150,1000)
    new BlockObject(1500,670,150,30,1);
    new Column(1500,700,150,1000)



    new BlockObject(1750,370,150,30,1);
    new Column(1750,400,150,1000)
    new BlockObject(1900,370,150,30,1);
    new Column(1900,400,150,1000)

    new BlockObject(1750,200,150,30,2)
    new Coin(1750, 120, 64, 64);

    new BlockObject(2000,700,150,30,2)
    new Coin(2000,630,64,64)

    new BlockObject(2150, 600, 150, 30,1);
    new Column(2150,630,150,1000)
    new BlockObject(2300, 500, 150, 30,2);
    new BlockObject(2450, 400, 150, 30,2);
    new BlockObject(2600, 400, 150, 30,1);
    new Column(2600,430,150,1000);
    new BlockObject(2525, 270, 150, 30,2);
    new BlockObject(2850, 500, 150, 30,2);
    new BlockObject(2300, 120, 150, 30,2);
    new Coin(2300, 50,64,64);
    new Ammunition(2400,50,64,64)
    new BlockObject(3000, 600, 150, 30,1);
    new Column(3000,630,150,1000);
    new BlockObject(3150, 600, 150, 30,2);
    new BlockObject(3300,700,150,30,2);
    new BlockObject(3350,490,150,30,2)
    new BlockObject(3150,800,150,30,2);
    new BlockObject(3130,350,150,30,2);
    new BlockObject(3350,220,150,30,2);
    new BlockObject(3500,220,150,30,1);
    new Column(3500,250,150,1000);
    new BlockObject(3900,220,150,30,2);
    new BlockObject(4050,350,150,30,2);
    new BlockObject(4200,350,150,30,2);
    new BlockObject(3900,500,150,30,2)
    new BlockObject(4550,350,150,30,1)
    new Column(4550,370,150,1000);
    new BlockObject(4700,350,150,30,2)
    new BlockObject(5100,650,150,30,1)
    new Column(5100,680,150,1000);
    new BlockObject(5250,650,150,30,1)
    new Column(5250,680,150,1000);
    new FinishLine(5125,370,242,338);
        // new BlockObject(3750,500,150,30,2)



    global.playerObject = new Player(350, 800, 72, 72);
    new Coin(600, 670, 64, 64);

    new Coin(900, 260, 64, 64);
    new Coin(1250, 100,64, 64);
    new Coin(1550, 600, 64, 64);
    new Coin(3190,730,64,64);
    new Coin(3150,100,64,64)
    new Enemy(750,620,64,64,50,0,0)
    new Enemy(770,220,64,64,50,0,1)
    new Enemy(1480,350,96,96,50,1,2)
    new Enemy(380,280,96,96,50,1,3)
    new Enemy(800,850,64,64,100,0,4)
    new Enemy(1950,320,64,64,50,0,5)
    new Enemy(2900,450,64,64,50,0,6)
    new Enemy(2575,220,64,64,50,0,7)
    // new Enemy(1750,850,64,64,100,0,8)
    // new Enemy(1900,850,64,64,100,0,9)  //  protection enemies
    // new Enemy(1825,650,96,96,50,1,10)
    new Enemy(3730,200,96,96,30,1,11)
    new Enemy(3170,300,64,64,50,0,12);
    new Enemy(3340,650,64,64,50,0,13);
    new Enemy(4400,250,96,96,30,1,14);
    new Enemy(4750,300,64,64,50,0,15);

    new Ammunition(40,400,64,64);
    new Ammunition(3900,430,64,64);
    new Coin(4000,420,64,64)
    new Coin(100,400, 64, 64);
    // new Weapon(20,410,100,50,1);
    new Weapon(50,810,64,64,1);

    // new Floor(0,900,10000,100);
    new Floor(0, 900, 1500, 100);
    new Floor(2500,900,1200,100);
    new Lava(1500,910,1000,100);
    new Lava(-1000,910,1000,100);
    new Lava(3700,910,5000,100)

    console.log(global.allGameObjects);
    global.soundManager = new SoundManager; 


    global.soundtrack = global.soundManager.load("soundtrack","../sounds/soundtrack.mp3")
    global.soundtrack.loop = true;
    global.soundtrack.volume = 0.1; 

    global.shootSound = global.soundManager.load("shoot","../sounds/shoot1.mp3");
    global.shootSound.singleton =  true;
    global.shootSound.volume = 0.5; 

    global.enemyDamage = global.soundManager.load("enemyDamage","../sounds/enemy_damage.wav")
    global.enemyDamage.singleton = true;
//    global.enemyDamage.volume = 0.5;

    global.emptyGun = global.soundManager.load("emptyGun","../sounds/empty_gun.mp3");
    global.emptyGun.singleton = true;

    global.coinSound = global.soundManager.load("coinSound","../sounds/coin.mp3")
    global.coinSound.singleton = true;

    global.lavaSound = global.soundManager.load("lavaSound","../sounds/lava.mp3")
    global.lavaSound.singleton = true;

    global.reload = global.soundManager.load("reload","../sounds/reload.mp3");
    global.reload.singleton = true;

    global.deathSound = global.soundManager.load("deathSound","../sounds/death.mp3");
    global.deathSound.singleton = true;

    global.damageSound = global.soundManager.load("damageSound","../sounds/damage.mp3")
    global.damageSound.singleton = true;

    global.winSound = global.soundManager.load("winSound","../sounds/win.wav");
    global.winSound.singleton = true;

    global.buffSound = global.soundManager.load('buffSound',"../sounds/buff.mp3")
    global.buffSound.singleton = true;
}

function startGame()
{
    document.getElementById("startScreen").style.display ="none";
    document.getElementById("canvas").style.display = "block";
    document.getElementById("canvas").style.opacity = 1;
    document.getElementById("lostScreen").style.display= "none";
    document.getElementById("wonScreen").style.display= "none";

    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
    global.currentWeapon = 0;
    global.allGameObjects = [];
    global.allEnemies = [];
    global.allHpBars = [];

    setupGame();
    global.soundManager.play("soundtrack");
}
document.getElementById('startButton').addEventListener('click', (e) => {
    startGame();
    console.log("start")
  })
document.getElementById('restartButton1').addEventListener('click', (e) => {
  startGame();
  console.log("restart")
})
document.getElementById('restartButton2').addEventListener('click', (e) => {
    startGame();
    console.log("restart")
  })
requestAnimationFrame(gameLoop);



