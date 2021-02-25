module.exports = {
    verbose: false,
    roots: [
        "<rootDir>/src"
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: false,
    globals: {
        'ts-jest': {
            // reference: https://kulshekhar.github.io/ts-jest/user/config/
        }
    },
    setupFiles: [
        './src/jest.setup.ts'
    ]
};

// This configuration tells Jest to use its TypeScript preset and also tells it that our source code can be found under src. Finally, it also sets the test environment to node, which is where we will execute Jest.

// You can also define the configuration of Jest directly as part of the package.json file. To do so, you just need to add a jest key to the file, as described here: https://jestjs.io/docs/en/configuration.html.
