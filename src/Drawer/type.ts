import {Dot} from "../Dot";
import {DotInterface} from "../Dot/type";

export interface ColorParamsDrawerInterface {
    color: string;
    shadowColor: string | number;
    shadowBlur: number;
    gco: string;
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