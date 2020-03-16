import {Dot} from "../Dot";
import {CanvasDrawerBase} from "./CanvasDrawerBase";

export class CanvasHexagonDrawer extends CanvasDrawerBase {
    drawDot(dot: Dot): void {

        const [canvasCenterByX, canvasCenterByY] = this.getCoordinatesCenterOfCanvas();

        const angle = this.calculateAngle({
            x: dot.x,
            y: dot.y
        }, {
            canvasCenterByX,
            canvasCenterByY
        });

        const {
            blur,
            color,
            size
        } = this.getAppearRect(dot, angle);

        const [x, y] = this.getCoordinatesRelativeCanvas(dot, {
            canvasCenterByX,
            canvasCenterByY
        }, size);

        this.drawRect({
            x,
            y,
            h: size,
            w: size
        }, {
            color,
            shadowColor: color,
            shadowBlur: blur,
            globalCompositeOperation: "lighter"
        });

    }
}

export class CanvasTrapezeDrawer extends CanvasDrawerBase {

    drawDot(dot: Dot): void {
        const [canvasCenterByX, canvasCenterByY] = this.getCoordinatesCenterOfCanvas();

        const angle = this.calculateAngle({
            x: dot.x,
            y: dot.y
        }, {
            canvasCenterByX,
            canvasCenterByY
        });

        const {
            blur,
            color
        } = this.getAppearRect(dot, angle);

        const size = this.config.dotSize;

        const [x, y] = this.getCoordinatesRelativeCanvas(dot, {
            canvasCenterByX,
            canvasCenterByY
        }, size);


        this.drawRect({
            x,
            y,
            h: size,
            w: size
        }, {
            color,
            shadowColor: color,
            shadowBlur: blur,
            globalCompositeOperation: "lighter"
        });

    }

}


