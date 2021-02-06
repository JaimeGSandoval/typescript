"use strict";
// export class NumbersCollection {
//   // LONG VERSION OF INITIALIZING CLASS PROPERTIES AND CONSTRUCTOR
//   // data: number[];
//   // constructor(data: number[]) {
//   //   this.data = data;
//   // }
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumbersCollection = void 0;
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
// SAME CODE AS ABOVE BUT NO NOTES
var NumbersCollection = /** @class */ (function () {
    function NumbersCollection(data) {
        this.data = data;
    }
    Object.defineProperty(NumbersCollection.prototype, "length", {
        get: function () {
            return this.data.length;
        },
        enumerable: false,
        configurable: true
    });
    NumbersCollection.prototype.compare = function (leftIndex, rightIndex) {
        return this.data[leftIndex] > this.data[rightIndex];
    };
    NumbersCollection.prototype.swap = function (leftIndex, rightIndex) {
        var leftHand = this.data[leftIndex];
        this.data[leftIndex] = this.data[rightIndex];
        this.data[rightIndex] = leftHand;
    };
    return NumbersCollection;
}());
exports.NumbersCollection = NumbersCollection;
