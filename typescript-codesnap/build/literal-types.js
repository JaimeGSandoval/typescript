/* eslint-disable*/
// A literal is a more concrete sub - type of a collective type.What this means is that "Hello World" is a string, but a string is not "Hello World" inside the type system.
// There are three sets of literal types available in TypeScript today: strings, numbers, and booleans; by using literal types you can allow an exact value which a string, number, or boolean must have.
// Literal Narrowing
// When you declare a variable via var or let, you are telling the compiler that there is the chance that this variable will change its contents.In contrast, using const to declare a variable will inform TypeScript that this object will never change.
// We're making a guarantee that this variable
// helloWorld will never change, by using const.
// So, TypeScript sets the type to be "Hello World", not string
var helloWorld = "Hello World";
// On the other hand, a let can change, and so the compiler declares it a string
var hiWorld = "Hi World";
var UIElement = /** @class */ (function () {
    function UIElement() {
    }
    UIElement.prototype.animate = function (dx, dy, easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // It's possible that someone could reach this
            // by ignoring your types though.
        }
    };
    return UIElement;
}());
var button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy");  // Throws an error
// Numeric Literal Types
// TypeScript also has numeric literal types, which act the same as the string literals above.
function rollDice() {
    return (Math.floor(Math.random() * 6) + 1);
}
var result2 = rollDice();
