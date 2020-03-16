import {compose, filter, forEach, map} from "ramda";

import {ConfigExecutorsInterface, ConfigMotionInterface} from "./type";
import {DrawerInterface} from "../Drawer/type";
import {DotGeneratorInterface} from "../DotGenerator/type";
import {DotMoverInterface} from "../DotMover/type";
import {DotInterface} from "../Dot/type";

export class Motion {
    private config: ConfigMotionInterface;
    private drawer: DrawerInterface;
    private dotGenerator: DotGeneratorInterface<DotInterface>;
    private dotMover: DotMoverInterface<DotInterface>;

    private dots: DotInterface[] = [];

    constructor(configDraw: ConfigMotionInterface, configExecutors: ConfigExecutorsInterface) {
        this.config = configDraw;
        this.drawer = configExecutors.drawer;
        this.dotGenerator = configExecutors.dotGenerator;
        this.dotMover = configExecutors.dotMover;


        this.dotGenerator.setDistance(this.config.distance);
        this.drawer.setConfig({
            bgFillColor: this.config.bgFillColor,
            gradientLen: this.config.gradientLen,
            dotSize: this.config.dotSize
        });
        this.drawer.setHue(this.config.hue);
        this.dotMover.setConfigMover({
            dirsCount: this.config.dirsCount,
            stepToTurn: this.config.stepToTurn,
            dotVelocity: this.config.dotVelocity,
            gridAngle: this.config.gridAngle
        });
    }

    public render(target: string) {
        this.drawer.setTarget(target);
        this.loop();
    }

    private loop() {
        this.step();
        requestAnimationFrame(this.loop.bind(this));
    }

    public step() {
        this.drawer.render();

        this.createDots();
        compose(
            filter(this.dotGenerator.checkLiveTimeAndRemoveDot.bind(this.dotGenerator)),
            map(this.dotMover.moveAndChangeDir.bind(this.dotMover)),
            forEach(this.drawer.redrawDot.bind(this.drawer)),
        )(this.dots as DotInterface[]);
    }

    private createDots() {
        if (this.dots.length < this.config.dotsCount && Math.random() > .8) {
            this.dots.push(...this.dotGenerator.generate());
        }
    }
}