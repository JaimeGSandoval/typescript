import { INinja } from './INinja';

export class Hokage implements INinja {
  constructor(
    public firstName: string,
    public lastName: string,
    public rank: string,
    public age: number,
    public kageNumber: number
  ) {}

}
