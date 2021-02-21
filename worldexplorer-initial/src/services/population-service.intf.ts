// The name ends with the .intf.ts suffix to clearly indicate that the file contains an interface definition. Usually, you should define a single concept per file (that is, class, interface, type, and so on). The folder structure and file naming conventions help navigate around the code easily.

//  We've imported the Country and DataPoint classes from our domain module; we can import those this way thanks to the barrel that we created before.
import {Country, DataPoint} from "../domain";

export interface PopulationService {
    getCountry(countryCode: string): Promise<Country>;
    getAllCountries(): Promise<Country[]>;
    getTotalPopulation(country: Country, dateRange: string): Promise<DataPoint[]>;
    getMalePopulation(country: Country, dateRange: string): Promise<DataPoint[]>;
    getFemalePopulation(country: Country, dateRange: string): Promise<DataPoint[]>;
    getLifeExpectancy(country: Country, dateRange: string): Promise<DataPoint[]>;
    getAdultMaleLiteracy(country: Country, dateRange: string): Promise<DataPoint[]>;
    getAdultFemaleLiteracy(country: Country, dateRange: string): Promise<DataPoint[]>;
    getMaleSurvivalToAge65(country: Country, dateRange: string): Promise<DataPoint[]>;
    getFemaleSurvivalToAge65(country: Country, dateRange: string): Promise<DataPoint[]>;
}

// If you want to impose more type safety in this interface, then you can change the return types to Readonly<DataPoint[]>, just as we did in the previous chapter.
