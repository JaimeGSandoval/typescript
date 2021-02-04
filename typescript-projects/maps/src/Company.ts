import faker, { fake } from 'faker';

export class Company {
  name: string;
  catchPhrase: string;

  // This does not initialize the location property. That's done in the constructor.
  location: {
    lat: number;
    lng: number;
  }

  constructor() {
    this.name = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }
}
