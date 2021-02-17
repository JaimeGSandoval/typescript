"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var localforage_1 = __importDefault(require("localforage"));
var class_transformer_1 = require("class-transformer");
console.log('MediaMan - Loading...');
// First of all, let's define our Genre enum. We'll use a string enum since this will be the easiest to understand:
var Genre;
(function (Genre) {
    Genre["Horror"] = "Horror";
    Genre["Fantastic"] = "Fantastic";
    Genre["Thriller"] = "Thriller";
    Genre["Romance"] = "Romance";
    Genre["Fiction"] = "Fiction";
    Genre["ScienceFiction"] = "Science Fiction";
})(Genre || (Genre = {}));
// Next, we can implement the base Media class. Once again, we are using encapsulation. Additionally, we have marked this class as abstract since it doesn't make sense to be able to instantiate it. The _identifier member will be used to acquire a somewhat unique technical key for each media instance. Note that you should use Universally Unique Identifiers (UUIDs) for this purpose in real applications instead, as the preceding approach is unsafe.
// Coming to MVC terminology this would be our  “Model” or “Domain Model”. Basically Domain Model consist of those attributes for an Entity which qualifies it in the real world in the context of a particular domain (example: Human Resources).
var Media = /** @class */ (function () {
    function Media(_name, _description, _pictureLocation, _genre, identifier
    // Note that we optionally allow forcing an identifier. This will be useful when we retrieve persisted data, as we want those keys to remain stable (that is, they don't change).
    ) {
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
        class_transformer_1.Expose()
    ], Media.prototype, "identifier", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "name", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "description", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "pictureLocation", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "genre", null);
    return Media;
}());
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
        class_transformer_1.Expose()
    ], Book.prototype, "author", null);
    __decorate([
        class_transformer_1.Expose(),
        class_transformer_1.Type(function () { return Number; })
    ], Book.prototype, "numberOfPages", null);
    return Book;
}(Media));
var Movie = /** @class */ (function (_super) {
    __extends(Movie, _super);
    function Movie(name, description, pictureLocation, genre, duration, director, identifier) {
        var _this = _super.call(this, name, description, pictureLocation, genre, identifier) || this;
        _this._duration = duration;
        _this._director = director;
        return _this;
    }
    Object.defineProperty(Movie.prototype, "director", {
        get: function () {
            return this._director;
        },
        set: function (director) {
            this._director = director;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (duration) {
            this._duration = duration;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        class_transformer_1.Expose()
    ], Movie.prototype, "director", null);
    __decorate([
        class_transformer_1.Expose()
    ], Movie.prototype, "duration", null);
    return Movie;
}(Media));
// Next, we will implement the saveMediaCollection method. This method needs to invoke localForage to serialize and persist the given MediaCollection object. As this operation will be asynchronous, our method will have to return a Promise object. Before we can do so, we need to take care of two important issues.
// Handling serialization/deserialization
// When localForage persists objects, it first serializes them to JSON. Since we are using TypeScript classes for our data model, one issue that we have to tackle right away is How can we serialize TypeScript class instances to JSON?
// There are actually many answers to this question. The most obvious one is to use JSON.stringify (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), a standard API that converts JavaScript objects to a JSON string. However that solution is hard to implement, if you try it out you'll see that private fields will be serialized without taking getters into account. Hence, the JSON objects will have keys such as _name, which is far from ideal.
// Other answers include the following:
// Implementing base classes to handle serialization: This is not great and there is a big risk of introducing subtle bugs.
// Implementing a toJSON function on the prototype, which should be called by JSON.stringify: This is far from straightforward, especially for more advanced cases (complex data structures, circular references, and much more​); again there is a risk of introducing bugs.
// There is also a second closely related issue that we need to solve: How can we deserialize a JSON object back into a class instance?
// There are actually even harder problems to consider (for example, how to properly handle versioning), but we'll only focus on those two issues for now.
// To ease our lives and reduce the risk of introducing bugs, we will use the class-transformer (https://github.com/typestack/class-transformer) library. This library can handle both the serialization and deserialization of classes from/to POJOs or literal objects.
// Using class-transformer, we will add decorators such as @Expose() to our classes in order to guide class-transformer when it performs serialization/deserialization.
// Installing class-transformer and reflect-metadata
// Now that you understand why we need this library, let's install class-transformer. Install the dependency using npm install class-transformer --save.
// Once again we're in luck: since class-transformer is written in TypeScript, its npm package includes type definitions so we don't need to install them separately.
// You also need to install reflect-metadata (https://www.npmjs.com/package/reflect-metadata), which is a library that class-transformer requires to perform runtime reflection on types. You can learn more about it here: http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4. Install reflect-metadata using npm install reflect-metadata --save.
// Again, the type definitions for this are included in the npm package.
// ************* Adding class-transformer decorators to domain classes *********
// First of all, since we are going to use decorators, we need to adapt the tsconfig.json file to add support for them (actually, to remove warnings):
// 1. Edit the file and set the experimentalDecorators option to true.
// Next, import the decorators from class-transformer.
// 2. Add the following import statement at the top of the mediaman.ts file: import {classToPlain, plainToClassFromExist, Expose, Type} from "class-transformer";.
// Finally, you also need to import reflect-metadata.
// 3. Add the import statement, import "reflect-metadata";, at the top of the file (that is, before the class-transformer imports).
// 4. Now, adapt the MediaCollection class as follows:
// First of all, you need to add the class, private fields, and the constructor:
var MediaCollection = /** @class */ (function () {
    function MediaCollection(type, name, identifier) {
        this._name = '';
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
        class_transformer_1.Expose()
    ], MediaCollection.prototype, "identifier", null);
    __decorate([
        class_transformer_1.Expose()
    ], MediaCollection.prototype, "name", null);
    __decorate([
        class_transformer_1.Expose(),
        class_transformer_1.Type(function (options) {
            if (options) {
                return options.newObject._type;
            }
            else {
                throw new Error('Cannot not determine the type because the options object is null or undefined');
            }
        })
    ], MediaCollection.prototype, "collection", null);
    return MediaCollection;
}());
// This interface doesn't say anything about how the lists will be loaded or persisted. An implementation of this interface might save the lists to disk, over the network through a REST API.​ As a matter of fact, clients of this interface (such as our controller) do not care about the how; it is none of their concern. What they do care about is that it gets done; the how is entirely the responsibility of the service implementation.
// This way of isolating concerns is very beneficial because we could later swap one implementation for another without impacting those parts of the system that rely on the interface.
// Implementing the media service
// Now that we know about the different APIs that we can use to manage data locally, let's implement our media service.
// Library choice
// As we've already seen, LocalStorage and IndexedDB are standard APIs available in modern web browsers. However, there are always small discrepancies between implementations (for example, around error handling), and it is usually simpler to rely on a library, both for homogeneity and simplicity.
// In our case, we will use the localForage library, which provides an easy-to-use API on top of both IndexedDB and LocalStorage. By default, it will try to use IndexedDB and will fall back to LocalStorage if it isn't available. You can find the documentation for localForage here: https://github.com/localForage/localForage.
// Introduction to the Promise API
// localForage exposes a Promise-based API. The Promise API is another modern web standard. Promise provides a good solution for implementing asynchronous code without ending up with the famous pyramid of doom, also known as callback hell. Take a look at this website to learn more: http://callbackhell.com.
// We won't be able to explore how they work in any detail, but here's a quick summary to give you an idea so that the rest of the code doesn't scare you too much.
// As its name implies, a promise represents a vow to deliver something at a later point in time, unless something goes wrong, thereby making the promise impossible to respect. There are two basic possible outcomes for a promise:
// The promise can be kept and the something can be delivered.
// The promise cannot be held and an error is returned.
// Promises can be in three different states:
// Pending: Not resolved yet
// Fulfilled: Resolved
// Rejected: Failed
// You should also know that there are two functions that we can call on a Promise object:
// then(result ⇒ { ...​ }): The then function can be used to define a success callback function. That callback function will be invoked if/when the promise is resolved successfully. In this example, the result argument of the lambda will be the outcome of the promise.
// catch(error ⇒ { ...​ }): The catch function can be used to define a failure callback function. That callback function will be invoked if/when the promise is broken. In this example, the error argument of the lambda will be the error raised if the promise is broken.
// Earlier, when we've created our MediaService interface, we defined the loadMediaCollection method as loadMediaCollection(name: string): Promise<MediaCollection<T>>. Based on what we've just explained, you should have an idea of what this declaration means. Just in case, here it goes: when this method is called, it will immediately (that is, synchronously) return a Promise<MediaCollection<T>> object. This Promise object will later receive the result or an error.
//************* */ TypeScript type definitions (typings) ****************
// In TypeScript, most of the time, we also need to install type definitions (also called typings) separately for the JavaScript libraries that we use. Type definitions are files used by the TypeScript compiler to help us out while coding and compiling. They contain all the information about types that are used in a library: interfaces, classes, module declarations, custom types, and more.
// Without type definitions, the TypeScript compiler wouldn't know much about the types used in third-party JavaScript libraries that you may want to use. Without that information, TypeScript loses a lot of its appeal because you have to rely on the any keyword everywhere.
// Type definitions are stored in .d.ts files. They are only needed for JavaScript libraries but, of course, as soon you transpile TypeScript code to JavaScript, all the type information is lost.
// For TypeScript-based projects, generating type definition files is very easy: you only need to set the declaration compiler option to true in the tsconfig.json file (or enable it by passing the --declaration argument directly when invoking tsc). Go ahead and change that option now for MediaMan. If you build the application after that, you'll see that TypeScript generates an additional mediaman.d.ts file for you, containing all the type information.
// As you know, there are hundreds of thousands of JavaScript libraries and, of course, only a small subset of those libraries are written in TypeScript. For all the other ones, type definitions have to be created by hand or using other tools such as dts-gen: https://github.com/Microsoft/dts-gen.
// As the TypeScript community grew, the need to centralize type definition files arose and, at some point, a project called DefinitelyTyped (http://definitelytyped.org) was created to regroup as many type definitions as possible. Today, DefinitelyTyped hosts type definitions for thousands of libraries.
// Initially, installing type definitions in your project required manual work, but nowadays it has become very straightforward. The TypeScript team has automated the process of creating npm packages out of the type definitions hosted on DefinitelyTyped. Thanks to this, you can simply use npm to install type definitions, knowing that the following naming convention is used for typings: @types/<library_name> (@types being the name of the namespace under which all type definition packages are published).
// For example, type definitions for the very popular lodash (https://github.com/lodash/lodash) library are available at https://www.npmjs.com/package/@types/lodash and can be installed easily using npm install @types/lodash.
// Whenever you add a library to your projects, check whether the typings are provided along with the library, or whether they are on DefinitelyTyped and accessible through @types/<library_name>.
// **************** Adding localForage to the project *****************
// First of all, we need to add localForage to our project. We can do so using npm:
// Copy
// npm install localforage --save
// Luckily for us, some libraries such as localForage include type definitions directly and so they're even easier to use with TypeScript!
// We don't need to do anything more to get started with localForage in our project!
// *********** Service implementation ****************
// First of all, we need to import localForage in our code:
// Add the following statement at the top of the file in order to import localForage: import localForage from "localforage";. Without this, you will not be able to use the library. By doing this, we will actually trigger loading localForage when our JavaScript code gets loaded by the index.html file.
// Now that we have added localForage and have loaded it, we can create an implementation of the MediaService interface:
// The first thing that we need to do is configure localForage properly. In order to keep things simple, we will create a separate instance of the MediaServiceImpl class for each media type that we will manage. We could actually make our code smarter and even more generic, but it would hinder readability. For this reason, we will use a specific object store for each type of media. Let's see how!
var MediaServiceImpl = /** @class */ (function () {
    function MediaServiceImpl(_type) {
        this._type = _type;
        // If you pay close attention to the constructor of our class, you'll note that the type is passed through there as Function. Actually, when creating an instance of the MediaServiceImpl class, we can pass it a type by name. The following is an example of what this looks like: const bookService = new MediaServiceImpl<Book>(Book);. When you pass the name of a class as an argument, you actually pass its constructor function
        console.log("Initializing media service for " + _type.name);
        // each instance of the media service has its own data store: https://github.com/localForage/localForage
        // the initialization options are described here: https://localforage.github.io/localForage/#settings-api-config
        this._store = localforage_1.default.createInstance({
            name: 'mediaMan',
            version: 1.0,
            storeName: "media-man-" + _type.name,
            description: 'MediaMan data store',
        });
    }
    // First of all, we have declared a _store field. This is what our service will use to load/persist data using localForage. The _store field gets initialized in the constructor, where we used the createInstance function, allowing us to create a dedicated store instance. This is explained in the official localForage documentation at https://localforage.github.io/localForage/#multiple-instances-createinstance.
    // Notice the -<name> suffix that we have added to the storeName property with -${_type.name}. This suffix will help us to differentiate between collections of media (for example, between collections of Book objects, collections of Movie objects, and so on​). The _type.name property will give us the name of the type that this specific service instance will take care of (for example, Book).
    // Implementing the loadMediaCollection method
    // Persisting data is nice but, of course, it's even nicer if it can be retrieved later.
    // Let's implement the load method as follows:
    MediaServiceImpl.prototype.loadMediaCollection = function (identifier) {
        var _this = this;
        console.log("Trying to load media collection with the following identifier: " + identifier);
        return new Promise(function (resolve, reject) {
            _this._store
                .getItem(identifier)
                .then(function (value) {
                console.log('Found the collection: ', value);
                var retrievedCollection = class_transformer_1.plainToClassFromExist(new MediaCollection(_this._type), value);
                console.log('Retrieved collection: ', retrievedCollection);
                resolve(retrievedCollection);
            })
                .catch(function (err) {
                reject(err); // let the error through
            });
        });
    };
    MediaServiceImpl.prototype.saveMediaCollection = function (collection) {
        var _this = this;
        // By marking the saveMediaCollection argument as read-only, we make sure that we don't modify the object by mistake.
        return new Promise(function (resolve, reject) {
            if (!collection) { // 3
                reject(new Error('The list cannot be null or undefined!'));
            }
            console.log("Saving media collection with the following name " + collection.name);
            // classToPlain function takes two arguments:
            // 1. The object to serialize (ideally containing the class-transformer decorators).
            // 2. An options object: through this object, it is possible to alter the serialization process.
            var serializedVersion = class_transformer_1.classToPlain(collection, {
                excludePrefixes: ['_'],
            });
            console.log('Serialized version: ', serializedVersion);
            _this._store
                .setItem(collection.identifier, serializedVersion)
                // 5
                .then(function (value) {
                console.log("Saved the " + collection.name + " collection successfully! Saved value: ", value);
                resolve();
            })
                .catch(function (err) {
                console.error("Failed to save the " + collection.name + " collection with identifier " + collection.identifier + ". Error: " + err);
                reject(err);
            });
        });
    };
    // Implementing the saveMediaCollection method above
    // 1. Our method accepts MediaCollection<T> as input and returns Promise<void>, which simply indicates that there won't be a value coming out of the promise upon resolution (that is, it will just be a signal).
    // 2. We immediately return a new Promise object.
    // 3. The first thing we do in the promise definition is to check whether the expected argument was provided. If not, we use the reject callback to directly return an error.
    // 4. We use classToPlain to serialize the MediaCollection object:
    // Note that we use the excludePrefixes option in order to exclude all properties whose name starts with an underscore in order to avoid exposing our private properties directly (for example, _name in the Media class).
    // 5. We invoke the setItem function on our store (that is, localForage) to persist the serialized version of the MediaCollection object, using the collection's identifier as a key.
    // 6. Since the setItem function returns a promise, we use .then to define what to do when it resolves:
    // In this case, we simply call resolve() on the promise that we have returned at the beginning.
    // 7. We also use .catch to catch and pass any errors through using the reject(...​) function on our promise.
    // Implementing the getMediaCollectionIdentifiersList method
    // This method will simply return an array containing all the keys in the store. This will come in handy later when we work on the UI, in order to allow us to load the existing collections.
    // The following is the relevant code:
    MediaServiceImpl.prototype.getMediaCollectionIdentifiersList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('Retrieving the list of media collection identifiers');
            _this._store
                .keys()
                .then(function (keys) {
                console.log('Retrieved the of media collection identifiers: ', keys);
                resolve(keys);
            })
                .catch(function (err) {
                console.error('Failed to retrieve the list of media collection identifiers. Error: ', err);
                reject(err);
            });
        });
    };
    // This is, of course, very similar to what we've just done in the preceding section. The main difference the following is that we use the keys() method, which returns the list of keys, as described in the localForage documentation: https://localforage.github.io/localForage/#data-api-keys.
    // Implementing the removeMediaCollection method
    MediaServiceImpl.prototype.removeMediaCollection = function (identifier) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!identifier || '' === identifier.trim()) {
                reject(new Error('The identifier must be provided!'));
            }
            console.log("Removing media collection with the following identifier " + identifier);
            _this._store
                .removeItem(identifier)
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
// ************ Implementing the HTMLMediaManView class *********************
// The base structure
// In the constructor, we directly retrieve some DOM elements that we will use later:
// The form used to create new book collections
// The input field used for the name of new book collections
// The container for book collections through which we will be able to add new book collections later on
// If those cannot be found, then there's probably a bug to fix; so, again, the sooner we know, the better.
// Finally, we also generate a list of <option> elements corresponding to the entries in our Genre enum. We'll use this when we generate the form used to create new books in the renderBookCollection method.
var HTMLMediaManView = /** @class */ (function () {
    function HTMLMediaManView() {
        this._genreOptions = '';
        this._newBookCollectionForm = document.getElementById('newBookCollection');
        this._newBookCollectionName = document.getElementById('newBookCollectionName');
        this._bookCollectionsContainer = document.getElementById('bookCollections');
        if (!this._newBookCollectionForm) {
            throw new Error("Could not initialize the view. The 'newBookCollection' element id was not found. Was the template changed?");
        }
        if (!this._newBookCollectionName) {
            throw new Error("Could not initialize the view. The 'newBookCollectionName' element id was not found. Was the template changed?");
        }
        if (!this._bookCollectionsContainer) {
            throw new Error("Could not initialize the view. The 'bookCollections' element id was not found. Was the template changed?");
        }
        for (var genreKey in Genre) {
            this._genreOptions += "<option value=\"" + genreKey + "\">" + Genre[genreKey] + "</option>\">";
        }
    }
    // Implementing basic validation using the HTML Form Validation API
    // Let's start by implementing the getNewBookCollectionName method. Its goal is simply to return the name of the book collection that needs to be created. It will be called whenever the user asks you to create a collection:
    HTMLMediaManView.prototype.getNewBookCollectionName = function () {
        // build upon standard HTML DOM validation
        if (this._newBookCollectionName.checkValidity() === false) {
            this._newBookCollectionName.reportValidity();
            throw new Error('Invalid collection name!');
        }
        return this._newBookCollectionName.value;
    };
    // When this method executes, it first checks whether the field is currently valid or not. To do this, it relies on native HTML form validation support (https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation) and the corresponding JavaScript DOM APIs.
    // The check is done using the checkValidity() method on the DOM input node. If the input is not valid (for example, no value has been given), then the method calls reportValidity(), which will let the user know that something is wrong. Then, the method throws an Error instance to let the calling code know that something went wrong. Actually, this is not the best practice, as it actually abuses exceptions. We will explain why in the next subsection. Finally, the method returns the value of the input field.
    //************ Why exceptions should not be used in this case *****************
    // The problem with throwing an exception in the getNewBookCollectionName method is that it changes the control flow of the application. The calling code will have to explicitly catch this exception if it wants to be able to react to it. However, since there is no notion such as checked exceptions in JavaScript and TypeScript, the calling code might not even know that an exception could be raised when calling the method!
    // We say that throwing exceptions changes the control flow because, when we throw exceptions, it is practically the same as a goto statement, as you should know, goto is considered to be harmful: http://wiki.c2.com/?GotoConsideredHarmful. It makes the code harder to read/understand and can also cause bugs and unwanted behavior. This is related to the principle of least astonishment (http://wiki.c2.com/?PrincipleOfLeastAstonishment), which simply states that operations should act in an obvious, consistent, and predictable way.
    // You should bear in mind the following rule of thumb: exceptions should only be used for exceptional occasions.
    // You can learn more about this issue at http://wiki.c2.com/?DontUseExceptionsForFlowControl.
    // So, what is the alternative then? If you examine the getNewBookDetails method signature in the MediaManView interface, you'll note that it returns a custom object shape: { error?: string, book?: Readonly<Book> }. The idea is to return a known data structure. This makes the fact that errors could be returned more explicit, hence making the code more predictable and understandable. This is a recommended approach to keep a logical control flow and avoid abusing exceptions, which should be exceptional. This is a pattern that should be familiar to JavaScript and Node.js developers.
    // The renderBook method will add the given book to the DOM of the corresponding collection. This is done using the identifiers that we defined earlier. As you can see, they're necessary and central to application code:
    HTMLMediaManView.prototype.renderBook = function (collectionIdentifier, book) {
        // Here, we again throw an exception if no book object is as given, simply because this will be a bug.
        if (!book) {
            throw new Error('The book to render must be provided!');
        }
        var collectionTableBody = document.getElementById("collectionTableBody-" + collectionIdentifier);
        if (!collectionTableBody) {
            throw new Error("The table body for collection " + collectionIdentifier + " could not be found! Was the template changed?");
        }
        var tableRow = collectionTableBody.insertRow();
        tableRow.id = "book-" + collectionIdentifier + "-" + book.identifier;
        tableRow.innerHTML = "\n        <td>\n        <img class=\"mediaImage\" src=\"" + book.pictureLocation + "\">\n        </td>\n        <td>" + book.name + "</td>\n        <td>" + book.genre + "</td>\n        <td>" + book.description + "</td>\n                <td>" + book.author + "</td>\n                <td>" + book.numberOfPages + "</td>\n                <td>\n                    <a href=\"#\" onclick=\"mediaManController.removeBook('" + collectionIdentifier + "','" + book.identifier + "');\">X</a>\n                </td>\n        ";
        collectionTableBody.appendChild(tableRow);
    };
    // The next method is also the longest. This method accepts MediaCollection<Book> as input and appends it to the DOM. By doing this, we can leverage template strings. These will allow us to write HTML code easily without requiring a lot of escape characters that would otherwise be needed if we used standard or single quotes instead.
    // The following is the code:
    HTMLMediaManView.prototype.renderBookCollection = function (bookCollection) {
        var _this = this;
        this._bookCollectionsContainer.innerHTML += "\n        <div id=\"bookCollection-" + bookCollection.identifier + "\" class=\"collection\">\n            <h3 class=\"collectionName\">" + bookCollection.name + "</h3>\n            <div class=\"containerGroup\">\n                <div class=\"container\">\n                    <h3>New book</h3>\n                    <form id=\"newBook-" + bookCollection.identifier + "\" action=\"#\">\n                        <ul>\n                            <li>\n                                <input id=\"newBookName-" + bookCollection.identifier + "\" type=\"text\" title=\"Name\" placeholder=\"Name\" required>\n                                <input id=\"newBookAuthor-" + bookCollection.identifier + "\" type=\"text\" placeholder=\"Author\" required>\n                            </li>\n                            <li>\n                                <select id=\"newBookGenre-" + bookCollection.identifier + "\" required>\n                                    " + this._genreOptions + "\n                                </select>\n                                <input id=\"newBookPages-" + bookCollection.identifier + "\" type=\"number\" placeholder=\"Pages\" required>\n                            </li>\n                            <li>\n                                <input id=\"newBookPicture-" + bookCollection.identifier + "\" type=\"url\" title=\"Picture\" placeholder=\"Picture URL\">\n                            </li>\n                            <li>\n                                <textarea id=\"newBookDescription-" + bookCollection.identifier + "\" placeholder=\"Description\"></textarea>\n                            </li>\n                        </ul>\n                        <input type=\"button\" value=\"Create\" onclick=\"mediaManController.createBook('" + bookCollection.identifier + "');\" />\n                    </form>\n                </div>\n                <div class=\"collectionToolsContainer\">\n                    <h3>Tools</h3>\n                    <form action=\"#\">\n                        <input type=\"button\" value=\"Remove collection\" onclick=\"mediaManController.removeBookCollection('" + bookCollection.identifier + "');\" />\n                    </form>\n                </div>\n            </div>\n            <div class=\"containerGroup\">\n                <div class=\"container\">\n                    <table class=\"collectionTable\">\n                        <thead>\n                        <tr>\n                            <td>Picture</td>\n                            <td>Name</td>\n                            <td>Genre</td>\n                            <td>Description</td>\n                            <td>Author</td>\n                            <td>Pages</td>\n                            <td>Remove</td>\n                        </tr>\n                        </thead>\n                        <tbody id=\"collectionTableBody-" + bookCollection.identifier + "\"></tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n        ";
        // The DOM structure is actually pretty simple. When a book collection is added, we add a div container for it inside the book collection's container (note that this has the collection class applied to it). Inside the book collection container, we display the collection name.
        // Below the name, we add a form for creating new books inside that specific collection. In addition to this, we add a container for tools related to this collection. For now, we will only provide a button for removing the collection, but we can easily come up with other options (for example, revert changes, rename collection, export, and more).
        // Finally, we add another container with a table inside. That table will be empty when a new collection is created, but if the collection contains media, then they will be added to it. This is handled by the code at the end of the method:
        bookCollection.collection.forEach(function (book) {
            _this.renderBook(bookCollection.identifier, book);
            // This simply invokes the renderBook method (which we will soon implement) for each and every book within the collection.
        });
    };
    // The clearBookCollections method's goal is to remove all book collections from the document. You can easily implement it as follows:
    HTMLMediaManView.prototype.clearBookCollections = function () {
        this._bookCollectionsContainer.innerHTML = '';
    };
    // This method removes given book collection from the DOM. Again, collections have an identifier and this is what we'll use here, as those identifiers are also present in the DOM that we generate.
    // The following is the code for the method:
    HTMLMediaManView.prototype.removeBookCollection = function (identifier) {
        var bookCollectionDOMNode = document.getElementById("bookCollection-" + identifier);
        if (!bookCollectionDOMNode) {
            throw new Error("Could not remove the book collection from the DOM. Couldn't find the DOM node");
        }
        else {
            bookCollectionDOMNode.remove();
        }
        // As you can see, we simply use the remove() method present on DOM nodes. If the DOM node is not found, we again throw an exception as this should not happen.
    };
    // This method will be a simple utility that displays messages to the end user. For simplicity, we will only use a basic alert box. In later projects, we will use so-called toast notifications instead, as it'll look better and will also provide a better user experience.
    // The following is the implementation:
    HTMLMediaManView.prototype.displayErrorMessage = function (errorMessage) {
        if (!errorMessage) {
            throw new Error('An error message must be provided!');
        }
        alert(errorMessage); // bad user experience but ignore this for now
    };
    // Implementing the getNewBookDetails method using keyof and typeof
    // The getNewBookDetails method will simply retrieve values for the different fields in the new book creation form (in a specific book collection) and will create a Book object corresponding to those values.
    // Let's add the code for it.
    // First, add the method and some defensive checks:
    HTMLMediaManView.prototype.getNewBookDetails = function (collectionIdentifier) {
        if (!collectionIdentifier) {
            // we throw this one because it means that there is a bug!
            throw new Error('The collection identifier must be provided!');
        }
        // required
        var newBookForm = document.getElementById("newBook-" + collectionIdentifier);
        if (!newBookForm) {
            throw new Error("Could not find the new book form for collection " + collectionIdentifier);
        }
        // build upon standard HTML DOM validation
        if (newBookForm.checkValidity() === false) {
            newBookForm.reportValidity();
            return {
                error: 'The new book form is invalid!',
            };
        }
        //  Then, retrieve the different DOM elements:
        // from here on out, no need to check the validity of the specific form fields
        // we just need to check if the fields can be found
        var newBookNameField = document.getElementById("newBookName-" + collectionIdentifier);
        if (!newBookNameField) {
            throw new Error("The new book form's name input was not found! Did the template change?");
        }
        var newBookAuthorField = document.getElementById("newBookAuthor-" + collectionIdentifier);
        if (!newBookAuthorField) {
            throw new Error("The new book form's author input was not found! Did the template change?");
        }
        var newBookGenreSelect = document.getElementById("newBookGenre-" + collectionIdentifier);
        if (!newBookGenreSelect) {
            throw new Error("The new book form's genre select was not found! Did the template change?");
        }
        var newBookPagesField = document.getElementById("newBookPages-" + collectionIdentifier);
        if (!newBookPagesField) {
            throw new Error("The new book form's page input was not found! Did the template change?");
        }
        // optional
        var newBookPictureField = document.getElementById("newBookPicture-" + collectionIdentifier);
        if (!newBookPictureField) {
            throw new Error("The new book form's picture input was not found! Did the template change?");
        }
        var newBookDescriptionField = document.getElementById("newBookDescription-" + collectionIdentifier);
        if (!newBookDescriptionField) {
            throw new Error("The new book form's description input was not found! Did the template change?");
        }
        // Finally, create the object and return it:
        var newBookGenre = Genre[newBookGenreSelect.value];
        var newBookNumberOfPages = Number.parseInt(newBookPagesField.value);
        return {
            book: new Book(newBookNameField.value, newBookDescriptionField.value, newBookPictureField.value, newBookGenre, newBookAuthorField.value, newBookNumberOfPages),
        };
    };
    // First, we check the validity of the whole form and report to the user if something is wrong.
    // Note that we also return a new object including the optional error property that we defined in our custom return type. This is what we meant when we mentioned the Node.js way of handling exceptions earlier.
    // By doing this, the calling code will be able to easily check for the presence of an error and react accordingly. In this case, this is much cleaner and less surprising than throwing an exception.
    // Then the major part of the code simply retrieves the DOM nodes that we expect to find and raise exceptions if they're not there (as this would be due to bugs and/or major changes in our code).
    // The way we retrieve the book's genre is also interesting:
    // const newBookGenre = Genre[newBookGenreSelect.value as keyof typeof Genre];
    // What we are doing with the preceding code is retrieving the Genre enum entry corresponding to the value selected by the user in the <select> element of the form.
    // In the code, you can see that we use both the keyof and typeof keywords. The reason for this is that, if we simply tried to use Genre[newBookGenreSelect.value], the TypeScript compiler would raise an error (https://stackoverflow.com/questions/36316326/typescript-ts7015-error-when-accessing-an-enum-using-a-string-type-parameter) because the string is arbitrary and TypeScript cannot know for sure that it will correspond to an existing entry of the Genre enum.
    //  The keyof operator is also called the index type query operator. It returns permitted property names for the given type. This operator is useful when you want to make sure that a given name is actually a valid key of some type.
    // This happens quite often in the JavaScript ecosystem, for example, when APIs accept property names as parameters and later access those properties using the someObject[propertyName] syntax.
    // You can find a great explanation of the keyof typeof <type> trick at https://github.com/Microsoft/TypeScript/issues/14106#issuecomment-280253269. The short version implies that, if we had only used keyof Genre, we would have obtained a union of the numeric values behind our enum entries, whereas we are rather interested in the string values.
    // The last method that we need to implement is removeBook. Here, we'll simply retrieve the DOM node corresponding to the book (that is, the table row) and remove it:
    HTMLMediaManView.prototype.removeBook = function (collectionIdentifier, bookIdentifier) {
        if (!collectionIdentifier) {
            throw new Error('The collection identifier must be provided!');
        }
        if (!bookIdentifier) {
            throw new Error('The book identifier must be provided!');
        }
        var bookElement = document.getElementById("book-" + collectionIdentifier + "-" + bookIdentifier);
        if (!bookElement) {
            throw new Error('The element corresponding to the book to remove could not be found! Did the template change?');
        }
        bookElement.remove();
    };
    // This method is very straightforward. We retrieve the form element from the DOM and call reset() on it:
    HTMLMediaManView.prototype.clearNewBookForm = function (collectionIdentifier) {
        if (!collectionIdentifier) {
            throw new Error('The collection identifier must be provided!');
        }
        var newBookForm = document.getElementById("newBook-" + collectionIdentifier);
        if (!newBookForm) {
            throw new Error("Could not find the new book form for collection " + collectionIdentifier);
        }
        newBookForm.reset();
    };
    // This method will simply reset the new book collection form using the reset() method available on HTMLFormElement objects.
    HTMLMediaManView.prototype.clearNewBookCollectionForm = function () {
        this._newBookCollectionForm.reset();
    };
    return HTMLMediaManView;
}());
// Implementing the MediaManController class
var MediaManControllerImpl = /** @class */ (function () {
    function MediaManControllerImpl(view, bookService, movieService) {
        // Maps are very useful when it comes to having efficient lookup times. Maps have constant lookup times, so no matter how big the map becomes, finding an item by its key will remain efficient.
        this._bookCollections = new Map();
        this._movieCollections = new Map();
        if (!view) {
            throw new Error('The view is mandatory!');
        }
        if (!bookService) {
            throw new Error('The book service is mandatory!');
        }
        if (!movieService) {
            throw new Error('The movie service is mandatory!');
        }
        this._view = view;
        this._bookService = bookService;
        this._movieService = movieService;
        this.reloadBookCollections(); // reload saved data when the application starts
    }
    // There are a few things to mention here:
    // As with TodoIt, our controller holds a reference to an instance of the view.
    // Our controller also holds references to service implementations.
    // We have defined maps for caching collections.
    // In the constructor, we call the reloadBookCollections() method to directly load the data.
    MediaManControllerImpl.prototype.reloadBookCollections = function () {
        var _this = this;
        this._bookService.getMediaCollectionIdentifiersList().then(function (keys) {
            _this._bookCollections.clear(); // clear the current state
            _this._view.clearBookCollections(); // remove the DOM nodes
            keys.forEach(function (key) {
                _this._bookService.loadMediaCollection(key).then(function (collection) {
                    _this._bookCollections.set(key, collection);
                    _this._view.renderBookCollection(collection);
                });
            });
        });
        // This method relies on the book service to manage the collection and orchestrate the view.
    };
    MediaManControllerImpl.prototype.createBookCollection = function () {
        var _this = this;
        var newBookCollectionName = this._view.getNewBookCollectionName();
        console.log('Creating a new book collection: ', newBookCollectionName);
        var newBookCollection = new MediaCollection(Book, newBookCollectionName);
        this._bookCollections.set(newBookCollection.identifier, newBookCollection);
        this._bookService
            .saveMediaCollection(newBookCollection)
            .then(function () {
            console.log("New book collection called \"" + newBookCollection.name + "\" saved successfully. Identifier: ", newBookCollection.identifier);
            _this._view.clearNewBookCollectionForm();
            _this._view.renderBookCollection(newBookCollection);
        })
            .catch(function (_) {
            _this._view.displayErrorMessage("Failed to save the new book collection called " + newBookCollectionName);
        });
        // Here, we get the information we need out of the view. We adapt our map by associating the collection identifier with the newly created media collection. Finally, we use the service to persist in our collection.
    };
    MediaManControllerImpl.prototype.removeBookCollection = function (identifier) {
        var _this = this;
        if (!identifier) {
            throw new Error('An identifier must be provided');
        }
        this._bookCollections.delete(identifier);
        this._view.removeBookCollection(identifier);
        this._bookService
            .removeMediaCollection(identifier)
            .then(function () {
            console.log('Removed the collection with identifier: ', identifier);
        })
            .catch(function (_) {
            _this._view.displayErrorMessage('Failed to remove the collection!');
        });
        // This method first makes sure that an identifier is provided. Then, it deletes the corresponding key from the map, tells the view to remove it as well, and, finally, invokes the corresponding service method.
        // In the event of an error, the view is asked to display an error message.
    };
    MediaManControllerImpl.prototype.createBook = function (collectionIdentifier) {
        var _this = this;
        if (!collectionIdentifier) {
            throw new Error('The collection identifier is required to create a new book!');
        }
        console.log('Retrieving the details about the new book to create...');
        var bookDetailsResult = this._view.getNewBookDetails(collectionIdentifier);
        if (bookDetailsResult.error) {
            console.error('Failed to retrieve the book details: ', bookDetailsResult.error);
            return;
        }
        if (!this._bookCollections.has(collectionIdentifier) ||
            !this._bookCollections.get(collectionIdentifier)) {
            console.error('Tried to add a book to an unknown collection. Identifier: ', collectionIdentifier);
            this._view.displayErrorMessage('Failed to create the new book!');
            return;
        }
        var existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection || !bookDetailsResult.book) {
            throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
        }
        var newBook = bookDetailsResult.book;
        existingCollection.addMedia(newBook);
        this._bookService
            .saveMediaCollection(existingCollection)
            .then(function () {
            console.log("Book collection called \"" + existingCollection.name + "\" updated successfully.");
            _this._view.clearNewBookForm(collectionIdentifier);
            _this._view.renderBook(existingCollection.identifier, newBook); // here we are sure that the book property is set
        })
            .catch(function (error) {
            console.error('Error while updating an existing book collection: ', error);
            _this._view.displayErrorMessage("Failed to update the existing book collection call {existingCollection.name}");
        });
        // In this second part of the method, we have added our new book to the existing collection and then asked the service to persist the updated collection.
        // Again, in the event of an error, the view is asked to display an error message.
    };
    MediaManControllerImpl.prototype.removeBook = function (collectionIdentifier, bookIdentifier) {
        var _this = this;
        if (!collectionIdentifier) {
            throw new Error('The collection identifier is required to remove a book!');
        }
        if (!bookIdentifier) {
            throw new Error('The book identifier is required to remove a book');
        }
        console.log("Removing book " + bookIdentifier + " which should be part of collection " + collectionIdentifier);
        var existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection) {
            throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
        }
        existingCollection.removeMedia(bookIdentifier);
        bookService
            .saveMediaCollection(existingCollection)
            .then(function () {
            console.log("Book collection called \"" + existingCollection.name + "\" updated successfully.");
            _this._view.removeBook(collectionIdentifier, bookIdentifier);
        })
            .catch(function (error) {
            console.error('Error while updating an existing book collection: ', error);
            _this._view.displayErrorMessage("Failed to save the modifications made to the " + existingCollection.name + " book collection (removal of the following book: " + bookIdentifier);
        });
        // Here, we have removed the book (by its identifier) from the collection and have again asked the service to persist the updated collection.
    };
    return MediaManControllerImpl;
}());
// ******************* Initializing the application **********************
// First, create an instance of the view:
var view = new HTMLMediaManView();
// Then instantiate the services:
var bookService = new MediaServiceImpl(Book);
console.log('Book service initialized: ', bookService);
var movieService = new MediaServiceImpl(Movie);
console.log('Movie service initialized: ', movieService);
// Now we can finally instantiate our controller and provided it with the view and service instances:
var mediaManController = new MediaManControllerImpl(view, bookService, movieService);
var customWindow = window;
customWindow.mediaManController = mediaManController; // assigns const mediaManController, which is a new MediaManControllerImpl that has a view, bookService, and movieService passed as arguments
console.log('MediaMan ready!', customWindow.mediaManController);
// Take note of how we have added the global variable. Since Window is a type included in the standard TypeScript library, you cannot change it easily. This is why we're creating a CustomWindow interface, extending from the one provided by TypeScript. In this way, we can properly declare our property. Once done, we assign the window object to a constant using our CustomWindow type, which allows us to bind the mediaManController property to it.
// At this point, you should have a fully functional web application! Go ahead and create some collections/books, then hit the refresh button, and see that your data was not lost thanks to IndexedDB!
// Finally, we presented the SERVICE LAYER DESIGN pattern and leveraged it to better separate concerns in our application.
//# sourceMappingURL=mediaman-with-notes.js.map