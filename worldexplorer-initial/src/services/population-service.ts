import {PopulationService} from "./population-service.intf";
import {Country, DataPoint} from "../domain";
import {
    WorldBankApiV2,
    WorldBankApiV2CountryResponse,
    worldBankApiV2CountryResponseValidator,
    WorldBankApiV2Formats,
    WorldBankApiV2IndicatorResponse,
    worldBankApiV2IndicatorResponseValidator,
    WorldBankApiV2Indicators,
    WorldBankApiV2Params
} from "./world-bank-api";
import {ThrowReporter} from "io-ts/lib/ThrowReporter";

export class PopulationServiceImpl implements PopulationService {
    private readonly countriesApiBaseUrl: string;

    // In the constructor, we expect to receive the base URL of the World Bank API. We didn't hardcode it to allow defining a different URL as needed (for example a different one per environment). This can be useful, especially for testing purposes. After some basic validations, we store the base URL of the main API.
    constructor(baseUrl: string) {
        if (!baseUrl || baseUrl.trim().length === 0) {
            throw new Error("The base URL must be provided!");
        } else if (!baseUrl.toLocaleLowerCase().startsWith('https://')
        && !baseUrl.toLocaleLowerCase().startsWith('http://')) {
            throw new Error("The URL looks invalid. It should start with 'http://' or https://'");
        }

        let cleanBaseUrl = baseUrl.trim();
        if (cleanBaseUrl.endsWith('/')) {
            cleanBaseUrl = cleanBaseUrl.substr(0, cleanBaseUrl.lastIndexOf('/'));
        }
        this.countriesApiBaseUrl =
         `${cleanBaseUrl}/${WorldBankApiV2.VERSION}/
          ${WorldBankApiV2.COUNTRIES_API_PREFIX}`;
        console.log(`Population service initialized.\nCountries API URL: [${this.countriesApiBaseUrl}]`);
    }


// We'll use the checkResponseStatus method to check that API responses are successful (that is, that they at least return a 2xx HTTP status code
    async checkResponseStatus(response: Response): Promise<Response> {
        if(!response) {
            throw new Error("A response must be provided!");
        }

        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
}

// The getJsonContent method uses await to wait until the conversion of the response body to JSON is completed. Since this operation might fail, we've done this within a try-catch block in order to be able to return a meaningful response back to the calling code.

// In the catch block, we've used Promise.reject(...​) to return a custom error message back, but we could also have simply used throw new Error(...​) to achieve the same result.

async getJsonContent(response: Response): Promise<unknown> {
    if(!response) {
        throw new Error("A response must be provided!");
    }

    let jsonContent: unknown = undefined;
    try {
        jsonContent = await response.json();
    } catch (error) {
        console.error("Failed to parse the response as JSON: ",
        error);
        throw new Error(`Could not parse the response body as JSON.
        Error: ${error.message}`);
    }
    return jsonContent;
}


// Implementing the getAllCountries method
// This method will use the countries API to retrieve the full list of countries.

// We will use the Fetch API to retrieve the data, as well as our io-ts validators to make sure that the data matches our expectations at runtime.

// Finally, we'll use async and await to write synchronous-looking code, even if everything is actually asynchronous.

async getAllCountries(): Promise<Country[]> { // <1>

    const response: Response = await fetch(`${this.countriesApiBaseUrl}?${WorldBankApiV2Params.FORMAT}=${WorldBankApiV2Formats.JSON}&
     ${WorldBankApiV2Params.PER_PAGE}=320`); // <2>

    const checkedResponse: Response = await this.checkResponseStatus(response); // <3>
    let jsonContent: unknown = await this.getJsonContent(checkedResponse);
    const validationResult = worldBankApiV2CountryResponseValidator.decode(jsonContent); // <4>
    // throw an error if validation fails
    ThrowReporter.report(validationResult); // <5>

    console.log("Response received and validated");
    // from here on, we know that the validation has passed
    const countries = (validationResult.value as WorldBankApiV2CountryResponse)[1]; // <6>
    console.log(`Found ${countries.length} countries`);

    let retVal: Country[] = countries.map(country => // <7>
        new Country(
            country.name,
            country.id,
            country.iso2Code,
            country.capitalCity,
            country.longitude,
            country.latitude
        )
    );
    return retVal; // <8>

// Let's go through the code for getAllCountries():

// 1. We've marked the function as async. This is what allows us to use await and write synchronous-looking code.
// 2. We've used await to wait until fetch returns with the response of our API call.
// 3. We've used await again to wait until the response has been checked by our utility function.
// 4. We've used our io-ts validator (that is, worldBankApiV2CountryResponseValidator) to check the validity of the response.
// 5. We've called ThrowReporter.report(...​) to make sure that we throw an error if validation fails. We could also have checked the validity ourselves using if(validationResult.isLeft) { ... }, but ThrowReporter is clearer.
// 6. We've cast the validation result as WorldBankApiV2CountryResponse, which is safe at this point (we've gone through the validation successfully!). Note that since the World Bank APIs always return data in the form [{pagination_data},{data}], we've used [1] to simply get the data.
// 7. We've then mapped our array to a new array of Country class instances.
// 8. Finally, we've returned the resulting array directly.

// Notice that we simply return our array. In this case, we don't need to use Promise.resolve. Since the function is marked as async, the returned value will be wrapped in Promise in any case.
}

// Implementing the getCountry method
async getCountry(countryCode: string): Promise<Country> {
    if(!countryCode || '' === countryCode.trim()) {
        throw new Error("The country code must be provided!");
    }

    const response: Response = await fetch(`${this.
     countriesApiBaseUrl}/${countryCode}?
     ${WorldBankApiV2Params.FORMAT}=
     ${WorldBankApiV2Formats.JSON}`);

    const checkedResponse: Response = await
     this.checkResponseStatus(response);
    let jsonContent: unknown = await
     this.getJsonContent(checkedResponse);

    const validationResult = worldBankApiV2CountryResponseValidator.decode(jsonContent);
    ThrowReporter.report(validationResult);

    // In this first part, we perform some validation, then invoke the API. Once we have the response, we simply ensure that there is, at most, one country returned.

    // from here on, we know that the validation has passed
    const countries = (validationResult.value as WorldBankApiV2CountryResponse)[1];

    if (countries.length > 1) {
        return Promise.reject("More than one country was returned. This should not happen");
    }

    const country = countries[0];

    return new Country(
        country.name,
        country.id,
        country.iso2Code,
        country.capitalCity,
        country.longitude,
        country.latitude
    );

// In this second part, we extract the list of countries from the validation result. The typecast is safe to perform since we have validated that the object matches our expectations.

// We then make sure that there is only one element; if it isn't the case, then we reject the Promise.

// Finally, we return a new Country object created using the different properties of the object that we've extracted from the response.
}

    async getTotalPopulation(country: Country, dateRange: string): Promise<DataPoint[]> {
        // TODO implement
        throw new Error("Not implemented yet");
    }

    async getFemalePopulation(country: Country, dateRange: string): Promise<DataPoint[]> {
        // TODO implement
        throw new Error("Not implemented yet");
    }

    async getMalePopulation(country: Country, dateRange: string): Promise<DataPoint[]> {
        // TODO implement
        throw new Error("Not implemented yet");
    }

    async getAdultFemaleLiteracy(country: Country, dateRange: string): Promise<DataPoint[]> {
        // TODO implement
        throw new Error("Not implemented yet");
    }

    async getAdultMaleLiteracy(country: Country, dateRange: string): Promise<DataPoint[]> {
        // TODO implement
        throw new Error("Not implemented yet");
    }

    async getFemaleSurvivalToAge65(country: Country, dateRange: string): Promise<DataPoint[]> {
        // TODO implement
        throw new Error("Not implemented yet");
    }

    async getLifeExpectancy(country: Country, dateRange: string): Promise<DataPoint[]> {
        // TODO implement
        throw new Error("Not implemented yet");
    }
    async getMaleSurvivalToAge65(country: Country, dateRange: string): Promise<DataPoint[]> {
        // TODO implement
        throw new Error("Not implemented yet");
    }
}
