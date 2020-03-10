// (() => {

//     const cnv = document.querySelector('canvas');
//     const ctx = cnv.getContext('2d');

//     let cw, ch, cx, cy;

//     function resizeCanvas() {
//         cw = cnv.width = innerWidth;
//         ch = cnv.height = innerHeight;
//         cx = cw / 2;
//         cy = ch / 2;
//     }

//     resizeCanvas();
//     window.addEventListener(`resize`, resizeCanvas);

//     const cfg = {
//         hue: 0,
//         bgFillColor: `rgba(50, 50, 50, .05)`,
//         dirsCount: 6,
//         stepToTurn: 12,
//         dotSize: 4,
//         dotsCount: 300,
//         dotVelocity: 2,
//         distance: 70,
//         gradientLen: 5,
//     }

//     function drawRect(color, x, y, w, h, shadowColor, shadowBlur, gco) {
//         ctx.globalCompositeOperation = gco;
//         ctx.shadowColor = shadowColor || `black`;
//         ctx.shadowBlur = shadowBlur || 1;
//         ctx.fillStyle = color;
//         ctx.fillRect(x, y, w, h);
//     }

//     class Dot {
//         constructor() {
//             this.pos = {x: cx, y: cy};
//             this.dir = (Math.random() * 3 | 0) * 2;
//             this.step = 0;
//         }

//         redrawDot() {
//             let xy = Math.abs(this.pos.x - cx) + Math.abs(this.pos.y - cy);
//             let makeHue = (cfg.hue + xy / cfg.gradientLen) % 360;
//             let color = `hsl(${makeHue}, 100%, 50%)`;
//             let blur = cfg.dotSize - Math.sin(xy / 8) * 2;
//             let size = cfg.dotSize - Math.sin(xy / 9) * 2 + Math.sin(xy / 2);

//             let x = this.pos.x - size / 2;
//             let y = this.pos.y - size / 2;

//             drawRect(color, x, y, size, size, color, blur, `lighter`);
//         }

//         moveDot() {
//             this.step++;
//             this.pos.x += dirsList[this.dir].x * cfg.dotVelocity;
//             this.pos.y += dirsList[this.dir].y * cfg.dotVelocity;
//         }

//         changeDir() {
//             if (this.step % cfg.stepToTurn === 0) {
//                 this.dir = Math.random() > 0.5 ? (this.dir + 1) % cfg.dirsCount : (this.dir + cfg.dirsCount - 1) % cfg.dirsCount;
//             }
//         }

//         killDot(id) {
//             let percent = Math.random() * Math.exp(this.step / cfg.distance);
//             if (percent > 100) {
//                 dotsList.splice(id, 1);
//             }
//         }
//     }

//     let dirsList = [];

//     function createDirs() {
//         for (let i = 0; i < 360; i += 360 / cfg.dirsCount) {
//             let x = Math.cos(i * Math.PI / 180);
//             let y = Math.sin(i * Math.PI / 180);
//             dirsList.push({x: x, y: y});
//         }
//     }

//     createDirs();

//     let dotsList = [];

//     function addDot() {
//         if (dotsList.length < cfg.dotsCount && Math.random() > .8) {
//             dotsList.push(new Dot());
//             cfg.hue = (cfg.hue + 1) % 360;
//         }
//     }

//     function refreshDots() {
//         dotsList.forEach((i, id) => {
//             i.redrawDot();
//             i.moveDot();
//             i.changeDir();
//             i.killDot(id)
//         });
//     }

//     function loop() {
//         drawRect(cfg.bgFillColor, 0, 0, cw, ch, 0, 0, `normal`);
//         addDot();
//         refreshDots();

//         requestAnimationFrame(loop);
//     }

//     loop();

// })();


(() => {

    // REFACTOR =============> REFACTOR =========> REFACTOR =============> REFACTOR =========>

    interface DrawConfigInterface {
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

    interface DrawRectConfigInterface {
        rect: {
            x: number;
            y: number;
            width: number;
            height: number;
        }
        color: string;
        shadowColor: string;
        shadowBlur: number;
        globalCompositeOperation: string;
    }

    interface DirListInterface {
        x: number;
        y: number;
    }

    interface ConfigDotsInterface {
        hue: number;
        dotsCount: number;
    }

    type HtmlCanvasCoordinats = [number, number, number, number];

    class HexagonalMotion {
        private drawConfig: DrawConfigInterface;
        private canvas: HTMLCanvasElement;
        private contextCanvas: any;

        constructor(config: DrawConfigInterface) {
            this.drawConfig = config;
            
            this.runResize();
            
        }

        private runResize() {
            window.addEventListener('resize', () => {
                this.resizeCanvas(this.canvas);
                console.log(this.getDotClass);
            });
        }

        private runnerTasks() {
            this.contextCanvas = this.canvas.getContext("2d");
            this.resizeCanvas(this.canvas);
            this.createDirs(this.drawConfig.dirsCount);
        }


        public renderTo(selector: string) {
            try {
                const elementBySelector: HTMLElement = document.querySelector(selector);
                elementBySelector.innerHTML = `<canvas></canvas>`;
                this.canvas = elementBySelector.querySelector('canvas');
                this.runnerTasks();
            } catch (e) {
                console.error(e)
            }
        };

        public resizeCanvas(canvas: HTMLCanvasElement): HtmlCanvasCoordinats {
            const canvasWidth = canvas.width = innerWidth;
            const canvasHeight = canvas.height = innerHeight;
            const centerByX = canvasWidth / 2;
            const centerByY = canvasHeight / 2;

            return [canvasWidth, canvasHeight, centerByX, centerByY];
        }

        public drawRect(config: DrawRectConfigInterface, context: any): void {
            context.globalCompositeOperation = config.globalCompositeOperation;
            context.shadowColor = config.shadowColor || `black`;
            context.shadowBlur = config.shadowBlur || 1;
            context.fillStyle = config.color;
            context.fillRect({...config.rect}); // будет ли работать?
        }

        private dirsList: DirListInterface[] = [];

        private createDirs(dirsCount: number): void {
            for(let i = 0; i < 360; i += 360 / dirsCount) {
                let x = Math.cos(i * Math.PI / 180);
                let y = Math.sin(i * Math.PI / 180);
                this.dirsList.push({x,y});
            }
        }

        private dotsList: Dot[] = [];

        private dot: Dot;

        set setDotClass(DotClass: any) { // ***** Как здесь типизировать? ********
            const [canvasWidth, canvasHeight, centerByX, centerByY] = this.resizeCanvas(this.canvas);

            this.dot = new DotClass(this.drawConfig, {
                coordinats: {
                    cx: centerByX,
                    cy: centerByY
                },
                dotsList: this.dotsList,
                dirsList: this.dirsList
            });
        }

        get getDotClass() {
            return this.dot;
        }

        private addDot(configDots: ConfigDotsInterface): void {
            if (this.dotsList.length < configDots.dotsCount && Math.random() > .8) {
                this.dotsList.push(this.getDotClass);
                configDots.hue = (configDots.hue + 1) % 360;
            }
        }
    }


    interface CoordinatsDotInterface {
        cx: number;
        cy: number;
    }

    interface DotPositionInterface {
        x: number;
        y: number;
    }

    interface ConfigDotInterface {
        coordinats: CoordinatsDotInterface;
        dotsList: Dot[];
        dirsList: DirListInterface[];
    }

    class Dot {
        private configDraw: DrawConfigInterface;
        private dotsList;
        private dotPosition: DotPositionInterface;
        private dir: number;
        private step: number;
        private coordinats: CoordinatsDotInterface;
        private dirsList: DirListInterface[];
        constructor(configDraw: DrawConfigInterface, configDot: ConfigDotInterface) {

            this.configDraw = configDraw;
            this.dotsList = configDot.dotsList;
            this.dotPosition = {x: configDot.coordinats.cx, y: configDot.coordinats.cy};
            this.coordinats = configDot.coordinats;
            this.dir = (Math.random() * 3 | 0) * 2;
            this.step = 0;
            this.dirsList = configDot.dirsList;
        }

        redrawDot() {
            let xy = Math.abs(this.dotPosition.x - this.coordinats.cx) + Math.abs(this.dotPosition.y - this.coordinats.cy);
            let makeHue = (this.configDraw.hue + xy / this.configDraw.gradientLen) % 360;
            let color = `hsl(${makeHue}, 100%, 50%)`;
            let blur = this.configDraw.dotSize - Math.sin(xy / 8) * 2;
            let size = this.configDraw.dotSize - Math.sin(xy / 9) * 2 + Math.sin(xy / 2);

            let x = this.dotPosition.x - size / 2;
            let y = this.dotPosition.y - size / 2;

            // drawRect(color, x, y, size, size, color, blur, `lighter`);
        }

        moveDot() {
            this.step++;
            this.dotPosition.x += this.dirsList[this.dir].x * this.configDraw.dotVelocity;
            this.dotPosition.y += this.dirsList[this.dir].y * this.configDraw.dotVelocity;
        }

        changeDir() {
            if (this.step % this.configDraw.stepToTurn === 0) {
                this.dir = Math.random() > 0.5 ? (this.dir + 1) % this.configDraw.dirsCount : (this.dir + this.configDraw.dirsCount - 1) % this.configDraw.dirsCount;
            }
        }

        killDot(id) {
            let percent = Math.random() * Math.exp(this.step / this.configDraw.distance);
            if (percent > 100) {
                this.dotsList.splice(id, 1);
            }
        }
    }


    const hexagonalMotion: HexagonalMotion = new HexagonalMotion({
        hue: 0,
        bgFillColor: `rgba(50, 50, 50, .05)`,
        dirsCount: 6,
        stepToTurn: 12,
        dotSize: 4,
        dotsCount: 300,
        dotVelocity: 2,
        distance: 70,
        gradientLen: 5,
    });

    
    hexagonalMotion.renderTo("#block-for-render");
    hexagonalMotion.setDotClass = Dot;
})();