// export class NumbersCollection {
//   // LONG VERSION OF INITIALIZING CLASS PROPERTIES AND CONSTRUCTOR
//   // data: number[];
//   // constructor(data: number[]) {
//   //   this.data = data;
//   // }

//   // THIS SHORT VERSION DOES THE SAME AS ABOVE BY ADDING A MODIFIER TO THE PARAMETER
//   constructor(public data: number[]) {}

//   // GETTER NOW MAKES THIS LENGTH METHOD AS A PROPERTY WITH A VALUE WITHOUT CALLING THE METHOD.
//   // JUST USE 'this.collection.length' AND A NUMBER WILL BE RETURNED. DON'T USE PARENTHESIS
//   get length(): number {
//     return this.data.length;
//   }

//   public compare(leftIndex: number, rightIndex: number): boolean {
//         return this.data[leftIndex] > this.data[rightIndex];
//   }

//   public swap(leftIndex: number, rightIndex: number): void {
//       let leftHand = this.data[leftIndex];
//       this.data[leftIndex] = this.data[rightIndex];
//       this.data[rightIndex] = leftHand;
//   }
// }


// SAME AS ABOVE BUT WITH NO NOTES
export class NumbersCollection {
  constructor(public data: number[]) {}
  get length(): number {
    return this.data.length;
  }

  public compare(leftIndex: number, rightIndex: number): boolean {
        return this.data[leftIndex] > this.data[rightIndex];
  }

  public swap(leftIndex: number, rightIndex: number): void {
      let leftHand = this.data[leftIndex];
      this.data[leftIndex] = this.data[rightIndex];
      this.data[rightIndex] = leftHand;
  }
}
