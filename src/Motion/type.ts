import {DrawerInterface} from "../Drawer/type";
import {DotGeneratorInterface} from "../DotGenerator/type";
import {ExtendedDotInterface} from "../Dot/type";
import {DotMoverInterface} from "../DotMover/type";

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
    dotGenerator: DotGeneratorInterface<ExtendedDotInterface>;
    dotMover: DotMoverInterface<ExtendedDotInterface>;
}

export interface DirInterface {
    x: number;
    y: number;
}

