import {DrawerInterface} from "../Drawer/type";
import {DotGeneratorInterface} from "../DotGenerator/type";
import {DotMoverInterface} from "../DotMover/type";
import {DotInterface} from "../Dot/type";

export interface ConfigMotionInterface {
    hue: number;
    bgFillColor: string;
    dirsCount: number;
    stepToTurn: number;
    dotSize: number;
    dotsCount: number;
    dotVelocity: number;
    distance: number;
    gradientLen: number;
}

export interface ConfigExecutorsInterface {
    drawer: DrawerInterface;
    dotGenerator: DotGeneratorInterface<DotInterface>;
    dotMover: DotMoverInterface<DotInterface>;
}

export interface DirInterface {
    x: number;
    y: number;
}

