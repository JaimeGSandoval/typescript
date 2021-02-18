import { MediaCollection } from '../model/MediaCollection';
import { classToPlain, plainToClassFromExist } from "class-transformer";
import localForage from "localforage";
var MediaServiceImpl = /** @class */ (function () {
    // _type is the constructor of either class Book or Movie
    function MediaServiceImpl(_type) {
        this._type = _type;
        console.log("Initializing media service for " + _type.name);
        // each instance of the media service has its own data store: https://github.com/localForage/localForage
        // the initialization options are described here: https://localforage.github.io/localForage/#settings-api-config
        this._store = localForage.createInstance({
            name: 'mediaMan',
            version: 1.0,
            storeName: "media-man-" + _type.name,
            description: 'MediaMan data store'
        });
    }
    MediaServiceImpl.prototype.loadMediaCollection = function (identifier) {
        var _this = this;
        console.log("Trying to load media collection with the following identifier: " + identifier);
        return new Promise(function (resolve, reject) {
            _this._store.getItem(identifier)
                .then(function (value) {
                console.log("Found the collection: ", value);
                // _type is either class Book or Movie
                var retrievedCollection = plainToClassFromExist(new MediaCollection(_this._type), value);
                console.log("Retrieved collection: ", retrievedCollection);
                resolve(retrievedCollection);
            })
                .catch(function (err) {
                reject(err); // let the error through
            });
        });
    };
    MediaServiceImpl.prototype.saveMediaCollection = function (collection) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!collection) {
                reject(new Error("The list cannot be null or undefined!"));
            }
            // console.log(`Saving media collection with the following name ${collection.name}`);
            var serializedVersion = classToPlain(collection, { excludePrefixes: ["_"] });
            // console.log("Serialized version: ", serializedVersion);
            console.log('1 TEST', serializedVersion);
            _this._store.setItem(collection.identifier, serializedVersion)
                .then(function (value) {
                console.log("Saved the " + collection.name + " collection successfully! Saved value: 2 TEST", value);
                resolve();
            })
                .catch(function (err) {
                console.error("Failed to save the " + collection.name + " collection with identifier " + collection.identifier + ". Error: " + err);
                reject(err);
            });
        });
    };
    MediaServiceImpl.prototype.getMediaCollectionIdentifiersList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("Retrieving the list of media collection identifiers");
            _this._store.keys()
                .then(function (keys) {
                console.log("Retrieved the of media collection identifiers: ", keys);
                resolve(keys);
            })
                .catch(function (err) {
                console.error("Failed to retrieve the list of media collection identifiers. Error: ", err);
                reject(err);
            });
        });
    };
    MediaServiceImpl.prototype.removeMediaCollection = function (identifier) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!identifier || '' === identifier.trim()) {
                reject(new Error("The identifier must be provided!"));
            }
            console.log("Removing media collection with the following identifier " + identifier);
            _this._store.removeItem(identifier)
                .then(function () {
                console.log("Removed the " + identifier + " collection successfully!");
                resolve();
            })
                .catch(function (err) {
                console.error("Failed to removed the " + identifier + " collection");
                reject(err);
            });
        });
    };
    return MediaServiceImpl;
}());
export { MediaServiceImpl };
//# sourceMappingURL=MediaServiceImpl.js.map