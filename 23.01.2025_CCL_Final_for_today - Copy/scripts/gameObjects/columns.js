import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";


class Column extends BaseGameObject{
    name = "Column"

    constructor(x,y,width,height)
    {
        super(x,y,width,height)
        this.loadImages(["./assets/column3.png"])
    }
}
export {Column}