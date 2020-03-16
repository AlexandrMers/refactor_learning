import {Motion} from "./Motion";
import {DotGenerator} from "./DotGenerator";
import {DotMoverHexagon, DotMoverTrapeze} from "./DotMover";
import {CanvasHexagonDrawer, CanvasTrapezeDrawer} from "./Drawer";


enum Variants {
    HEXAGONAL = "hexagonal",
    TRAPEZE = "trapeze",
    TRIANGLE = "triangle"
}


// const mapVariantsMotion = {
//   [Variants.HEXAGONAL]: () => {
//       return new Motion();
//   }
// };


const motion = new Motion({
    hue: 100,
    bgFillColor: `rgba(50, 50, 50, .01)`,
    dirsCount: 3,
    stepToTurn: 20,
    dotSize: 2,
    dotsCount: 300,
    dotVelocity: 2,
    distance: 200,
    gradientLen: 5,
}, {
    drawer: new CanvasTrapezeDrawer(),
    dotGenerator: new DotGenerator(),
    dotMover: new DotMoverTrapeze()
});

motion.render("#block-for-render");