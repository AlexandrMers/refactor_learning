import {DotInterface} from "./type";

export class Dot implements DotInterface {
    public x: number;
    public y: number;
    public liveTime: number;
    public direction: number;

    constructor(configDot: DotInterface) {
        this.x = configDot.x;
        this.y = configDot.y;
        this.liveTime = configDot.liveTime;
        this.direction = configDot.direction;
    }

}