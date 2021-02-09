import { INinja } from './INinja';

export class Chuunin implements INinja {
    constructor(
        public firstName: string,
        public lastName: string,
        public rank: string,
        public age: number
      ){}

    textDescription(): string {
      return `My name is ${this.firstName} ${this.lastName}.\nMy ninja rank is ${this.rank}. I am ${this.age} years old.`;
    }
  }

// konohamaruText.textContent = `My name is ${konohamaru.firstName} ${konohamaru.lastName}.\nMy ninja rank is ${konohamaru.rank}. I am ${konohamaru.age} years old.`;
