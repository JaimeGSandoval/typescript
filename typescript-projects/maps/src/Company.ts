import faker from 'faker';
import { Mappable } from './CustomMap';

export class Company implements Mappable {
  public name: string;
  public catchPhrase: string;

  // This does not initialize the location property. That's done in the constructor.
  public location: {
    lat: number;
    lng: number;
  }
  public color: string;

  constructor() {
    this.name = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
    this.color = 'green';
  }

  markerContent(): string {
    return `
    <div>
    <h1>Company Name: ${this.name}</h1>
    <h3>Catchphrase: ${this.catchPhrase}</h3>
    <h2>Fave Color: ${this.color}</h2>
    </div>
    `;
  }
}
