import faker from 'faker'; // had to install @type/faker to be able to import faker
// npm install @types/faker
import { Mappable } from './CustomMap';

// BY USING 'implements Mappable' ON THE 'User' CLASS WE'RE SAYING WE WANT TO MAKE SURE THAT THE INSTANCE OF CLASS 'User' SATISFIES ALL THE PROPERTIES REQUIRED BY THE MAPPABLE INTERFACE. THIS SETS UP A DIRECT DEPENDENCY BETWEEN OUR 'user' CLASS AND THE 'customMap' FILE. BY ADDING 'implements Mappable' TYPESCRIPT HELPS US MAKE SURE user HAS ALL THE PROPERTIES SPECIFIED BY 'Mappable'. IT HELPS PINPOINT THE ERRORS.
// THIS IS 100% OPTIONAL. IT'S JUST TO TELL OTHER DEVS THAT THE user SHOULD BE MAPPABLE.
// YOU COULD LEAVE OUT THE 'implements Mappable' AND IT WOULD STILL WORK, JUST ASS LONG AS THE CLASS USING THE Mappable INTERFACE HAS THE PROPERTIES IT'S ASKING FOR
export class User implements Mappable {
  public name: string;
  public location: {
    lat: number;
    lng: number;
  };
  public color: string;

  constructor() {
      this.name = faker.name.firstName();
      this.location = {
        lat: parseFloat(faker.address.latitude()),
        lng: parseFloat(faker.address.longitude())
      };
      this.color = 'blue';
  }

  public markerContent(): string {
    return `
    <h1>User Name: ${this.name}</h1>
    <h2>Fave Color: ${this.color}</h2>
    `;
  }
}
