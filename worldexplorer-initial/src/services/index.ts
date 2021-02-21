// Creating the service layer barrel
// To finish up, create a barrel for the service layer. To do so, create an index.ts file and export the following elements in it:

export * from "./population-service.intf";
export * from "./population-service";
export * from "./world-bank-api";

// This barrel will allow us to easily import elements of the service layer from anywhere in the application. As we saw earlier, this simplifies imports, which is valuable.
