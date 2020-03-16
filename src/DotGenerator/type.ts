import {DotInterface} from "../Dot/type";

export interface DotGeneratorInterface<DotClass extends DotInterface> {
    generate: () => DotClass[];
    checkLiveTimeAndRemoveDot: (Dot: DotInterface, distance: number) => boolean;
    setDistance: (value: number) => void;
}