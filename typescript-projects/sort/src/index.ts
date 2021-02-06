import { Sorter } from './Sorter';
import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './Characters-Collection';
import { LinkedList } from './LinkedList';


const numbersCollection = new NumbersCollection([50, 3, -7, 0]);
const numberSorter = new Sorter(numbersCollection);
numberSorter.sort()

const charactersCollection = new CharactersCollection('Xaayb');
const stringSorter = new Sorter(charactersCollection);
stringSorter.sort();

const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);
linkedList.add(4);

const linkedListSorter = new Sorter(linkedList);
linkedListSorter.sort();

console.log(numbersCollection.data);
console.log(charactersCollection.data);
linkedList.print();
