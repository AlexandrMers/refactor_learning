import {compose} from "ramda";

let config = {
    hue: 0,
    bgFillColor: `rgba(50, 50, 50, .05)`,
    dirsCount: 6,
    stepToTurn: 12,
    dotSize: 4,
    dotsCount: 300,
    dotVelocity: 2,
    distance: 140,
    gradientLen: 5,
};

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

const infinityReduceLoop = <T>(
    func: (param: T) => T,
    initialValue: T
) => {
    requestAnimationFrame(() => infinityReduceLoop(func, func(initialValue)));
};

// infinityReduceLoop((dots) => {
//     return compose(
//
//     )(dots)
// }, []);

// Do notation =>
// const result = do(
//     () => ({ numb: 1 }),
//     () => ({ msg: "Hello" }),
//     () => ({ msg: "Hello" }),
// ).done(({ numb, msg }) => {
//
//
//     return 1;
// });