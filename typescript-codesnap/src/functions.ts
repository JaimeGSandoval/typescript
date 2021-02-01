/* eslint-disable */

// Functions are the fundamental building block of any application in JavaScript.They’re how you build up layers of abstraction, mimicking classes, information hiding, and modules.In TypeScript, while there are classes, namespaces, and modules, functions still play the key role in describing how to do things.TypeScript also adds some new capabilities to the standard JavaScript functions to make them easier to work with.

// To begin, just as in JavaScript, TypeScript functions can be created both as a named function or as an anonymous function.This allows you to choose the most appropriate approach for your application, whether you’re building a list of functions in an API or a one - off function to hand off to another function.

// We can add types to each of the parameters and then to the function itself to add a return type.TypeScript can figure the return type out by looking at the return statements, so we can also optionally leave this off in many cases.

function add(x: number, y: number): number {
  return x + y;
}

const myAdd = function (x: number, y: number): number {
  return x + y;
};


const combineTwoStrings = (firstString: string, secondString: string): string => {
  return firstString + secondString;
}

combineTwoStrings('chi', 'dori');


const multiply = (a: string | number, b: string | number): number | string => {

  const aNumber = typeof a === 'string' ? parseInt(a, 10) : a;
  const bNumber = typeof b === 'string' ? parseInt(b, 10) : b;

  return String(aNumber * bNumber);
}

const multiplyString = multiply(300, 5);
console.log(multiplyString);

console.log(typeof multiply("3", 5));
console.log(typeof multiply(10, "40"));
