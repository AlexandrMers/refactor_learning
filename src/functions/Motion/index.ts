import {ConfigMotionInterface} from "../../classes/Motion/type";

export function motion(config: ConfigMotionInterface, target: string) {
    const configDraw = config;
    const targetEl = target;

    return () => {
        setTarget(targetEl);
        loop();
    };
}

function setTarget(target: string) {
    const elementForRenderInner: HTMLElement = document.querySelector(target);
    const canvas = document.createElement('canvas');
    const contextCanvas = canvas.getContext("2d");
    elementForRenderInner.appendChild(canvas);


    const resizeCanvas = () => {
        canvas.width = elementForRenderInner.clientWidth;
        canvas.height = elementForRenderInner.clientHeight;
    };

    const observerOfResize = () => {
        window.addEventListener('resize', () => {
            resizeCanvas();
        });
    };

    resizeCanvas();
    observerOfResize();
}


function loop() {

}