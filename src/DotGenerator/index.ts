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
        const percent = Math.random() * .3 * Math.exp(dot.liveTime / this.distance);
        return percent < 100;
    }
}