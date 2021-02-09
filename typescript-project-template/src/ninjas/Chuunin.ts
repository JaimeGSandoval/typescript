import { INinja } from './INinja';

export class Chuunin implements INinja {
  constructor(
      public firstName: string,
      public lastName: string,
      public rank: string,
      public age: number
    ){}

    textDescription(): string {
      return
    }
}
