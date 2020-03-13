import {Dot} from "../Dot";
import {DotGeneratorInterface} from "./type";
import {DotInterface} from "../Dot/type";

export class DotGenerator implements DotGeneratorInterface<DotInterface> {

    public generate(count: number): Dot[] {
        const dotsList = [];

            const dot = new Dot({
                x: 0,
                y: 0,
                liveTime: 0,
                direction: 0
            });
            dotsList.push(dot);

        return dotsList;
    }
}