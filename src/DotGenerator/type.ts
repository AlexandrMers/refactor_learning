import {ExtendedDotInterface} from "../Dot/type";

export interface DotGeneratorInterface<DotClass extends ExtendedDotInterface> {
    generate: (count: number) => DotClass[];
    setHue: (val: number) => void;
}