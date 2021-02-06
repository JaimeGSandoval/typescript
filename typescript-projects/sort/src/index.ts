import { Sorter } from './Sorter';
import { NumbersCollection } from './NumbersCollection';

// NumbersCollection has the functionality to compare and swap number types
const numbersCollection = new NumbersCollection([10, 3, -7, 0]);

const sorter = new Sorter(numbersCollection);

// sort() calls the compare() and swap() methods that exist on NumbersCollection
sorter.sort();
console.log(numbersCollection.data);
