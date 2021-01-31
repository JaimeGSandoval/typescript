/* eslint-disable */
// Union types
// The use of a pipe allows for the variable to be assigned to either a string, number or boolean
var unionCityPopulation = 14000000;
unionCityPopulation = "Fourteen million";
// unionCityPopulation = true;
if (typeof unionCityPopulation === 'string') {
    console.log("String: " + unionCityPopulation);
}
else if (unionCityPopulation === 'number') {
    unionCityPopulation = unionCityPopulation + 1000000;
}
