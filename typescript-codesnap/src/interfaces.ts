/* eslint-disable */

// Interfaces is a way to declare objects in typescript

// interfaces are a blueprint for an OBJECT, or a "shape" for an object, which allows us to create OBJECTS that conform to the rules that the interface specifies.

// the interface defines the rules that the object must follow
interface BakeryItem {
  name: string; // has to be a string
  numberStock: number; // has to be a number
  ingredients: string[]; // has to be an array of strings
}

// the type being declared for myBakeryItem is the BakeryItem interface
const myBakeryItem: BakeryItem = {
  name: "Red Velvet Cake",
  numberStock: 1,
  ingredients: ["eggs", "milk", "sugar", "flour", "food coloring"],
};



//  BASE INTERFACE
interface FruitInformation {
  name:string;
  color: "orange" | "green" | "red";
};

// EXTENDED INTERFACE FROM FruitInformation
interface FruitInformationWithPips extends FruitInformation {
  pipCount:number;
}

// EXTENDED INTERFACE FROM FruitInformation
interface FruitInformationWithSeeds extends FruitInformation {
  seedCount:number;
}

const appleInformation:FruitInformationWithPips = {
  name: "Apple",
  color: "red",
  pipCount: 10
}

const orangeInformation:FruitInformationWithSeeds = {
   name:"Orange",
   color: "orange",
   seedCount: 17
}

const pearInformation:FruitInformationWithPips = {
  name: "Pear",
  color: "green",
  pipCount: 5
}

const pearColor = pearInformation.color;
console.log(pearColor)
