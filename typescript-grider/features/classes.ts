// DIFFERENCE BETWEEN CLASS AND INTERFACE
// Class is concrete with having everything implemented be its methods or constructor(s).
// Interface is just abstraction and does not carry implementation of any of its methods.
// A class is something you can instantiate and has a public constructor to do that.
// An interface is something you cannot instantiate, and it only defines operation prototypes.

class Vehicle {
  // public drive(): void {
  //   console.log('Bankai');
  // }
  // color: string = 'blue'; // example of setting a value within the parent class without constructor

  // One way to create and instantiate properties with constructor
  // color: string; // this must be here for this.color = color to work
  // constructor(color: string) {
  //   this.color = color;
  // }

  // SHORT CUT FOR ABOVE. USE THIS METHOD
  constructor(public color: string) {
    this.color = color;
  }

  public honk(): void {
   console.log('chidori');
  }

  protected honk2(): void {
    console.log('protected - only parent & child instances can use me');
  }
}



class Car extends Vehicle {
    constructor(public wheels: number, color: string) {
      super(color); // These are for the constructor of the Vehicle/parent class and will be passed to it as arguments
    }

  // example of overriding a parent class method
  private drive(): void {
    console.log('rasengan');
  }

  startDrivingProcess(): void {
    this.drive();
  }
}


const car = new Car(4, 'blue');
car.startDrivingProcess();
car.honk()
console.log(car);
