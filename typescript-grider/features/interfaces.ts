interface Reportable {
  summary(): string;
}

interface Vehicle {
  name: string;
  year: Date;
  numberOfOwners: number;
  broken: boolean;
  summary(): string; // summary function has to return a string
}

const drink = {
 color: 'brown',
 carbonated: true,
 sugar: 40,
 summary(): string {
   return `My drink has ${this.sugar} grams of sugar`;
 }
}

const oldCivic: Vehicle = {
  name: 'civic',
  year: new Date(),
  numberOfOwners: 2,
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  }
};

const printVehicle = (vehicle: Vehicle): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken: ${vehicle.broken}`);
}

const printSummary = (item: Reportable): void => {
  console.log(item.summary());
}
printSummary(oldCivic);
printSummary(drink);
