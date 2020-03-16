import {Dot} from "../Dot";
import {DotGeneratorInterface} from "./type";
import {DotInterface} from "../Dot/type";

export class DotGenerator implements DotGeneratorInterface<DotInterface> {

    private distance: number;

    public setDistance(value: number) {
        this.distance = value;
    }

    public generate(): Dot[] {
        return [new Dot({
            x: 0,
            y: 0,
            liveTime: 0,
            direction: 0
        })];
    }

    public checkLiveTimeAndRemoveDot(dot: DotInterface): boolean {
        if (dot.liveTime < this.distance) {
            return true;
        }
        return Math.random() > .3;
    }
}