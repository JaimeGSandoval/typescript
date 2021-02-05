import faker from 'faker'; // had to install @type/faker to be able to import faker
// npm install @types/faker

export class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
      this.name = faker.name.firstName();
      this.location = {
        lat: parseFloat(faker.address.latitude()),
        lng: parseFloat(faker.address.longitude())
      };
  }

  markerContent(): string {
    return `
    <h1>User Name: ${this.name}</h1>
    `;
  }
}
