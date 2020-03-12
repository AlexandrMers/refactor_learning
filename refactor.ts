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


interface DotMoverInterface<DotClass extends DotInterface> {
    move: (dot: DotClass) => DotClass;
    setDotVelocity: (value: number) => void;
    setDirsList: (list: DirInterface[]) => void;
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
    private dirsList: DirInterface[];

    private dots: ExtendedDotInterface[];
    private target: string;

    constructor(configDraw: ConfigMotionInterface, configExecutors: ConfigExecutorsInterface) {

        this.config = configDraw;

        this.drawer = configExecutors.drawer;
        this.dotGenerator = configExecutors.dotGenerator;
        this.dotMover = configExecutors.dotMover;

        this.createDirs(this.config.dirsCount);

        this.dotMover.setDirsList(this.dirsList);

        this.dotGenerator.setHue(this.config.hue);

        this.dotMover.setDotVelocity(this.config.dotVelocity);

        this.drawer.setConfig({
            bgFillColor: this.config.bgFillColor,
            gradientLen: this.config.gradientLen,
            dotSize: this.config.dotSize
        });
    }

    public render(target: string) {
        this.target = target;
        this.drawer.setTarget(this.target);
        this.loop();
    }

    private loop() {
        this.step();
        requestAnimationFrame(this.loop);
    }

    private step() {
        this.drawer.render();

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

interface RedrawConfigInterface {
    x: number;
    y: number;
    hue: number;
}

class CanvasDrawer implements DrawerInterface {
    private target: string;
    private canvas: HTMLCanvasElement;
    private contextCanvas: any;
    private elementForRenderInner: HTMLElement;

    private config: ConfigDrawerInterface;

    private canvasWidth: number;
    private canvasHeight: number;
    private canvasCenterByX: number;
    private canvasCenterByY: number;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.contextCanvas = this.canvas.getContext("2d");

        this.elementForRenderInner = document.querySelector(this.target);
        this.elementForRenderInner.appendChild(this.canvas);

        this.resizeCanvas();
        this.observerOfResize();
    }

    public setTarget(target: string) {
        this.target = target;
    }

    public setConfig(config: ConfigDrawerInterface) {
        this.config = config;
    }

    public render(): void {
        try {

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

    public redrawDot(redrawConfig: RedrawConfigInterface) {
        let xy = Math.abs(redrawConfig.x - this.canvasCenterByX) + Math.abs(redrawConfig.y - this.canvasCenterByY);
        let makeHue = (redrawConfig.hue + xy / this.config.gradientLen) % 360;
        let color = `hsl(${makeHue}, 100%, 50%)`;
        let blur = this.config.dotSize - Math.sin(xy / 8) * 2;
        let size = this.config.dotSize - Math.sin(xy / 9) * 2 + Math.sin(xy / 2);
        let x = redrawConfig.x - size / 2;
        let y = redrawConfig.y - size / 2;

        this.drawRect([x, y, size, size], {
            color,
            shadowColor: color,
            shadowBlur: blur,
            gco: "lighter"
        });
    }
}

interface ConfigMoveInterface extends DotInterface {
    dir: number;
}

class DotMover implements DotMoverInterface<Dot> {

    private liveTime: number;
    private x: number;
    private y: number;
    private dotVelocity: number;
    private dirsList: DirInterface[];

    setDotVelocity(value: number) {
        this.dotVelocity = value;
    }

    setDirsList(list: DirInterface[]) {
        this.dirsList = list;
    }

   public move(dot: Dot) {
       dot.liveTime++;
       dot.x += this.dirsList[dot.dir].x * this.dotVelocity;
       dot.y += this.dirsList[dot.dir].y * this.dotVelocity;

       return dot;
   }
}