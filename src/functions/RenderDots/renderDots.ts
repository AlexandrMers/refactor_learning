import {Dot} from "../../classes/Dot";

export function renderDots(target: string): void {
    const elementForRenderInner: HTMLElement = document.querySelector(target);
    const canvas = document.createElement("canvas");
    const contextCanvas = canvas.getContext("2d");
    elementForRenderInner.appendChild(canvas);

    //
    // return {
    //     drawRect: () => {
    //         contextCanvas.
    //     }
    // };
}


renderDots("#block-for-render1");

function drawDot(
    dot: Dot,
    [canvasCenterByX, canvasCenterByY]: [number, number],
    calculateAngle: Function,
    getAppearRect: Function,
    getCoordinatesRelativeCanvas: Function,
): void {

const angle = calculateAngle({
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
} = getAppearRect(dot, angle);

const [x, y] = getCoordinatesRelativeCanvas(dot, {
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