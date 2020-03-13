import {ConfigMoverInterface, DotMoverInterface} from "./type";
import {Dot} from "../Dot";
import {DirInterface} from "../Motion/type";

export class DotMover implements DotMoverInterface<Dot> {
    private dirsList: DirInterface[] = [];

    private configMove: ConfigMoverInterface;

    setConfigMover(config: ConfigMoverInterface) {
        this.configMove = config;
        this.createDirs(this.configMove.dirsCount);
    };

    public move(dot: Dot) {
        dot.liveTime++;
        dot.x += this.dirsList[dot.dir].x * this.configMove.dotVelocity;
        dot.y += this.dirsList[dot.dir].y * this.configMove.dotVelocity;

        return dot;
    }

    changeDir(dot: Dot) {
        if (dot.liveTime % this.configMove.stepToTurn === 0) {
            dot.dir = Math.random() > 0.5 ? (dot.dir + 1) % this.configMove.dirsCount : (dot.dir + this.configMove.dirsCount - 1) % this.configMove.dirsCount;
        }
        return dot;
    }

    private createDirs(dirsCount: number) {
        for(let i = 0; i < 360; i += 360 / dirsCount) {
            const x = Math.cos(i * Math.PI / 180);
            const y = Math.sin(i * Math.PI / 180);
            this.dirsList.push({x, y});
        }
    }

}