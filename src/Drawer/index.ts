import {Dot} from "../Dot";
import {CanvasDrawerBase} from "./DotMoverBase";

export class CanvasDrawerV1 extends CanvasDrawerBase {
    drawDot(dot: Dot): void {
        const canvasCenterByX = this.canvas.width / 2;
        const canvasCenterByY = this.canvas.height / 2;
        let xy = Math.abs(dot.x - canvasCenterByX) + Math.abs(dot.y - canvasCenterByY);
        let makeHue = (this.hue + xy / this.config.gradientLen) % 360;
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

export class CanvasDrawerV2 extends CanvasDrawerBase {
    drawDot(dot: Dot): void {
        const canvasCenterByX = this.canvas.width / 2;
        const canvasCenterByY = this.canvas.height / 2;
        let xy = Math.abs(dot.x - canvasCenterByX) + Math.abs(dot.y - canvasCenterByY);
        let makeHue = (this.hue + xy / this.config.gradientLen) % 360;
        let color = `hsl(${makeHue}, 100%, 50%)`;
        let blur = this.config.dotSize - Math.sin(xy / 8) * 2;
        let size = this.config.dotSize;
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

