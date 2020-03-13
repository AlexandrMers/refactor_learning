import {Dot} from "../Dot";
import {DotGeneratorInterface} from "./type";

export class DotGenerator implements DotGeneratorInterface<Dot> {
    private hue: number;

    public setHue(hue) {
        this.hue = hue;
    }

    public generate(count: number): Dot[] {
        const dotsList = [];
        for(let i = 0; i < count; i++) {
            this.hue = (this.hue + 1) % 360;
            const dir = (Math.random() * 3 | 0) * 2;
            const dot = new Dot({
                x: 0,
                y: 0,
                liveTime: 0,
                dir
            });
            dot.setHueValue(this.hue);
            dotsList.push(dot);
        }
        return dotsList;
    }
}