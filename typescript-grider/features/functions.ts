// (a: number, b: number): number // here a and b are expected to be of number types for the arguments being passed. The number outside the parenthesis is the expected type to be returned by the function
const add = (a: number, b: number): number => {
return a + b;
};

const subtract = (a: number, b: number): number => {
  return a - b;
};

function divide(a: number, b: number): number {
    return a / b;
}

const multiply = (a: number, b: number): number => {
  return a * b;
}

// void is used to tell typescript that the function does not return anything
const logger = (message: string): void => {
  console.log(message);
};
