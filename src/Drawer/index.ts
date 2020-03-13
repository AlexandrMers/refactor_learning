import {ColorParamsDrawerInterface, ConfigDrawerInterface, CoordinatsDrawerInterface, DrawerInterface} from "./type";
import {Dot} from "../Dot";

export class CanvasDrawer implements DrawerInterface {
    private target: string;

    private canvas: HTMLCanvasElement;
    private contextCanvas: any;
    private elementForRenderInner: HTMLElement;

    private config: ConfigDrawerInterface;

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
        const canvasCenterByX = this.canvas.width / 2;
        const canvasCenterByY = this.canvas.height / 2;
        let xy = Math.abs(dot.x - canvasCenterByX) + Math.abs(dot.y - canvasCenterByY);
        let makeHue = (dot.hue + xy / this.config.gradientLen) % 360;
        let color = `hsl(${makeHue}, 100%, 50%)`;
        let blur = this.config.dotSize - Math.sin(xy / 8) * 2;
        let size = this.config.dotSize - Math.sin(xy / 9) * 2 + Math.sin(xy / 2);
        let x = canvasCenterByX + dot.x - size / 2;
        let y = canvasCenterByY + dot.y - size / 2;

        this.drawRect({
            x: x,
            y: y,
            h: size,
            w: size
        }, {
            color,
            shadowColor: color,
            shadowBlur: blur,
            gco: "lighter"
        });
    }
}