const profile = {
  name: 'alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },

  setAge(age: number): void {
    this.age = age;
  }
};

// If you want to destructure an object the you need to use the structure of the object in order to be able to deconstruct
// name error doesn't matter here.
const { age, name }: { age: number } = profile;
const { coords: { lat, lng } }: { coords: { lat: number, lng: number } } = profile;
