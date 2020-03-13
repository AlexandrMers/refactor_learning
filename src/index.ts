import {Motion} from "./Motion";
import {DotGenerator} from "./DotGenerator";
import {DotMoverV1, DotMoverV2} from "./DotMover";
import {CanvasDrawerV1, CanvasDrawerV2} from "./Drawer";

const motion = new Motion({
    hue: 0,
    bgFillColor: `rgba(50, 50, 50, .05)`,
    dirsCount: 6,
    stepToTurn: 12,
    dotSize: 4,
    dotsCount: 300,
    dotVelocity: 2,
    distance: 70,
    gradientLen: 5,
}, {
    drawer: new CanvasDrawerV1(),
    dotGenerator: new DotGenerator(),
    dotMover: new DotMoverV1()
});

motion.render("#block-for-render");