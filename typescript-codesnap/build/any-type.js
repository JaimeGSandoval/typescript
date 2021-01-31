/* eslint-disable */
// OK, return value of 'getValue' is not checked
var str = getValue("myString");
// The any type is a powerful way to work with existing JavaScript, allowing you to gradually
// opt -in and opt - out of type checking during compilation.
// Unlike unknown, variables of type any allow you to access arbitrary properties, even ones
// that don’t exist.These properties include functions and TypeScript will not check their existence
// or type:
var looselyTyped = 4;
// OK, ifItExists might exist at runtime
looselyTyped.ifItExists();
// OK, toFixed exists (but the compiler doesn't check)
looselyTyped.toFixed();
var strictlyTyped = 4;
// strictlyTyped.toFixed(); // Throws error
// Object is of type 'unknown'.
// The any will continue to propagate through your objects:
var looselyTyped2 = {};
var d = looselyTyped2.a.b.c.d;
//  ^ = let d: any
