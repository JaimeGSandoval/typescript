// export abstract class Sorter {
//   // abstract is used to tell typescript that even though these methods and properties don't exist in Sortable, they'll eventually exist and be used by some child class. Child class MUST implement the methods on in their own class
//     abstract compare(leftIndex: number, rightIndex: number): boolean;
//     abstract swap(leftIndex: number, rightIndex: number): void;
//     abstract length: number;

// // LONG VERSION OF INITIALIZING CLASS PROPERTIES AND CONSTRUCTOR
// // collection: Sortable;
// // constructor(collection: Sortable) {
// // this.collection = collection;
// // }

// // SHORT VERSION OF ABOVE FOR INITIALIZING CLASS PROPERTIES AND CONSTRUCTOR
//   // constructor(public collection: Sortable) { }

//     public sort(): void {
//     // const { length } = this.collection;
//     const { length } = this;

//     for(let i = 0; i < length; i++) {
//       for(let j = 0; j < length - i - 1; j++) {
//         // if(this.collection.compare(j, j + 1)) {
//         if(this.compare(j, j + 1)) {
//         //  this.collection.swap(j, j + 1);
//            this.swap(j, j + 1);
//         }
//       }
//     }
//   }
// }
