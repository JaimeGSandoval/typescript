// In TypeScript, both undefined and null actually have their types named undefined and null respectively. Much like void, they’re not extremely useful on their own
// By default null and undefined are subtypes of all other types.That means you can assign null and undefined to something like number.
// However, when using the--strictNullChecks flag, null and undefined are only assignable to unknown, any and their respective types(the one exception being that undefined is also assignable to void).This helps avoid many common errors.In cases where you want to pass in either a string or null or undefined, you can use the union type -> string | null | undefined.
// maybeAString could be a string eventually, but it starts out as undefined
var maybeAString;
var maybeANumber = null;
if (maybeAString !== undefined) {
    console.log("maybeAString has a string value");
}
if (maybeANumber !== null) {
    console.log("maybeANumber has a numerical value");
}
var orangeInfo = {
    name: "Orange",
    color: "orange",
    origin: null
};
var appleInfo = {
    name: "Apple",
    color: "red",
    type: "Granny Smith",
    origin: "Japan"
};
var pearInfo = {
    name: "Pear",
    color: "green",
    origin: undefined
};
