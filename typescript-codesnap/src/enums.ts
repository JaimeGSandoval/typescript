/* eslint-disable */

// A helpful addition to the standard set of datatypes from JavaScript is the enum.As in languages like C#, an enum is a way of giving more friendly names to sets of values.

enum Color {
  Red,
  Green,
  Blue,
}
const c: Color = Color.Green;

// By default, enums begin numbering their members starting at 0. You can change this by manually setting the value of one of its members.For example, we can start the previous example at 1 instead of 0:

enum Color2 {
  Red = 1,
  Green,
  Blue,
}
const c2: Color2 = Color2.Green;

enum Color3 {
  Red = 1,
  Green = 2,
  Blue = 4,
}
const c3: Color3 = Color3.Green;

// A handy feature of enums is that you can also go from a numeric value to the name of that value in the enum.For example, if we had the value 2 but weren’t sure what that mapped to in the Color enum above, we could look up the corresponding name:

enum Color4 {
  Red = 1,
  Green,
  Blue,
}
const colorName: string = Color4[2];

// Displays 'Green'
console.log(colorName);

enum coffeeType {
  Americano,
  Cappucino,
  Frappucino,
  Espresso,
  Mocha,
}

const favCoffeeType = coffeeType.Cappucino;


enum ElementType {
  Earth = "brown",
  Wind ="grey",
  Water = "blue",
  Fire = "red"
}

let myFavElementType:ElementType = ElementType.Water;
myFavElementType = ElementType.Fire;
const isFireMyFavElementType:boolean = myFavElementType === ElementType.Fire;

const myFavColor = "blue";

switch(myFavColor) {
  case ElementType.Water:
    console.log('Water matches my fav color');
    break;
  default:
      console.log('Not my fav color');
      break;
}
