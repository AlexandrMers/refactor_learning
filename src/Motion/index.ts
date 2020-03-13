import {ConfigExecutorsInterface, ConfigMotionInterface} from "./type";
import {DrawerInterface} from "../Drawer/type";
import {DotGeneratorInterface} from "../DotGenerator/type";
import {DotMoverInterface} from "../DotMover/type";
import {DotInterface} from "../Dot/type";

export class Motion {
    public config: ConfigMotionInterface;
    private drawer: DrawerInterface;
    private dotGenerator: DotGeneratorInterface<DotInterface>;
    private dotMover: DotMoverInterface<DotInterface>;

    private count: number;

    private dots: DotInterface[] = [];

    constructor(configDraw: ConfigMotionInterface, configExecutors: ConfigExecutorsInterface) {

        this.config = configDraw;

        this.drawer = configExecutors.drawer;
        this.dotGenerator = configExecutors.dotGenerator;
        this.dotMover = configExecutors.dotMover;

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

        if (this.dots.length < this.config.dotsCount && Math.random() > .8) {
            this.createDots(++this.count);
        }

        this.dots = this.dots.map(dot => {
            this.drawer.redrawDot(dot);
            dot = this.dotMover.move(dot);
            dot = this.dotMover.changeDir(dot);
            return dot;
        }).filter(this.checkLiveTimeAndRemoveDot.bind(this));

    }

    private createDots(count) {
        this.dots.push(...this.dotGenerator.generate(count));
    }

    private checkLiveTimeAndRemoveDot (dot: DotInterface) {
        const percent = Math.random() * .3 * Math.exp(dot.liveTime / this.config.distance);
        if(percent < 100) {
            return true;
        }
        return false;
    }

}