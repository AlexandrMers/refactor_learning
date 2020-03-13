import {ConfigExecutorsInterface, ConfigMotionInterface, DirInterface} from "./type";
import {DrawerInterface} from "../Drawer/type";
import {DotGeneratorInterface} from "../DotGenerator/type";
import {DotMoverInterface} from "../DotMover/type";
import {DotInterface, ExtendedDotInterface} from "../Dot/type";

export class Motion {
    public config: ConfigMotionInterface;

    private drawer: DrawerInterface;
    private dotGenerator: DotGeneratorInterface<ExtendedDotInterface>;
    private dotMover: DotMoverInterface<ExtendedDotInterface>;
    private dirsList: DirInterface[] = [];

    private dots: ExtendedDotInterface[] = [];

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

        this.dotMover.setConfigMover({
            dirsCount: this.config.dirsCount,
            stepToTurn: this.config.stepToTurn,
            dotVelocity: this.config.dotVelocity,
            dirsList: this.dirsList
        });

        this.dotGenerator.setHue(this.config.hue);
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
            const count = (this.config.dotsCount - this.dots.length) * .3;
            this.createDots(count);
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
        if (percent > 100) {
            return false;
        }
        return true;
    }

}