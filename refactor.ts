type CoordinatsDrawerInterface = [number, number, number, number];

interface ColorParamsDrawerInterface {
    color: string;
    shadowColor: number;
    shadowBlur: number;
    gco: string;
}

interface DrawerInterface {
    render: (target: string) => void;
    drawRect: (
        coordinate: CoordinatsDrawerInterface,
        colorParams: ColorParamsDrawerInterface
    ) => void;
    setConfig: (config: ConfigDrawerInterface) => void;
}

interface LifeCycleDotInterface<DotClass extends DotInterface> {
    checkLiveTimeAndRemoveDots: (dot: DotClass) => void;
    recreateDots: (dots: DotClass[]) => void;
}

interface DotInterface {
    x: number;
    y: number;
    liveTime: number;
    hue: number;
    setHueValue: (value: number) => void;
}

interface DotGeneratorConfig {
    count: number;
    hue: number;
}

interface DotMoverInterface<DotClass extends DotInterface> {
    move: (dot: DotClass) => DotClass;
}

interface ConfigExecutorsInterface {
    drawer: DrawerInterface;
    dotGenerator: DotGeneratorInterface<DotInterface>;
    dotMover: DotMoverInterface<DotInterface>;
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
    private dotGenerator: DotGeneratorInterface<DotInterface>;
    private dotMover: DotMoverInterface<DotInterface>;
    private lifeCycleDot: LifeCycleDotInterface<DotInterface>;
    private dirsList: DirInterface[];

    private dots: DotInterface[];
    private target: string;

    constructor(configDraw: ConfigMotionInterface, configExecutors: ConfigExecutorsInterface) {
        this.config = configDraw;

        this.drawer = configExecutors.drawer;
        this.dotGenerator = configExecutors.dotGenerator;
        this.dotMover = configExecutors.dotMover;

        this.dotGenerator.setHue(this.config.hue);
    }

    public render(target: string) {
        this.target = target;
        this.loop();
    }

    private loop() {
        this.step();
        requestAnimationFrame(this.loop);
    }

    private step() {
        this.drawer.setConfig({
            bgFillColor: this.config.bgFillColor
        });
        this.drawer.render(this.target);

        if (this.dots.length < this.config.dotsCount && Math.random() > .8) {
            this.createDots((this.config.dotsCount - this.dots.length) * .3);
        }

        this.dots = this.dots.map(this.dotMover.move);
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

class Dot implements DotInterface {
    public x;
    public y;
    public liveTime;
    public hue;

    constructor(x, y, liveTime) {
        this.x = x;
        this.y = y;
        this.liveTime = liveTime;
    }

    public setHueValue(value: number) {
        this.hue = value;
    }
}

interface DotGeneratorInterface<DotClass extends DotInterface> {
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
        const hueValue = (this.hue + 1) % 360;
        const dot = new Dot(0, 0, 0);
        dot.setHueValue(hueValue);
        dotsList.push(dot);
        return dotsList;
    }
}

interface ConfigDrawerInterface {
    bgFillColor: string;
}

class CanvasDrawer implements DrawerInterface {
    private canvas: HTMLCanvasElement = document.createElement('canvas');
    private contextCanvas: any = this.canvas.getContext("2d");

    private config: ConfigDrawerInterface;

    private canvasWidth: number;
    private canvasHeight: number;
    private canvasCenterByX: number;
    private canvasCenterByY: number;

    public setConfig(config: ConfigDrawerInterface) {
        this.config = config;
    }

    public render(target: string): void {
        try {
            const elementForRenderInner: HTMLElement = document.querySelector(target);
            elementForRenderInner.appendChild(this.canvas);

            this.resizeCanvas();
            this.observerOfResize();

            this.drawRect([0, 0, this.canvasWidth, this.canvasHeight], {
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
        this.canvasWidth = this.canvas.width = innerWidth;
        this.canvasHeight = this.canvasHeight = innerHeight;
        this.canvasCenterByX = this.canvasWidth / 2;
        this.canvasCenterByY = this.canvasHeight / 2;
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
}