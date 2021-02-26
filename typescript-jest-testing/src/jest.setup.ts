// We've instructed Jest to execute the jest.setup.ts file when it initializes, right before running our tests. In this file, we've loaded the Fetch API mock and declared it in the global scope, which is not problematic in this specific case. Thanks to this, we'll now be able to control what the Fetch API calls return, using the API documented here: https://www.npmjs.com/package/jest-fetch-mock#api.
import {GlobalWithFetchMock} from "jest-fetch-mock";

const customGlobal: GlobalWithFetchMock = global as unknown as GlobalWithFetchMock;

// load the mock for the Fetch API: https://www.npmjs.com/package/jest-fetch-mock
// and set it on the global scope
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
