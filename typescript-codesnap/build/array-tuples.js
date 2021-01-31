/* eslint-disable */
// example of array declaration in type script
var myArr = ['chidori', 'rasengan'];
var myNumArr = [1, 2, 3];
var myUnionArr = ['Bankai', 6, 7, 'Oyasumi nasai'];
// Making use of union type to say that the array can hold data types of string and number
var arrOfStringsAndNumbers = [];
arrOfStringsAndNumbers.push(7);
arrOfStringsAndNumbers.push('Chidori');
// Array Tuples
var smallTuple = ["hello", 5]; // This tuple allows for only 2 items in the array. They can only be a string and a number and they must be in the order of string and number, just like in the array
var largeTuple = ["one", 1, "two", 2, "three"];
