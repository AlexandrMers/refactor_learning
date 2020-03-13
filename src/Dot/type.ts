export interface DotInterface {
    y: number;
    x: number;
    liveTime: number;
}

export interface ExtendedDotInterface extends DotInterface {
    hue: number;
    setHueValue: (value: number) => void;
}

export interface ConfigDotInterface {
    x: number;
    y: number;
    liveTime: number;
    dir: number;
}