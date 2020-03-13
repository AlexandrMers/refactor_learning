import {ConfigExecutorsInterface, ConfigMotionInterface, DirInterface} from "./type";
import {DrawerInterface} from "../Drawer/type";
import {DotGeneratorInterface} from "../DotGenerator/type";
import {DotMoverInterface} from "../DotMover/type";
import {ExtendedDotInterface} from "../Dot/type";

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

        this.createDirs(this.config.dirsCount);

        this.dotMover.setConfigMover({
            dirsCount: this.config.dirsCount,
            stepToTurn: this.config.stepToTurn,
            dotVelocity: this.config.dotVelocity,
            dirsList: this.dirsList
        });

        this.dotGenerator.setHue(this.config.hue);


        this.drawer.setConfig({
            bgFillColor: this.config.bgFillColor,
            gradientLen: this.config.gradientLen,
            dotSize: this.config.dotSize
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
            this.createDots((this.config.dotsCount - this.dots.length) * .3);
        }


        this.dots.forEach(dot => this.drawer.redrawDot(dot));

        this.dots = this.dots.map(this.dotMover.move);
        this.dots = this.dots.map(this.dotMover.changeDir);
        this.checkLiveTimeAndRemoveDots();
    }

    private createDots(count) {
        this.dots = this.dotGenerator.generate(count);
    }

    private checkLiveTimeAndRemoveDots () {
        this.dots = this.dots.map(dot => {
            dot.liveTime += 1;
            return dot;
        }).filter(dot => {
            let percent = Math.random() * Math.exp(dot.liveTime / this.config.distance);
            return percent < 100;
        })
    }

    private createDirs(dirsCount: number) {
        for(let i = 0; i < 360; i += 360 / dirsCount) {
            const x = Math.cos(i * Math.PI / 180);
            const y = Math.sin(i * Math.PI / 180);
            this.dirsList.push({x, y});
        }
    }
}