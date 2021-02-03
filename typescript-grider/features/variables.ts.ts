// Variable Annotations
const apples: number = 5;
const speed: string = 'fast';
const hasName: boolean = true;

const nothingMuch: null = null;
const nothing: undefined = undefined;


// Built in objects Annotation
const now: Date = new Date();


// Array Annotation
const colors: string[] = ['red', 'green', 'blue'];
const numbers: number[] = [1, 2, 3, 4];
const truths: boolean[] = [true, true, false];


// Classes
class Car {

}

// Class Annotation
// capitalized types represent class types and lower cased vars of the same name are instances
const car: Car = new Car();


// Object Literal Annotation
const point: {x: number; y: number} = {
  x: 10,
  y: 20
};


// Function Annotation - '(i: number) => void' is for the annotation of the logNumber variable and not the function
const logNumber:  (i: number) => void = (i: number) => {
  console.log(i);
};


// When to use type annotations.

// 1. Function that returns 'any'
const json = '{"x": 10, "y": 4}';
const coordinates: {x: number; y: number} = JSON.parse(json); // if the obj annotation wasn't there this would be 'any' type
console.log(coordinates); // {x: 10, y: 4}

// 2. When we declare a variable on one line and initialize it later
let words = ['red', 'green', 'blue'];
let foundWord: boolean;
// let foundWord = false; // could've just done this too. Typescript would then know it's a boolean

for(let i = 0; i < words.length; i++) {
  if(words[i] === 'green') {
    foundWord = true;
  }
}

// 3. Variable whose type cannot be inferred
let arrNumbers = [-10, 3, 10];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < arrNumbers.length; i++) {
  if(arrNumbers[i] > 0) {
    numberAboveZero = arrNumbers[i];
  }
}
