import { INinja } from './INinja';

export class Hokage implements INinja {
  constructor(
      public firstName: string,
      public lastName: string,
      public rank: string,
      public age: number,
      public kageNumber: number
    ) {}

    textDescription() {
      return `My name is ${this.firstName} ${this.lastName}.\nI am the ${this.kageNumber}th ${this.rank}. I am ${this.age} years old.`;
    }

}
