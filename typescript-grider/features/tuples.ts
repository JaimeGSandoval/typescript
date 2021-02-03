const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40
}

// Type Alias
type Drink = [string, boolean, number];


// Tuple
const pepsi: Drink = ['brown', true, 40];
pepsi[0] = 10; // throws error

const sprite: Drink = ['clear', true, 60];
