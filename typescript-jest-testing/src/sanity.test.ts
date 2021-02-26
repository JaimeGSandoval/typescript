//    Sanity tests:
// Sanity tests are tests that aim to provide some confidence about the overall system. They only aim to check the major features of the system to validate that they work as intended. Sanity tests are usually performed when there is not enough time to go deeper.
test('adding 3 to 2 equals to 5', () => {
    expect(2 + 3).toBe(5);
});
