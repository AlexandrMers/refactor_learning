import {compose, mergeRight} from "ramda";

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


// const toDo = (sequenceFunc: ((data?) => any)[], initialValue: any) => {
//     const decoratedFuncs = sequenceFunc.map((func) => (data) => mergeRight(data, func(data)));
//     // @ts-ignore
//     const dataDone = compose(...decoratedFuncs)(initialValue);
//     return {
//         done: (callback: (data: any) => any) => callback(dataDone)
//     }
// };

const bind = <T extends object, K extends object>(func: (data: T) => K) => {
    let acc = {};

    return (params: T) => mergeRight(params, func(params));
};

const result = compose(
    (data) => {},
    bind(() => ({ age: 20})),
    bind(() => ({ year: 2020 })),
);

console.log("result", result);