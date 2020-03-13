import {DotInterface} from "../Dot/type";

export interface ConfigMoverInterface {
    dotVelocity: number;
    stepToTurn: number;
    dirsCount: number;
    gridAngle?: number;
}

export interface DotMoverInterface<DotClass extends DotInterface> {
    move: (dot: DotClass) => DotClass;
    changeDir: (dot: DotClass) => DotClass;
    setConfigMover: (config: ConfigMoverInterface) => void;
}