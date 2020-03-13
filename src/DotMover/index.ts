import {DotMoverBase} from "./DotMoverBase";

export class DotMoverV1 extends DotMoverBase {
    createDir(): void {
        this.dir = (Math.random() * 3 | 0) * 2;
    }

    createDirs(dirsCount: number) {
        for (let i = 0; i < 360; i += 360 / dirsCount) {
            const x = Math.cos(i * Math.PI / 180);
            const y = Math.sin(i * Math.PI / 180);
            this.dirsList.push({x, y});
        }
    }
}

export class DotMoverV2 extends DotMoverBase {
    createDir(): void {
        if(this.configMove.dirsCount !== 6) {
            this.dir = Math.random() * this.configMove.dirsCount | 0
        }
        this.dir = (Math.random() * 3 | 0) * 2;
    }

    createDirs(dirsCount: number) {
        for (let i = 0; i < 360; i += 360 / dirsCount) {
            const param = this.configMove.gridAngle ? (this.configMove.gridAngle + i) : i;
            const x = Math.cos(param * Math.PI / 180);
            const y = Math.sin(param * Math.PI / 180);
            this.dirsList.push({x, y});
        }
    }
}