// MAKE INTERFACES THEN TIE IT ALL TOGETHER WITH FUNCTIONS

enum BakeryItemType {
  Donut,
  Cake,
  Bread,
  Other,
}

interface BakeryItem {
  name: string;
  description?: string;
  imageURL?: string;
  numberInStock: number;
  type: BakeryItemType;
  price: number;
}

const donut: BakeryItem = {
  name: "Donut",
  description: "Large Buttermilk donut",
  numberInStock: 15,
  type: BakeryItemType.Donut,
  price: 10,
};

interface PaymentMethod {
  id: string;
  currency: "usd" | "yen" | "eur" | "aud";
  availableBalance: number;
}

interface CreditCardPaymentMethod extends PaymentMethod {
  expirationDate: Date;
  type: "credit" | "debit";
  cardValid: true;
}

// Setting CashPaymentMethod as a type alias/another name for the PaymentMethod interface
type CashPaymentMethod = PaymentMethod;

const myPaymentMethod: CreditCardPaymentMethod = {
  id: "default-payment-method",
  currency: "yen",
  availableBalance: 50,
  expirationDate: new Date(),
  type: "credit",
  cardValid: true,
};

// Here myBackUpPaymentMethod has all the same properties as PaymentMethod, but because we set our CashPaymentMethod to be an alias of paymentMethod, this is valid code
const myBackUpPaymentMethod: CashPaymentMethod = {
  id: "My back up payment method",
  currency: "usd",
  availableBalance: 1000,
};

interface Customer {
  id: string;
  primaryPaymentMethod: CashPaymentMethod | CreditCardPaymentMethod;
  backUpPaymentMethod?: CashPaymentMethod | CreditCardPaymentMethod;
  itemsInBasket: BakeryItem[];
}

const customer: Customer = {
  id: "First customer",
  // valid because myPaymentMethod is of type CreditCardPaymentMethod
  primaryPaymentMethod: myPaymentMethod,
  // valid because myPaymentMethod is of type CashPaymentMethod
  backUpPaymentMethod: myBackUpPaymentMethod,
  itemsInBasket: [donut],
};

// Making a payment

const makePayment = (paymentMethod: PaymentMethod, amount: number) => {
  if (paymentMethod.availableBalance < amount) {
    throw new Error("Payment method does not have sufficient funds.");
  }

  paymentMethod.availableBalance -= amount;
  console.log("Payment was taken successfully.");
};

// Buying a bakery item

const payForItemsInBasket = (customer: Customer) => {
  customer.itemsInBasket.forEach((bakeryItem) => {
    try {
      makePayment(customer.primaryPaymentMethod, bakeryItem.price);
      bakeryItem.numberInStock -= 1;
      console.log(
        `Customer with ID: ${customer.id} has just purchased ${bakeryItem.name}.There are ${bakeryItem.numberInStock} items left in stock.`
      );
    } catch (e) {
      console.error(
        "Error encountered while making payment. Details: ",
        e.message
      );
    }
  });
};

payForItemsInBasket(customer);
