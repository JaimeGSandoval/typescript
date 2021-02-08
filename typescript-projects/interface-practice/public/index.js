import { Hokage } from './Hokage.js'; // Have to as .js extension because of a typescript bug when making js files.
var Kakashi = new Hokage('Hatake Kakashi', 6, false);
var Naruto = new Hokage("Uzumaki Naruto", 7, true);
var Minato = new Hokage("Minato Namikaze", 4, true);
console.log(Kakashi.name + " was the " + Kakashi.hokageNumber + "th Hokage. Sage Mode: " + Kakashi.sageMode + " ");
console.log(Naruto.name + " was the " + Naruto.hokageNumber + "th Hokage. Sage Mode: " + Naruto.sageMode + " ");
console.log(Minato.name + " was the " + Minato.hokageNumber + "th Hokage. Sage Mode: " + Minato.sageMode + " ");
