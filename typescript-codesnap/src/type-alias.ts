/*eslint-disable */

// type StringOrNumber = string | number;

// let typesCityPopulation: StringOrNumber = 14000000;
// typesCityPopulation = "Fourteen million";

// if (typeof typesCityPopulation === 'string') {
//   console.log("String: " + typesCityPopulation);
// } else if (typesCityPopulation === 'number') {
//   typesCityPopulation = typesCityPopulation + 1000000;
// }



// Second Example
type StringOrNumber = string | number;
type StockCount = number;

type Shirt = {
  name: string;
  numberInStock: number;
}

let myNewShirt: Shirt = {
  name: "blue shirt",
  numberInStock: 10
}

let numberOfShirtsInStock: StockCount = 500;
let numberOfPantsInStock: StockCount = 250;

let typesCityPopulation: StringOrNumber = 14000000;
typesCityPopulation = "Fourteen million";
