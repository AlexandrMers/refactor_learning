import {DotInterface} from "../Dot/type";

export interface DotGeneratorInterface<DotClass extends DotInterface> {
    generate: (count: number) => DotClass[];
}