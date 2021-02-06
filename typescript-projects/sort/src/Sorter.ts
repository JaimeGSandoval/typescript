
// interface Sortable {
//   length: number;
//   compare(leftIndex: number, rightIndex: number): boolean;
//   swap(lefIndex: number, rightIndex: number): void;
// }

// export class Sorter {

// // LONG VERSION OF INITIALIZING CLASS PROPERTIES AND CONSTRUCTOR
// // collection: Sortable;
// // constructor(collection: Sortable) {
// // this.collection = collection;
// // }

// // SHORT VERSION OF ABOVE FOR INITIALIZING CLASS PROPERTIES AND CONSTRUCTOR
//   constructor(public collection: Sortable) { }

//     public sort(): void {
//     const { length } = this.collection;

//     for(let i = 0; i < length; i++) {
//       for(let j = 0; j < length - i - 1; j++) {
//         if(this.collection.compare(j, j + 1)) {
//          this.collection.swap(j, j + 1);
//         }
//       }
//     }
//   }
// }



// SAME AS ABOVE BUT WITH NO NOTES
interface Sortable {
  length: number;
  compare(leftIndex: number, rightIndex: number): boolean;
  swap(lefIndex: number, rightIndex: number): void;
}

export class Sorter {
  constructor(public collection: Sortable) { }

    public sort(): void {
    const { length } = this.collection;

    for(let i = 0; i < length; i++) {
      for(let j = 0; j < length - i - 1; j++) {
        if(this.collection.compare(j, j + 1)) {
         this.collection.swap(j, j + 1);
        }
      }
    }
  }
}
