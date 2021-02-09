// INTERFACES
// Interfaces create a structure/rules for objects and classes to follow
// If you have worked with Java or C#, you can find that the main use of the interface is to define a contract between unrelated classes.
// TypeScript interfaces define contracts in your code and provide explicit names for type checking.
// Interfaces may have optional properties or readonly properties.
// Interfaces can be used as function types.
// Interfaces are typically used as class types that make a contract between unrelated classes.


// interface IPerson {
//   name: string;
//   age: number;
//   speak(word: string): void;
//   pay(price: number): number
// }

// const james: IPerson = {
//   name: 'James',
//   age: 38,
//   speak(word: string): void {
//     console.log(word);
//   },
//   pay(price: number): number {
//     return price * 2;
//   }
// }

// const greetPerson = (person: IPerson): void => {
//    console.log(person.name);
// }

// greetPerson(james);


// TYPE CASTING
// In TypeScript, you can use the as keyword or <> operator for type castings.
// let input = document.querySelector('input[type="text"]') as HTMLInputElement
// Now, the input variable has the type HTMLInputElement. So accessing its value property won’t cause any error. The following code works:
// Note that the HTMLInputElement type extends the HTMLElement type that extends to the Element type. When you cast the HTMLElement to HTMLInputElement, this type casting is also known as a down casting.
// Besides the as keyword, you can use the <> operator to carry a type casting. For example:
// let input = <HTMLInputElement>document.querySelector('input[type="text"]');
// Type casting allows you to convert a variable from one type to another.s


import { Chuunin } from './ninjas/Chuunin';
import { Jounin } from './ninjas//Jounin';
import { Hokage } from './ninjas/Hokage';
import { INinja } from './ninjas/INinja';

const konohamaru: INinja = new Chuunin('Saratobi', 'Konohamaru', 'Chuunin', 20);
const konohamaruText = document.querySelector('.konohamaru') as HTMLHeadingElement;

konohamaruText.textContent = `My name is ${konohamaru.firstName} ${konohamaru.lastName}.\nMy ninja rank is ${konohamaru.rank}. I am ${konohamaru.age} years old.`;

const gai: INinja = new Jounin('Might', 'Guy', 'Jounin', 35, true);
const gaiText = document.querySelector('.gai') as HTMLHeadingElement;

gaiText.textContent = `My name is ${gai.firstName} ${gai.lastName}.\nMy ninja rank is ${gai.rank}. I am ${gai.age} years old. It is ${gai.eightGates} that I have unlocked the 8 gates.`;

const kakashi: INinja = new Hokage('Hatake', 'Kakashi', 'Hokage', 35, 6);
const kakashiText = document.querySelector('.kakashi') as HTMLHeadingElement;

kakashiText.textContent = `My name is ${kakashi.firstName} ${kakashi.lastName}.\nI am the ${kakashi.kageNumber}th ${kakashi.rank}. I am ${kakashi.age} years old.`;
