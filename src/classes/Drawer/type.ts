import {DotInterface} from "../Dot/type";
import {Dot} from "../Dot";

export interface ColorParamsDrawerInterface {
    color: string;
    shadowColor: string | number;
    shadowBlur: number;
    globalCompositeOperation: string;
}

export interface DrawerInterface {
    render: () => void;
    drawRect: (
        coordinate: CoordinatsDrawerInterface,
        colorParams: ColorParamsDrawerInterface
    ) => void;
    setConfig: (config: ConfigDrawerInterface) => void;
    setTarget: (target: string) => void;
    redrawDot: (dot: DotInterface) => void;
    setHue: (value: number) => void;
    getCoordinatesCenterOfCanvas: () => number[];
    getAppearRect: (dot: Dot, angle: number) => AppearRectInterface;
    calculateAngle: (dotCoordinates, coordinatesByCenter: CoordinatesByCenterOfCanvasInterface) => number;
    getCoordinatesRelativeCanvas: (dot: Dot, coordinatesByCenter: CoordinatesByCenterOfCanvasInterface, size: number) => number[];
}

export interface ConfigDrawerInterface {
    bgFillColor: string;
    gradientLen: number;
    dotSize: number;
}

export interface CoordinatsDrawerInterface {
    x: number;
    y: number;
    h: number;
    w: number;
}

export interface AppearRectInterface {
    color: string;
    blur: number;
    size: number;
}

export interface CoordinatesByCenterOfCanvasInterface {
    canvasCenterByX: number;
    canvasCenterByY: number;
}

export interface DotCoordinatesInterface {
    x: number;
    y: number;
}