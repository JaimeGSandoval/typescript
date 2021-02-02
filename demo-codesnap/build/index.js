"use strict";
// MAKE INTERFACES THEN TIE IT ALL TOGETHER WITH FUNCTIONS
var BakeryItemType;
(function (BakeryItemType) {
    BakeryItemType[BakeryItemType["Donut"] = 0] = "Donut";
    BakeryItemType[BakeryItemType["Cake"] = 1] = "Cake";
    BakeryItemType[BakeryItemType["Bread"] = 2] = "Bread";
    BakeryItemType[BakeryItemType["Other"] = 3] = "Other";
})(BakeryItemType || (BakeryItemType = {}));
const donut = {
    name: "Donut",
    description: "Large Buttermilk donut",
    numberInStock: 15,
    type: BakeryItemType.Donut,
    price: 10,
};
const myPaymentMethod = {
    id: "default-payment-method",
    currency: "yen",
    availableBalance: 50,
    expirationDate: new Date(),
    type: "credit",
    cardValid: true,
};
// Here myBackUpPaymentMethod has all the same properties as PaymentMethod, but because we set our CashPaymentMethod to be an alias of paymentMethod, this is valid code
const myBackUpPaymentMethod = {
    id: "My back up payment method",
    currency: "usd",
    availableBalance: 1000,
};
const customer = {
    id: "First customer",
    // valid because myPaymentMethod is of type CreditCardPaymentMethod
    primaryPaymentMethod: myPaymentMethod,
    // valid because myPaymentMethod is of type CashPaymentMethod
    backUpPaymentMethod: myBackUpPaymentMethod,
    itemsInBasket: [donut],
};
// Making a payment
const makePayment = (paymentMethod, amount) => {
    if (paymentMethod.availableBalance < amount) {
        throw new Error("Payment method does not have sufficient funds.");
    }
    paymentMethod.availableBalance -= amount;
    console.log("Payment was taken successfully.");
};
// Buying a bakery item
const payForItemsInBasket = (customer) => {
    customer.itemsInBasket.forEach((bakeryItem) => {
        try {
            makePayment(customer.primaryPaymentMethod, bakeryItem.price);
            bakeryItem.numberInStock -= 1;
            console.log(`Customer with ID: ${customer.id} has just purchased ${bakeryItem.name}.There are ${bakeryItem.numberInStock} items left in stock.`);
        }
        catch (e) {
            console.error("Error encountered while making payment. Details: ", e.message);
        }
    });
};
payForItemsInBasket(customer);
