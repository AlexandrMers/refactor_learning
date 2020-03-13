import {ExtendedDotInterface} from "./type";

export class Dot implements ExtendedDotInterface {
    public x: number;
    public y: number;
    public liveTime: number;
    public hue: number;
    public dir: number;

    constructor(configDot: ConfigDotInterface) {
        this.x = configDot.x;
        this.y = configDot.y;
        this.liveTime = configDot.liveTime;
        this.dir = configDot.dir;
    }

    public setHueValue(value: number) {
        this.hue = value;
    }
}