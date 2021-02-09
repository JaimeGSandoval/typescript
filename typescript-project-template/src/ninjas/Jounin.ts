import { INinja } from './INinja';

export class Jounin implements INinja {
    constructor(
        public firstName: string,
        public lastName: string,
        public rank: string,
        public age: number,

        public eightGates?: boolean
    ) {}

    textDescription(): string {
    return `My name is ${this.firstName} ${this.lastName}.\nMy ninja rank is ${this.rank}. I am ${this.age} years old. It is ${this.eightGates} that I have unlocked the 8 gates.`;
 }
}
