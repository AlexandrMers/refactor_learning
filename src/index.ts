import {Motion} from "./Motion";
import {CanvasDrawer} from "./Drawer";
import {DotGenerator} from "./DotGenerator";
import {DotMover} from "./DotMover";

const motion = new Motion({
    hue: 0,
    bgFillColor: `rgba(50, 50, 50, .05)`,
    dirsCount: 6,
    stepToTurn: 6,
    dotSize: 4,
    dotsCount: 300,
    dotVelocity: 4,
    distance: 70,
    gradientLen: 5,
}, {
    drawer: new CanvasDrawer(),
    dotGenerator: new DotGenerator(),
    dotMover: new DotMover()
});

motion.render("#block-for-render");