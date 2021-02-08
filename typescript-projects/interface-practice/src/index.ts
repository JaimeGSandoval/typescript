import { Hokage } from './Hokage.js'; // Have to as .js extension because of a typescript bug when making js files.
import { INinja } from './INinja';

const Kakashi: INinja = new Hokage('Hatake Kakashi', 6, false);
const Naruto: INinja = new Hokage("Uzumaki Naruto", 7, true);
const Minato: INinja = new Hokage("Minato Namikaze", 4, true);

console.log(`${Kakashi.name} was the ${Kakashi.hokageNumber}th Hokage. Sage Mode: ${Kakashi.sageMode} `);
console.log(`${Naruto.name} was the ${Naruto.hokageNumber}th Hokage. Sage Mode: ${Naruto.sageMode} `);
console.log(`${Minato.name} was the ${Minato.hokageNumber}th Hokage. Sage Mode: ${Minato.sageMode} `);
