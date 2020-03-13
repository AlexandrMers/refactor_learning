type CoordinatsDrawerInterface = [number, number, number, number];

interface ColorParamsDrawerInterface {
    color: string;
    shadowColor: string | number;
    shadowBlur: number;
    gco: string;
}

interface DrawerInterface {
    render: () => void;
    drawRect: (
        coordinate: CoordinatsDrawerInterface,
        colorParams: ColorParamsDrawerInterface
    ) => void;
    setConfig: (config: ConfigDrawerInterface) => void;
    setTarget: (target: string) => void;
    redrawDot: (dot: ExtendedDotInterface) => void;
}

interface DotInterface {
    y: number;
    x: number;
    liveTime: number;
}

interface ExtendedDotInterface extends DotInterface {
    hue: number;
    setHueValue: (value: number) => void;
}

interface ConfigMoverInterface {
    dotVelocity: number;
    dirsList: DirInterface[];
    stepToTurn: number;
    dirsCount: number;
}

interface DotMoverInterface<DotClass extends DotInterface> {
    move: (dot: DotClass) => DotClass;
    changeDir: (dot: DotClass) => DotClass;
    setConfigMover: (config: ConfigMoverInterface) => void;
}

interface ConfigExecutorsInterface {
    drawer: DrawerInterface;
    dotGenerator: DotGeneratorInterface<ExtendedDotInterface>;
    dotMover: DotMoverInterface<ExtendedDotInterface>;
}

interface DirInterface {
    x: number;
    y: number;
}

interface ConfigMotionInterface {
    hue: number;
    bgFillColor: string;
    dirsCount: number;
    stepToTurn: number;
    dotSize: number;
    dotsCount: number;
    dotVelocity: number;
    distance: number;
    gradientLen: number;
}

class Motion {
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

interface ConfigDotInterface {
    x: number;
    y: number;
    liveTime: number;
    dir: number;
}

class Dot implements ExtendedDotInterface {
    public x: number;
    public y: number;
    public liveTime: number;
    public hue: number;
    public dir: number;

    constructor(configDot: ConfigDotInterface) {
        this.x = configDot.x;
        this.y = configDot.y;
        this.liveTime = configDot.liveTime;
        this.dir = configDot.dir;
    }

    public setHueValue(value: number) {
        this.hue = value;
    }
}

interface DotGeneratorInterface<DotClass extends ExtendedDotInterface> {
    generate: (count: number) => DotClass[];
    setHue: (val: number) => void;
}

class DotGenerator implements DotGeneratorInterface<Dot> {
    private hue: number;

    public setHue(hue) {
        this.hue = hue;
    }

    public generate(count: number): Dot[] {
        const dotsList = [];
        for(let i = 0; i < count; i++) {
            const hueValue = (this.hue + 1) % 360;
            const dir = (Math.random() * 3 | 0) * 2;
            const dot = new Dot({
                x: 0,
                y: 0,
                liveTime: 0,
                dir
            });
            dot.setHueValue(hueValue);
            dotsList.push(dot);
        }
        return dotsList;
    }
}

interface ConfigDrawerInterface {
    bgFillColor: string;
    gradientLen: number;
    dotSize: number;
}

class CanvasDrawer implements DrawerInterface {
    private target: string;

    private canvas: HTMLCanvasElement;
    private contextCanvas: any;
    private elementForRenderInner: HTMLElement;

    private config: ConfigDrawerInterface;

    public setTarget(target: string) {
        this.target = target;

        try {
            this.elementForRenderInner = document.querySelector(this.target);
            this.canvas = document.createElement('canvas');
            this.elementForRenderInner.appendChild(this.canvas);
            this.contextCanvas = this.canvas.getContext("2d");
            this.resizeCanvas();
            this.observerOfResize();
        } catch (error) {
            console.error("Not valid the selector");
        }
    }

    public setConfig(config: ConfigDrawerInterface) {
        this.config = config;
    }

    public render(): void {
        try {
            this.drawRect([0, 0, this.canvas.width, this.canvas.height], {
                shadowColor: 0,
                shadowBlur: 0,
                color: this.config.bgFillColor,
                gco: 'normal'
            });

        } catch (error) {
            console.error("Not valid the selector");
        }
    }

    public resizeCanvas() {
        this.canvas.width = this.elementForRenderInner.clientWidth;
        this.canvas.height = this.elementForRenderInner.clientHeight;
    }

    public observerOfResize() {
        window.addEventListener('resize', () => {
           this.resizeCanvas();
        });
    }

    public drawRect(coordinate: CoordinatsDrawerInterface, colorParams: ColorParamsDrawerInterface) {
        this.contextCanvas.globalCompositeOperation = colorParams.gco;
        this.contextCanvas.shadowColor = colorParams.shadowColor || `black`;
        this.contextCanvas.shadowBlur = colorParams.shadowBlur || 1;
        this.contextCanvas.fillStyle = colorParams.color;
        this.contextCanvas.fillRect(...coordinate);
    }

    public redrawDot(dot: Dot) {
        const canvasCenterByX = this.canvas.width / 2;
        const canvasCenterByY = this.canvas.height / 2;
        let xy = Math.abs(dot.x - canvasCenterByX) + Math.abs(dot.y - canvasCenterByY);
        let makeHue = (dot.hue + xy / this.config.gradientLen) % 360;
        let color = `hsl(${makeHue}, 100%, 50%)`;
        let blur = this.config.dotSize - Math.sin(xy / 8) * 2;
        let size = this.config.dotSize - Math.sin(xy / 9) * 2 + Math.sin(xy / 2);
        let x = dot.x - size / 2;
        let y = dot.y - size / 2;

        this.drawRect([x, y, size, size], {
            color,
            shadowColor: color,
            shadowBlur: blur,
            gco: "lighter"
        });
    }
}

class DotMover implements DotMoverInterface<Dot> {
    private configMove: ConfigMoverInterface;


    setConfigMover(config: ConfigMoverInterface) {
        this.configMove = config;
    };

   public move(dot: Dot) {
       dot.liveTime++;
       dot.x += this.configMove.dirsList[dot.dir].x * this.configMove.dotVelocity;
       dot.y += this.configMove.dirsList[dot.dir].y * this.configMove.dotVelocity;

       return dot;
   }

   changeDir(dot: Dot) {
       if (dot.liveTime % this.configMove.stepToTurn === 0) {
           dot.dir = Math.random() > 0.5 ? (dot.dir + 1) % this.configMove.dirsCount : (dot.dir + this.configMove.dirsCount - 1) % this.configMove.dirsCount;
       }
       return dot;
   }
}

const motion = new Motion({
    hue: 0,
    bgFillColor: `rgba(50, 50, 50, .05)`,
    dirsCount: 6,
    stepToTurn: 12,
    dotSize: 4,
    dotsCount: 300,
    dotVelocity: 2,
    distance: 70,
    gradientLen: 5,
}, {
    drawer: new CanvasDrawer(),
    dotGenerator: new DotGenerator(),
    dotMover: new DotMover()
});

motion.render("#block-for-render");