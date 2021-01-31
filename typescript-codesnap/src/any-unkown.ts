/* eslint-disable */

let myAnyVariable: any;

myAnyVariable = "Bankai";
myAnyVariable = "Chidori";
myAnyVariable = {
  greeting: "Ohayo!",
};

// These won't throw an error because anyVariable is set to any. These properties don't actually exist.
// /Don't use Any
const property = myAnyVariable.doesNotExist;
myAnyVariable.sayHello();


let myUnknownVariable: unknown;

myUnknownVariable = "Hello There!";

myUnknownVariable = "Bankai";
myUnknownVariable = "Chidori";
myUnknownVariable = {
  greeting: "Hello There!",
};


// Throws an error
// const unknownProperty = myUnknownVariable.doesNotExist;
// Throws an error
// myUnknownVariable.sayHello();
