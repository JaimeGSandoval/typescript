var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Expose, Type } from 'class-transformer';
var MediaCollection = /** @class */ (function () {
    function MediaCollection(type, name, identifier) {
        this._name = "";
        this._collection = [];
        this._type = type;
        if (name) {
            this._name = name;
        }
        if (identifier) {
            this._identifier = identifier;
        }
        else {
            // this is just for the example; for any real project, use
            // UUIDs instead: https://www.npmjs.com/package/uuid
            this._identifier = Math.random().toString(36).substr(2, 9);
        }
    }
    Object.defineProperty(MediaCollection.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        set: function (identifier) {
            this._identifier = identifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaCollection.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaCollection.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (collection) {
            this._collection = collection;
        },
        enumerable: true,
        configurable: true
    });
    MediaCollection.prototype.addMedia = function (media) {
        if (media) {
            this._collection = this._collection.concat(media);
        }
    };
    MediaCollection.prototype.removeMedia = function (itemId) {
        if (itemId) {
            this._collection = this._collection.filter(function (item) {
                return item.identifier !== itemId;
            });
        }
    };
    __decorate([
        Expose()
    ], MediaCollection.prototype, "identifier", null);
    __decorate([
        Expose()
    ], MediaCollection.prototype, "name", null);
    __decorate([
        Expose(),
        Type(function (options) {
            if (options) {
                return options.newObject._type;
            }
            else {
                throw new Error("Cannot not determine the type because the options object is null or undefined");
            }
        })
    ], MediaCollection.prototype, "collection", null);
    return MediaCollection;
}());
export { MediaCollection };
//# sourceMappingURL=MediaCollection.js.map