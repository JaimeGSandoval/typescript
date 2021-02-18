var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Expose, Type } from 'class-transformer';
import { Media } from '../abstract-media/Media';
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(name, description, pictureLocation, genre, author, numberOfPages, identifier) {
        var _this = _super.call(this, name, description, pictureLocation, genre, identifier) || this;
        _this._numberOfPages = numberOfPages;
        _this._author = author;
        return _this;
    }
    Object.defineProperty(Book.prototype, "author", {
        get: function () {
            return this._author;
        },
        set: function (author) {
            this._author = author;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Book.prototype, "numberOfPages", {
        get: function () {
            return this._numberOfPages;
        },
        set: function (numberOfPages) {
            this._numberOfPages = numberOfPages;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Expose()
    ], Book.prototype, "author", null);
    __decorate([
        Expose(),
        Type(function () { return Number; })
    ], Book.prototype, "numberOfPages", null);
    return Book;
}(Media));
export { Book };
//# sourceMappingURL=Book.js.map