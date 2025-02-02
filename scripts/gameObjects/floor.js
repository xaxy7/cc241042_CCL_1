import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class Floor extends BaseGameObject {
    name = "Floor";
    blockGravityForces = true;


    //to make invisible
    // draw = function () {
    // }
    
    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./assets/floor1.jpg"]);
    }
}

export {Floor};