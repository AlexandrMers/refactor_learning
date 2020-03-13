import {ColorParamsDrawerInterface, ConfigDrawerInterface, CoordinatsDrawerInterface, DrawerInterface} from "../type";
import {Dot} from "../../Dot";

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
        try {
            this.drawRect({
                x: 0,
                y: 0,
                w: this.canvas.width,
                h: this.canvas.height
            }, {
                shadowColor: 0,
                shadowBlur: 0,
                color: this.config.bgFillColor,
                gco: 'normal'
            });

        } catch (error) {
            console.error("Not valid the selector");
        }
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
        this.contextCanvas.globalCompositeOperation = colorParams.gco;
        this.contextCanvas.shadowColor = colorParams.shadowColor || `black`;
        this.contextCanvas.shadowBlur = colorParams.shadowBlur || 1;
        this.contextCanvas.fillStyle = colorParams.color;
        this.contextCanvas.fillRect(x, y, w, h);
    }

    public redrawDot(dot: Dot) {
        this.drawDot(dot);
    }

    abstract drawDot(dot: Dot): void;
}