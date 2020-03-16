import {ConfigMoverInterface, DotMoverInterface} from "../type";
import {Dot} from "../../Dot";
import {DirInterface} from "../../Motion/type";

export abstract class DotMoverBase implements DotMoverInterface<Dot> {
    public dirsList: DirInterface[] = [];
    public dir: number;
    public configMove: ConfigMoverInterface;

    setConfigMover(config: ConfigMoverInterface) {
        this.configMove = config;
        this.createDir();
        this.createDirs(this.configMove.dirsCount);
    };

    public moveAndChangeDir(dot: Dot) {
        dot.liveTime++;
        dot.x += this.dirsList[dot.direction].x * this.configMove.dotVelocity;
        dot.y += this.dirsList[dot.direction].y * this.configMove.dotVelocity;

        return this.changeDir(dot);
    }

    private changeDir(dot: Dot) {
        if (dot.liveTime % this.configMove.stepToTurn === 0) {
            dot.direction = Math.random() > 0.5 ? (dot.direction + 1) % this.configMove.dirsCount : (dot.direction + this.configMove.dirsCount - 1) % this.configMove.dirsCount;
        }
        return dot;
    }

    abstract createDirs(dirsCount: number): void;

    abstract createDir(): void;

}