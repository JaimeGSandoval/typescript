var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Expose } from "class-transformer";
export var Genre;
(function (Genre) {
    Genre["Horror"] = "Horror";
    Genre["Fantastic"] = "Fantastic";
    Genre["Thriller"] = "Thriller";
    Genre["Romance"] = "Romance";
    Genre["Fiction"] = "Fiction";
    Genre["ScienceFiction"] = "Science Fiction";
})(Genre || (Genre = {}));
var Media = /** @class */ (function () {
    function Media(_name, _description, _pictureLocation, _genre, identifier) {
        this._name = _name;
        this._description = _description;
        this._pictureLocation = _pictureLocation;
        this._genre = _genre;
        if (identifier) {
            this._identifier = identifier;
        }
        else {
            // this is just for the example; for any real project, use
            // UUIDs instead: https://www.npmjs.com/package/uuid
            this._identifier = Math.random().toString(36).substr(2, 9);
        }
    }
    Object.defineProperty(Media.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        set: function (identifier) {
            this._identifier = identifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (description) {
            this._description = description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "pictureLocation", {
        get: function () {
            return this._pictureLocation;
        },
        set: function (pictureLocation) {
            this._pictureLocation = pictureLocation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "genre", {
        get: function () {
            return this._genre;
        },
        set: function (genre) {
            this._genre = genre;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Expose()
    ], Media.prototype, "identifier", null);
    __decorate([
        Expose()
    ], Media.prototype, "name", null);
    __decorate([
        Expose()
    ], Media.prototype, "description", null);
    __decorate([
        Expose()
    ], Media.prototype, "pictureLocation", null);
    __decorate([
        Expose()
    ], Media.prototype, "genre", null);
    return Media;
}());
export { Media };
//# sourceMappingURL=Media.js.map