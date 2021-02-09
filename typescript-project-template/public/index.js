/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ninjas_Chuunin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ninjas/Chuunin */ "./src/ninjas/Chuunin.ts");
/* harmony import */ var _ninjas_Jounin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ninjas//Jounin */ "./src/ninjas/Jounin.ts");
/* harmony import */ var _ninjas_Hokage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ninjas/Hokage */ "./src/ninjas/Hokage.ts");
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



var konohamaru = new _ninjas_Chuunin__WEBPACK_IMPORTED_MODULE_0__.Chuunin('Saratobi', 'Konohamaru', 'Chuunin', 20);
var konohamaruText = document.querySelector('.konohamaru');
konohamaruText.textContent = konohamaru.textDescription();
var gai = new _ninjas_Jounin__WEBPACK_IMPORTED_MODULE_1__.Jounin('Might', 'Guy', 'Jounin', 35, true);
var gaiText = document.querySelector('.gai');
gaiText.textContent = gai.textDescription();
var kakashi = new _ninjas_Hokage__WEBPACK_IMPORTED_MODULE_2__.Hokage('Hatake', 'Kakashi', 'Hokage', 35, 6);
var kakashiText = document.querySelector('.kakashi');
kakashiText.textContent = kakashi.textDescription();


/***/ }),

/***/ "./src/ninjas/Chuunin.ts":
/*!*******************************!*\
  !*** ./src/ninjas/Chuunin.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chuunin": () => (/* binding */ Chuunin)
/* harmony export */ });
var Chuunin = /** @class */ (function () {
    function Chuunin(firstName, lastName, rank, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.rank = rank;
        this.age = age;
    }
    Chuunin.prototype.textDescription = function () {
        return "My name is " + this.firstName + " " + this.lastName + ".\nMy ninja rank is " + this.rank + ". I am " + this.age + " years old.";
    };
    return Chuunin;
}());

// konohamaruText.textContent = `My name is ${konohamaru.firstName} ${konohamaru.lastName}.\nMy ninja rank is ${konohamaru.rank}. I am ${konohamaru.age} years old.`;


/***/ }),

/***/ "./src/ninjas/Hokage.ts":
/*!******************************!*\
  !*** ./src/ninjas/Hokage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hokage": () => (/* binding */ Hokage)
/* harmony export */ });
var Hokage = /** @class */ (function () {
    function Hokage(firstName, lastName, rank, age, kageNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.rank = rank;
        this.age = age;
        this.kageNumber = kageNumber;
    }
    Hokage.prototype.textDescription = function () {
        return "My name is " + this.firstName + " " + this.lastName + ".\nI am the " + this.kageNumber + "th " + this.rank + ". I am " + this.age + " years old.";
    };
    return Hokage;
}());



/***/ }),

/***/ "./src/ninjas/Jounin.ts":
/*!******************************!*\
  !*** ./src/ninjas/Jounin.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Jounin": () => (/* binding */ Jounin)
/* harmony export */ });
var Jounin = /** @class */ (function () {
    function Jounin(firstName, lastName, rank, age, eightGates) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.rank = rank;
        this.age = age;
        this.eightGates = eightGates;
    }
    Jounin.prototype.textDescription = function () {
        return "My name is " + this.firstName + " " + this.lastName + ".\nMy ninja rank is " + this.rank + ". I am " + this.age + " years old. It is " + this.eightGates + " that I have unlocked the 8 gates.";
    };
    return Jounin;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=index.js.map