"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sorter_1 = require("./Sorter");
var NumbersCollection_1 = require("./NumbersCollection");
// NumbersCollection has the functionality to compare and swap number types
var numbersCollection = new NumbersCollection_1.NumbersCollection([10, 3, -7, 0]);
var sorter = new Sorter_1.Sorter(numbersCollection);
// sort() calls the compare() and swap() methods that exist on NumbersCollection
sorter.sort();
console.log(numbersCollection.data);
