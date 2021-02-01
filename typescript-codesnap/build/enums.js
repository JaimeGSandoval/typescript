/* eslint-disable */
// A helpful addition to the standard set of datatypes from JavaScript is the enum.As in languages like C#, an enum is a way of giving more friendly names to sets of values.
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
// By default, enums begin numbering their members starting at 0. You can change this by manually setting the value of one of its members.For example, we can start the previous example at 1 instead of 0:
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 3] = "Blue";
})(Color2 || (Color2 = {}));
var c2 = Color2.Green;
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 2] = "Green";
    Color3[Color3["Blue"] = 4] = "Blue";
})(Color3 || (Color3 = {}));
var c3 = Color3.Green;
// A handy feature of enums is that you can also go from a numeric value to the name of that value in the enum.For example, if we had the value 2 but weren’t sure what that mapped to in the Color enum above, we could look up the corresponding name:
var Color4;
(function (Color4) {
    Color4[Color4["Red"] = 1] = "Red";
    Color4[Color4["Green"] = 2] = "Green";
    Color4[Color4["Blue"] = 3] = "Blue";
})(Color4 || (Color4 = {}));
var colorName = Color4[2];
// Displays 'Green'
console.log(colorName);
var coffeeType;
(function (coffeeType) {
    coffeeType[coffeeType["Americano"] = 0] = "Americano";
    coffeeType[coffeeType["Cappucino"] = 1] = "Cappucino";
    coffeeType[coffeeType["Frappucino"] = 2] = "Frappucino";
    coffeeType[coffeeType["Espresso"] = 3] = "Espresso";
    coffeeType[coffeeType["Mocha"] = 4] = "Mocha";
})(coffeeType || (coffeeType = {}));
var favCoffeeType = coffeeType.Cappucino;
var ElementType;
(function (ElementType) {
    ElementType["Earth"] = "brown";
    ElementType["Wind"] = "grey";
    ElementType["Water"] = "blue";
    ElementType["Fire"] = "red";
})(ElementType || (ElementType = {}));
var myFavElementType = ElementType.Water;
myFavElementType = ElementType.Fire;
var isFireMyFavElementType = myFavElementType === ElementType.Fire;
var myFavColor = "blue";
switch (myFavColor) {
    case ElementType.Water:
        console.log('Water matches my fav color');
        break;
    default:
        console.log('Not my fav color');
        break;
}
