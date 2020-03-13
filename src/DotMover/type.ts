import {DirInterface} from "../Motion/type";
import {DotInterface} from "../Dot/type";

export interface ConfigMoverInterface {
    dotVelocity: number;
    dirsList: DirInterface[];
    stepToTurn: number;
    dirsCount: number;
}

export interface DotMoverInterface<DotClass extends DotInterface> {
    move: (dot: DotClass) => DotClass;
    changeDir: (dot: DotClass) => DotClass;
    setConfigMover: (config: ConfigMoverInterface) => void;
}