import {ConfigMoverInterface, DotMoverInterface} from "./type";
import {Dot} from "../Dot";

export class DotMover implements DotMoverInterface<Dot> {
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