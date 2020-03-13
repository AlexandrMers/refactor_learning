import "./style.css";

export class Hero {
    id: number;
    name: string;

    constructor(name) {
        this.name = name;
    }

    myName() {
        return this.name;
    }
}

let hero = new Hero('rthrthrth');
console.log(hero.myName());