import {Motion} from "./Motion";
import {DotGenerator} from "./DotGenerator";
import {DotMoverHexagon, DotMoverTrapeze} from "./DotMover";
import {CanvasHexagonDrawer, CanvasTrapezeDrawer} from "./Drawer";


const motion1 = new Motion({
    hue: 0,
    bgFillColor: `rgba(50, 50, 50, .05)`,
    dirsCount: 6,
    stepToTurn: 12,
    dotSize: 4,
    dotsCount: 300,
    dotVelocity: 2,
    distance: 140,
    gradientLen: 5,
}, {
    dotGenerator: new DotGenerator(),
    drawer: new CanvasHexagonDrawer(),
    dotMover: new DotMoverHexagon()
});
motion1.render("#block-for-render1");

const motion2 = new Motion({
    hue: 200,
    bgFillColor: `rgba(50, 50, 50, .01)`,
    dirsCount: 4,
    stepToTurn: 20,
    dotSize: 2,
    dotsCount: 300,
    dotVelocity: 2,
    distance: 200,
    gradientLen: 5,
    gridAngle: 45
}, {
    dotGenerator: new DotGenerator(),
    drawer: new CanvasTrapezeDrawer(),
    dotMover: new DotMoverTrapeze()
});
motion2.render("#block-for-render2");

const motion3 = new Motion({
    hue: 0,
    bgFillColor: `rgba(50, 50, 50, .01)`,
    dirsCount: 3,
    stepToTurn: 20,
    dotSize: 2,
    dotsCount: 300,
    dotVelocity: 2,
    distance: 200,
    gradientLen: 5,
}, {
    dotGenerator: new DotGenerator(),
    drawer: new CanvasTrapezeDrawer(),
    dotMover: new DotMoverTrapeze()
});
motion3.render("#block-for-render3");