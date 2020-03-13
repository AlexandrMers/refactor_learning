import {ConfigDotInterface, DotInterface} from "./type";

export class Dot implements DotInterface {
    public x: number;
    public y: number;
    public liveTime: number;
    public dir: number;

    constructor(configDot: ConfigDotInterface) {
        this.x = configDot.x;
        this.y = configDot.y;
        this.liveTime = configDot.liveTime;
        this.dir = configDot.dir;
    }

}