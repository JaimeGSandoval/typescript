/* eslint-disable*/

// A literal is a more concrete sub - type of a collective type.What this means is that "Hello World" is a string, but a string is not "Hello World" inside the type system.

// There are three sets of literal types available in TypeScript today: strings, numbers, and booleans; by using literal types you can allow an exact value which a string, number, or boolean must have.

// Literal Narrowing

// When you declare a variable via var or let, you are telling the compiler that there is the chance that this variable will change its contents.In contrast, using const to declare a variable will inform TypeScript that this object will never change.

// We're making a guarantee that this variable
// helloWorld will never change, by using const.

// So, TypeScript sets the type to be "Hello World", not string
const helloWorld = "Hello World";

// On the other hand, a let can change, and so the compiler declares it a string
const hiWorld = "Hi World";

// The process of going from an infinite number of potential cases(there are an infinite number of possible string values) to a smaller, finite number of potential case (in helloWorld’s case: 1) is called narrowing.

// String Literal Types
// In practice string literal types combine nicely with union types, type guards, and type aliases.You can use these features together to get enum-like behavior with strings.

type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // It's possible that someone could reach this
      // by ignoring your types though.
    }
  }
}

const button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy");  // Throws an error

// Numeric Literal Types
// TypeScript also has numeric literal types, which act the same as the string literals above.

function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

const result2 = rollDice();

// A common case for their use is for describing config values:

interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}

// setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });

// Boolean Literal Types
// TypeScript also has boolean literal types.You might use these to constrain object values whose properties are interrelated.

interface ValidationSuccess {
  isValid: true;
  reason: null;
}

interface ValidationFailure {
  isValid: false;
  reason: string;
}

type ValidationResult = ValidationSuccess | ValidationFailure;
