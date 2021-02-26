import {PopulationServiceImpl} from "./population-service";
import {WorldBankApiV2CountryResponse} from "./world-bank-api";

describe('population service', () => {
    let sut: PopulationServiceImpl;

    beforeEach(() => {
        sut = new PopulationServiceImpl('https://foo'); // valid URL
    });

    // With the preceding code, we've defined a dedicated scope for our tests using the describe function. You can find its documentation here: https://jestjs.io/docs/en/api#describename-fn. Basically, describe creates a group for a set of tests that we could also call a test suite, but we'll keep using that term to refer to the whole set of tests of the application.

    // Within the describe block, we've created a variable corresponding to the unit that we want to focus on: PopulationService. We've called the variable sut, which stands for System Under Test. This is a common naming convention used to refer to the unit that we're testing.

    // Finally, with the beforeEach function, we've made sure that a new (that is, clean) instance of our PopulationServiceImpl class will be created before each test is executed. Basically, beforeEach is a part of the setup and teardown functions provided by Jest. There are other setup and teardown methods that can be used, for example, beforeAll, afterAll, afterEach, and so on. You can find the complete list here: https://jestjs.io/docs/en/setup-teardown.
    // Blocks using describe can be nested!


    describe('initialization', () => {

        // Now, let's add some tests inside the describe function together. First, we'll focus on the constructor function. Since it accepts a parameter, we need to verify whether it validates the input properly, as follows:

// Let's start with a positive test (that is, providing a valid input):
// In this test, we simply create new instances of the class by passing valid inputs each time, and we verify that we do end up with an instance of the class using toBeInstanceOf.
        it('should succeed if the URL is provided and valid', () => {
            // We've used the it function and have started our description using should. This way, the test description becomes easily readable.
            expect(new PopulationServiceImpl('https://foo')).toBeInstanceOf(PopulationServiceImpl);
            expect(new PopulationServiceImpl('https://foo/')).toBeInstanceOf(PopulationServiceImpl);

            expect(new PopulationServiceImpl('http://foo')).toBeInstanceOf(PopulationServiceImpl);
            expect(new PopulationServiceImpl('http://foo/')).toBeInstanceOf(PopulationServiceImpl);

            expect(new PopulationServiceImpl('HTTP://foo')).toBeInstanceOf(PopulationServiceImpl);
            expect(new PopulationServiceImpl('HTTP://foo/')).toBeInstanceOf(PopulationServiceImpl);

            expect(new PopulationServiceImpl('HTTPS://foo')).toBeInstanceOf(PopulationServiceImpl);
            expect(new PopulationServiceImpl('HTTPS://foo/')).toBeInstanceOf(PopulationServiceImpl);

        });

        // We can then look at some negative cases:
        //  This time, we've passed some invalid values to the constructor, and we expect it to throw an error. We needed to wrap the instantiation in a dummy function. Here, we've used test instead of it; this is just an alias for the same function
        test('should not accept empty input', () => {
            expect(() => new PopulationServiceImpl('')).toThrow();
            expect(() => new PopulationServiceImpl('     ')).toThrow();
        });

        // // Here's another one that checks whether our constructor correctly checks invalid prefixes:
        test('should not accept wrong prefix', () => {
            expect(() => new PopulationServiceImpl('foo://')).toThrow();
            expect(() => new PopulationServiceImpl('bar')).toThrow();
        });

        // // Finally, we also need to try passing null or undefined:
        test('should not accept null input', () => {
            // This way, we know that our service does not accept any input.
            expect(() => new PopulationServiceImpl(null as unknown as string)).toThrow();
            expect(() => new PopulationServiceImpl(undefined as unknown as string)).toThrow();
        //     // Here, we've leveraged the unknown TypeScript 3 type with a type cast to bypass the compiler checks. Without this, the code wouldn't compile because we're not supposed to be able to pass null or undefined to the constructor function. You can use this trick to pass anything you want to a function. Don't forget to validate this, especially for library code, since you never know how your code will actually be used at runtime, when types mostly disappear.
        });
    });

    describe('checkResponseStatus', () => {

        // Here, we make use of the async testing support of Jest to call checkResponseStatus. Notice that our test expects the promise to reject/throw using rejects.toThrow().
        it('should fail if no response object is passed', async () => {
            await expect(sut.checkResponseStatus(null as unknown as Response)).rejects.toThrow();
        });

        // Now, add additional tests for the edge cases of the method:
        it('should fail if the status is below 200', async () => {
            await expect(sut.checkResponseStatus(new Response(null, {
                status: 199
            }))).rejects.toThrow();
        });

        it('should fail if the status is above 299', async () => {
            await expect(sut.checkResponseStatus(new Response(null, {
                status: 300
            }))).rejects.toThrow();
        });

    //     // Finally, let's not forget to test the positive case:
    //     // This time, since we provide valid input to the function, we, of course, verify that the promise resolves to the expected value.
        it('should succeed if the response has a 2xx status code', async () => {
            let fakeResponse: Response = new Response(null, {
                status: 200
            });
            await expect(sut.checkResponseStatus(fakeResponse)).resolves.toBe(fakeResponse);

            fakeResponse = new Response(null, {
                status: 204
            });
            await expect(sut.checkResponseStatus(
                fakeResponse)).resolves.toBe(fakeResponse);

            fakeResponse = new Response(null, {
                status: 299
            });
            await expect(sut.checkResponseStatus(
                fakeResponse)).resolves.toBe(fakeResponse);
        });
    });
    // This time, since we provide valid input to the function, we, of course, verify that the promise resolves to the expected value. An alternative style to this is to add a done argument to the test function and to invoke it when the test is done or to invoke done.fail when an error is detected within the test.


    // Implementing positive and negative tests for getAllCountries
    // Now that we've seen how to test asynchronous code, let's see how we can test the getAllCountries method, which uses the Fetch API. For this one, we'll use our Fetch mock:
    describe('getAllCountries', () => {
        beforeEach(() => {
            // In the beforeEach function, we use jest-fetch-mock to reset the Fetch API mock. This is useful to avoid side effects between our test cases.
            fetchMock.resetMocks();
        });

        const dummyValidData: WorldBankApiV2CountryResponse = [{"page": 1, "pages": 7, "per_page": "50", "total": 304}, [{
            "id": "ABW",
            "iso2Code": "AW",
            "name": "Aruba",
            "capitalCity": "Oranjestad",
            "longitude": "-70.0167",
            "latitude": "12.5167"
        }, {
            "id": "AFG",
            "iso2Code": "AF",
            "name": "Afghanistan",
            "capitalCity": "Kabul",
            "longitude": "69.1761",
            "latitude": "34.5228"
        }]];
    //     // The variable represents a valid response for the Fetch call. Once added, you can now easily implement a positive test for getAllCountries as follows:

        it('should succeed and return countries when the request succeeds and a valid response is received', async () => {
            fetchMock.mockResponse(
                JSON.stringify(dummyValidData),
                {status: 200}
            );

            await expect(sut.getAllCountries()).resolves.toBeTruthy();
            await sut.getAllCountries()
                .then(countries => {
                    expect(countries.length).toBe(2);

                    const dummyValidCountries = (dummyValidData[1]);

                    expect(countries[0].capitalCity).toBe(dummyValidCountries[0].capitalCity);
                    expect(countries[0].name).toBe(dummyValidCountries[0].name);
                    expect(countries[1].capitalCity).toBe(dummyValidCountries[1].capitalCity);
                    expect(countries[1].name).toBe(dummyValidCountries[1].name);
                })
                .catch(() => fail("Should not throw"));
        });
        // The first notable thing that we do in this test case is to instruct jest-fetch-mock to always return our dummy data along with an HTTP status code of 200. This is what the mockResponse function call does. With that done, any request made by our code using fetch will receive our configured response in return. That is, until we call mockResponse again or until we call fetchMock.resetMocks(). In the rest of the test, we simply use await and call our method under test. Then, using resolves.toBeTruthy(), we make sure that the function succeeds as expected. Finally, we repeat the operation and add a few checks to ensure that we do receive the same country data as we've provided through the Fetch API mock in return.

        // Our dummyValidCountries input is useful, but static. Sometimes, it is much more powerful to be able to quickly generate many different objects in order to test various scenarios more easily. Tools such as cooky-cutter (https://www.npmjs.com/package/cooky-cutter) can help you with that.


        // Now, add a few negative test cases:
        // The call should fail this time since we're providing an unexpected response back to the function, even though the HTTP status code was 200.
        it('should fail and throw if the response does not match the expected format', async () => {
            fetchMock.mockResponse(
                JSON.stringify({foo: "bar"}),
                {status: 200}
            );

            await expect(sut.getAllCountries()).rejects.toBeTruthy();
        });

        it('should check the response status and fail if outside of the allowed range (2xx)', async () => {
            fetchMock.mockResponse(
                JSON.stringify(dummyValidData),
                {status: 199}
            );

            await expect(sut.getAllCountries()).rejects.toBeTruthy();

            fetchMock.mockResponse(
                JSON.stringify(dummyValidData),
                {status: 300}
            );

            await expect(sut.getAllCountries()).rejects.toBeTruthy();
        });

        // If you pay attention, you'll notice that by doing this, we're actually checking whether checkResponseStatus is called and whether the result of that call influences the result of the getAllCountries call. This test is relevant and useful because it makes sure getAllCountries does the necessary checks, and here, we don't care how it does so.


        // Spying on methods with Jest
        // Now, without implying that it is actually a good idea, let's see how we can spy on method calls using Jest. We'll verify that the checkResponseStatus method gets called as expected:
        it('should call checkResponseStatus', async () => {
            fetchMock.mockResponse(
                JSON.stringify(dummyValidData),
                {status: 200}
            );

            const checkResponseStatusSpy = jest.spyOn(sut, "checkResponseStatus");

            await sut.getAllCountries().catch(() => {
                fail("Should not fail");
            });

            expect(checkResponseStatusSpy).toHaveBeenCalledTimes(1);
        });
    });
});

// Using the jest.spyOn function, we tell Jest that we want to spy on the checkResponseStatus method. Then, after having called our getAllCountries method, we can verify whether the object that we're spying on has been called or not. In this case, the method is supposed to be called once.

// You can learn more about Jest spy objects here: https://remarkablemark.org/blog/2018/04/10/jest-spyon-function
