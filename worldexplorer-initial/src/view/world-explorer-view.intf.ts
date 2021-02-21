import {Country} from "../domain";

import {ChartDetails} from "./chart-details.intf";


export interface WorldExplorerView {
    displayErrorMessage(message: string): void;
    displayCountries(countries: Country[]): void;
    displayYears(years: number[]): void;
    getChartFormDetails(): { error?: string, countryId?: string,
     indicator?: string, fromYear?: number,
     toYear?: number, chartType?: string};
    displayChart(chartDetails: ChartDetails): void;
}

// For the return type of the getChartFormDetails method, we are using the same trick as in the last chapter, allowing us to have clearer and cleaner error handling.
