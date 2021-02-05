import { User } from './User';
import { Company } from './Company';
import { CustomMap } from './CustomMap';


const user = new User();
const company = new Company();
const customMap = new CustomMap('map');

customMap.addMarker(user); // user can be passed here because it has the properties necessary  to meet the requirements of the aMappable interface
customMap.addMarker(company); // company can be passed here because it has the properties necessary  to meet the requirements of the Mappable interface
