// (() => {
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
(function () {
    // REFACTOR =============> REFACTOR =========> REFACTOR =============> REFACTOR =========>
    var HexagonalMotion = /** @class */ (function () {
        function HexagonalMotion(config) {
            this.dirsList = [];
            this.dotsList = [];
            this.drawConfig = config;
            this.runResize();
        }
        HexagonalMotion.prototype.runResize = function () {
            var _this = this;
            window.addEventListener('resize', function () {
                _this.resizeCanvas(_this.canvas);
                console.log(_this.getDotClass);
            });
        };
        HexagonalMotion.prototype.runnerTasks = function () {
            this.contextCanvas = this.canvas.getContext("2d");
            this.resizeCanvas(this.canvas);
            this.createDirs(this.drawConfig.dirsCount);
        };
        HexagonalMotion.prototype.renderTo = function (selector) {
            try {
                var elementBySelector = document.querySelector(selector);
                elementBySelector.innerHTML = "<canvas></canvas>";
                this.canvas = elementBySelector.querySelector('canvas');
                this.runnerTasks();
            }
            catch (e) {
                console.error(e);
            }
        };
        ;
        HexagonalMotion.prototype.resizeCanvas = function (canvas) {
            var canvasWidth = canvas.width = innerWidth;
            var canvasHeight = canvas.height = innerHeight;
            var centerByX = canvasWidth / 2;
            var centerByY = canvasHeight / 2;
            return [canvasWidth, canvasHeight, centerByX, centerByY];
        };
        HexagonalMotion.prototype.drawRect = function (config, context) {
            context.globalCompositeOperation = config.globalCompositeOperation;
            context.shadowColor = config.shadowColor || "black";
            context.shadowBlur = config.shadowBlur || 1;
            context.fillStyle = config.color;
            context.fillRect(__assign({}, config.rect)); // будет ли работать?
        };
        HexagonalMotion.prototype.createDirs = function (dirsCount) {
            for (var i = 0; i < 360; i += 360 / dirsCount) {
                var x = Math.cos(i * Math.PI / 180);
                var y = Math.sin(i * Math.PI / 180);
                this.dirsList.push({ x: x, y: y });
            }
        };
        Object.defineProperty(HexagonalMotion.prototype, "setDotClass", {
            set: function (DotClass) {
                var _a = this.resizeCanvas(this.canvas), canvasWidth = _a[0], canvasHeight = _a[1], centerByX = _a[2], centerByY = _a[3];
                this.dot = new DotClass(this.drawConfig, {
                    coordinats: {
                        cx: centerByX,
                        cy: centerByY
                    },
                    dotsList: this.dotsList,
                    dirsList: this.dirsList
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HexagonalMotion.prototype, "getDotClass", {
            get: function () {
                return this.dot;
            },
            enumerable: true,
            configurable: true
        });
        HexagonalMotion.prototype.addDot = function (configDots) {
            if (this.dotsList.length < configDots.dotsCount && Math.random() > .8) {
                this.dotsList.push(this.getDotClass);
                configDots.hue = (configDots.hue + 1) % 360;
            }
        };
        return HexagonalMotion;
    }());
    var Dot = /** @class */ (function () {
        function Dot(configDraw, configDot) {
            this.configDraw = configDraw;
            this.dotsList = configDot.dotsList;
            this.dotPosition = { x: configDot.coordinats.cx, y: configDot.coordinats.cy };
            this.coordinats = configDot.coordinats;
            this.dir = (Math.random() * 3 | 0) * 2;
            this.step = 0;
            this.dirsList = configDot.dirsList;
        }
        Dot.prototype.redrawDot = function () {
            var xy = Math.abs(this.dotPosition.x - this.coordinats.cx) + Math.abs(this.dotPosition.y - this.coordinats.cy);
            var makeHue = (this.configDraw.hue + xy / this.configDraw.gradientLen) % 360;
            var color = "hsl(" + makeHue + ", 100%, 50%)";
            var blur = this.configDraw.dotSize - Math.sin(xy / 8) * 2;
            var size = this.configDraw.dotSize - Math.sin(xy / 9) * 2 + Math.sin(xy / 2);
            var x = this.dotPosition.x - size / 2;
            var y = this.dotPosition.y - size / 2;
            // drawRect(color, x, y, size, size, color, blur, `lighter`);
        };
        Dot.prototype.moveDot = function () {
            this.step++;
            this.dotPosition.x += this.dirsList[this.dir].x * this.configDraw.dotVelocity;
            this.dotPosition.y += this.dirsList[this.dir].y * this.configDraw.dotVelocity;
        };
        Dot.prototype.changeDir = function () {
            if (this.step % this.configDraw.stepToTurn === 0) {
                this.dir = Math.random() > 0.5 ? (this.dir + 1) % this.configDraw.dirsCount : (this.dir + this.configDraw.dirsCount - 1) % this.configDraw.dirsCount;
            }
        };
        Dot.prototype.killDot = function (id) {
            var percent = Math.random() * Math.exp(this.step / this.configDraw.distance);
            if (percent > 100) {
                this.dotsList.splice(id, 1);
            }
        };
        return Dot;
    }());
    var hexagonalMotion = new HexagonalMotion({
        hue: 0,
        bgFillColor: "rgba(50, 50, 50, .05)",
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
