/* eslint-disable */

// example of array declaration in type script
const myArr:string[] = ['chidori', 'rasengan'];

const myNumArr:number[] = [1, 2, 3];

const myUnionArr:(string | number)[] = ['Bankai', 6, 7, 'Oyasumi nasai'];

// Making use of union type to say that the array can hold data types of string and number
const arrOfStringsAndNumbers:(string | number)[] = [];
arrOfStringsAndNumbers.push(7);
arrOfStringsAndNumbers.push('Chidori');

// Array Tuples
const smallTuple:[string, number] = ["hello", 5]; // This tuple allows for only 2 items in the array. They can only be a string and a number and they must be in the order of string and number, just like in the array

const largeTuple:[string, number, string, number, string] = ["one", 1, "two", 2, "three"];
