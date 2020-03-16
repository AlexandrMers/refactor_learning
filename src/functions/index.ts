// import {motion} from "./Motion";
//
// let config = {
//     hue: 0,
//     bgFillColor: `rgba(50, 50, 50, .05)`,
//     dirsCount: 6,
//     stepToTurn: 12,
//     dotSize: 4,
//     dotsCount: 300,
//     dotVelocity: 2,
//     distance: 140,
//     gradientLen: 5,
// };
// const motion1 = motion(config, "#block-for-render1");
//
// motion1();
//
//
//
// const pure = x => x + x;
// const loop = () => {};
//
// render("#block-for-render1");
//
//
// const tap = (func: () => void, data: any) => {
//     func();
//     return data;
// };

// run(
//     compose(
//         loop((dots) => {
//             return compose(
//                 reCreateDots(),
//                 checkLiveTimeAndRemoveDot,
//                 map(moveAndChangeDir),
//                 // tap(renderDots("#foo")()),
//             )(dots)
//         }, []),
//         initConfig(config),
//     )
// );
//
// const { drawRect } = canvasContextBuilder("#foo");

