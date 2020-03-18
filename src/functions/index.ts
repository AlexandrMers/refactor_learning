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


const toDo = <D, R>(sequenceFunc: ((data?: (D & R)) => R)[], initialValue: D) => {
    const dataDone = sequenceFunc.reduce((acc, currentFunc) => {
        const resultFunc = currentFunc(acc);
        return {
            ...acc,
            ...resultFunc
        }
    }, initialValue);

    return {
        done: (callback: (data: R) => any) => callback(dataDone)
    }
};

const result = toDo(
    [
        () => ({age: 20}),
        () => ({year: 2020}),
    ],
    {
        name: "Alex"
    }
).done(data => {
    return data;
});

console.log("result", result);