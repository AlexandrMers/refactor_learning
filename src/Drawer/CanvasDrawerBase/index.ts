import {Dot} from "../../Dot";

import {
    AppearRectInterface,
    ColorParamsDrawerInterface,
    ConfigDrawerInterface, CoordinatesByCenterOfCanvasInterface,
    CoordinatsDrawerInterface, DotCoordinatesInterface,
    DrawerInterface
} from "../type";

export abstract class CanvasDrawerBase implements DrawerInterface {
    private target: string;

    public canvas: HTMLCanvasElement;
    public contextCanvas: any;
    private elementForRenderInner: HTMLElement;

    public config: ConfigDrawerInterface;
    public hue: number;

    public setHue(value: number) {
        this.hue = value;
    }

    public setTarget(target: string) {
        this.target = target;
        try {
            this.elementForRenderInner = document.querySelector(this.target);
            this.canvas = document.createElement('canvas');
            this.elementForRenderInner.appendChild(this.canvas);
            this.contextCanvas = this.canvas.getContext("2d");
            this.resizeCanvas();
            this.observerOfResize();
        } catch (error) {
            console.error("Not valid the selector");
        }
    }

    public setConfig(config: ConfigDrawerInterface) {
        this.config = config;
    }

    public render(): void {
        this.drawRect({
            x: 0,
            y: 0,
            w: this.canvas.width,
            h: this.canvas.height
        }, {
            shadowColor: 0,
            shadowBlur: 0,
            color: this.config.bgFillColor,
            globalCompositeOperation: 'normal'
        });
    }

    public resizeCanvas() {
        this.canvas.width = this.elementForRenderInner.clientWidth;
        this.canvas.height = this.elementForRenderInner.clientHeight;
    }

    public observerOfResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    public drawRect({x, y, w, h}: CoordinatsDrawerInterface, colorParams: ColorParamsDrawerInterface) {
        this.contextCanvas.globalCompositeOperation = colorParams.globalCompositeOperation;
        this.contextCanvas.shadowColor = colorParams.shadowColor || `black`;
        this.contextCanvas.shadowBlur = colorParams.shadowBlur || 1;
        this.contextCanvas.fillStyle = colorParams.color;
        this.contextCanvas.fillRect(x, y, w, h);
    }

    public redrawDot(dot: Dot) {
        this.drawDot(dot);
    }

    public getCoordinatesCenterOfCanvas(): number[] {
        const canvasCenterByX = this.canvas.width / 2;
        const canvasCenterByY = this.canvas.height / 2;
        return [canvasCenterByX, canvasCenterByY];
    }

    public calculateAngle(dotCoordinates: DotCoordinatesInterface, coordinatesByCenter: CoordinatesByCenterOfCanvasInterface): number {
        return Math.abs(dotCoordinates.x - coordinatesByCenter.canvasCenterByX) + Math.abs(dotCoordinates.y - coordinatesByCenter.canvasCenterByY);
    }

    public getAppearRect(dot: Dot, angle: number): AppearRectInterface {
        const makeHue = (this.hue + angle / this.config.gradientLen) % 360;
        const color = `hsl(${makeHue}, 100%, 50%)`;
        const blur = this.config.dotSize - Math.sin(angle / 8) * 2;
        const size = this.config.dotSize - Math.sin(angle / 9) * 2 + Math.sin(angle / 2);

        return {
            color,
            blur,
            size
        }
    }

    public getCoordinatesRelativeCanvas(dot: Dot, coordinatesByCenter: CoordinatesByCenterOfCanvasInterface, size: number) {
        const x = coordinatesByCenter.canvasCenterByX + dot.x - size / 2;
        const y = coordinatesByCenter.canvasCenterByY + dot.y - size / 2;

        return [x,y];
    }


    abstract drawDot(dot: Dot): void;
}