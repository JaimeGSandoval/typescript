// A class should not not have to implement methods it does need
// Interface segregation principles keeps your classes and interfaces compact
// Segregate is just a fancy word for split
// Interface segregation means splitting your interfaces into smaller ones

// How to recognize the issue?
// 1. you don't know how to implement an interface method
// 2. the interface method does not belong in the class
// 3. you are forced to leave the method empty
// 4. you are forced to throw a generic exception
// 5. interface is too generic and not specific enough

export interface ISmartDevice {
  openApp(path: string): void;
  connectToWiFi(ssid: string, password: string): void;
}

export interface IPhoneDevice {
  call(contact: string): void;
  sendSms(contact: string, content: string): void;
}

export class SmartPhone implements ISmartDevice, IPhoneDevice {
  call(contact: string): void {
    console.log(`Calling ${contact}`);
  }
  sendSms(contact: string, content: string): void {
    console.log(`Sending ${contact} to ${content}`);
  }
  openApp(path: string): void {
    console.log(`Opening app ${path}`);
  }
  connectToWiFi(ssid: string, password: string): void {
    console.log(`Connecting to wifi ${ssid} with ${password}`);
  }
}

export class Tablet implements ISmartDevice {
  openApp(path: string): void {
    console.log(`Opening app ${path}`);
  }
  connectToWiFi(ssid: string, password: string): void {
   console.log(`Connecting to wifi ${ssid} with ${password}`);
  }
}

let smartPhone = new SmartPhone();
smartPhone.call('John');
smartPhone.sendSms('Whats up?', 'John');
smartPhone.openApp('youtube');
smartPhone.connectToWiFi('work wifi', 'super strong password');


let tablet = new Tablet();
tablet.openApp('slack');
tablet.connectToWiFi('HomeWiFi', 'strong password');
