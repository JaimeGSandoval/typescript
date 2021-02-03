const carMakers: string[] = ['ford', 'toyota', 'chevy'];
const dates: Date[] = [new Date(), new Date()];

const carsByMake: string[][] = [['f150'], ['corolla'],['camaro']];


// Help with inference when extracting values

const car = carMakers[0]; // string type
const myCar = carMakers.pop(); //string type
const myDate = dates[0]; // Date type

// Prevent incompatible values
carMakers.push(100); // number type throws error

carMakers.map((car: string): string => {
  return car.toLowerCase();
})

// Flexible types
const importantDates: (string | Date)[] = ['Bankai', new Date()];
importantDates.push('Chidori');
importantDates.push(new Date());
importantDates.push(100); // number type throws error
