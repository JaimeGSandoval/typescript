import { INinja } from './INinja';

export class Jounin implements INinja {
    constructor(
    public firstName: string,
    public lastName: string,
    public rank: string,
    public age: number,

    public eightGates?: boolean
    ) {}
}
