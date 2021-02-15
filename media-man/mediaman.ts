import localForage from "localforage";
import "reflect-metadata";
import {classToPlain, plainToClassFromExist, Expose, Type} from "class-transformer";

console.log("MediaMan - Loading...");

console.log("MediaMan loaded");

// We haven't marked properties as readonly for simplicity in terms of serialization/deserialization; readonly properties would have made the code more complex. For the same reason, we have also added setters for the different properties in all classes.



enum Genre {
  Horror = "Horror",
  Fantastic = "Fantastic",
  Thriller = "Thriller",
  Romance = "Romance",
  Fiction = "Fiction"
}

// The _identifier member will be used to acquire a somewhat unique technical key for each media instance. Note that you should use Universally Unique Identifiers (UUIDs) for this purpose in real applications instead, as the preceding approach is unsafe

abstract class Media {
    private _identifier: string;

    protected constructor(
        private _name: string,
        private _description: string,
        private _pictureLocation: string,
        private _genre: Genre,
        identifier?: string,
    ) {
        if (identifier) {
            this._identifier = identifier;
        } else {
            // this is just for the example; for any real project, use
            // UUIDs instead: https://www.npmjs.com/package/uuid
            this._identifier = Math.random().toString(36).
             substr(2,9);
        }
    }

    @Expose()
    get identifier(): string {
        return this._identifier;
    }

    set identifier(identifier: string) {
        this._identifier = identifier;
    }

    @Expose()
    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    @Expose()
    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    @Expose()
    get pictureLocation(): string {
        return this._pictureLocation;
    }

    set pictureLocation(pictureLocation: string) {
        this._pictureLocation = pictureLocation;
    }

    @Expose()
    get genre(): Genre {
        return this._genre;
    }

    set genre(genre: Genre) {
        this._genre = genre;
    }
}


class Book extends Media {
    private _author: string;
    private _numberOfPages: number;

    constructor(
        name: string,
        description: string,
        pictureLocation: string,
        genre: Genre,
        author: string,
        numberOfPages: number,
        identifier?: string
    ) {
        super(name, description, pictureLocation, genre, identifier);
        this._numberOfPages = numberOfPages;
        this._author = author;
    }

    @Expose()
    get author(): string {
        return this._author;
    }

    set author(author: string) {
        this._author = author;
    }

    @Expose()
    @Type(() => Number)
    get numberOfPages(): number {
        return this._numberOfPages;
    }

    set numberOfPages(numberOfPages: number) {
        this._numberOfPages = numberOfPages;
    }
}


class Movie extends Media {
    private _duration: string;
    private _director: string;

    constructor(
        name: string,
        description: string,
        pictureLocation: string,
        genre: Genre,
        duration: string,
        director: string,
        identifier?: string
    ) {
        super(name, description, pictureLocation, genre, identifier);
        this._duration = duration;
        this._director = director;
    }

    @Expose()
    get director(): string {
        return this._director;
    }

    set director(director: string) {
        this._director = director;
    }

    @Expose()
    get duration(): string {
        return this._duration;
    }

    set duration(duration: string) {
        this._duration = duration;
    }
}


class MediaCollection<T extends Media> {
    private _identifier: string;
    private _name: string = "";
    private _collection: ReadonlyArray<T> = [];
    private readonly _type: Function;

    constructor(
        type: Function,
        name?: string,
        identifier?: string
    ) {
        this._type = type;

        if(name) {
            this._name = name;
        }

        if (identifier) {
            this._identifier = identifier;
        } else {
            // this is just for the example; for any real project, use
            // UUIDs instead: https://www.npmjs.com/package/uuid
            this._identifier = Math.random().toString(36).
             substr(2, 9);
        }
    }

    @Expose()
    get identifier(): string {
        return this._identifier;
    }

    set identifier(identifier: string) {
        this._identifier = identifier;
    }

    @Expose()
    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    @Expose()
    @Type(options => {
        if(options) {
            return (options.newObject as
            MediaCollection<T>)._type;
        } else {
            throw new Error("Cannot not determine the type because the options object is null or undefined");
        }
    })

    get collection(): ReadonlyArray<T> {
        return this._collection;
    }

    set collection(collection: ReadonlyArray<T>) {
        this._collection = collection;
    }

    addMedia(media: Readonly<T>): void {
        if (media) {
            this._collection = this._collection.concat(media);
        }
    }

    removeMedia(itemId: string) {
        if (itemId) {
            this._collection = this._collection.filter(item => {
                return item.identifier !== itemId;
            });
        }
    }



}

// The @Expose() decorators instruct class-transformer to serialize the corresponding properties when converting an object to JSON. In the preceding example, class-transformer will thus serialize the identifier, the name, and the collection properties for us.

// The @Type(...​) decorator is required in order to help class-transformer know how to serialize the collection. Without it, class-transformer will just convert array entries into raw objects instead of instances of the generic type (that is, Book or Movie, in our case).

// With this done, class-transformer knows everything it needs: it will expose all of our properties properly.
// The last thing that we need to take care of is actually serializing information. To do so, we need to use the classToPlain(...​) function provided by class-transformer. This function takes two arguments:

// The object to serialize (ideally containing the class-transformer decorators).
// An options object: through this object, it is possible to alter the serialization process.
// The following is an example:

// const serializedVersion = classToPlain(someObject, { excludePrefixes: ["_"] });

// This example highlights how easy it is to serialize class instances using this library!

// Doing the opposite transformation (from JSON back to class instances) is also doable now that we've annotated our domain model. Because we are using generics, we will need to use the plainToClassFromExist(...​) function, which will populate an existing object with the provided data.

// The following is an example:

// const instance = plainToClassFromExist<Something, any>(new Something(), value);

// This line of code requires a few explanations:

// With plainToClassFromExist<Something, any>, we pass the type to convert to as a generic type argument to the function; thanks to this, we don't need to use an explicit type cast (that is, as ...​).
// The first argument of the function is an instance that we create and that class-transformer will populate for us.
// The last argument is the value to convert (that is, the raw JavaScript object).


interface MediaService<T extends Media> {
    loadMediaCollection(identifier: string): Promise<MediaCollection<T>>;
    saveMediaCollection(collection: Readonly<MediaCollection<T>>): Promise<void>;
    getMediaCollectionIdentifiersList(): Promise<string[]>;
    removeMediaCollection(identifier: string): Promise<void>;
}

// We have added the Impl suffix to the class name to indicate that this is an implementation of an interface. This is a common naming convention. Opt for this approach instead of prefixing interfaces with an I character.

// The first thing that we need to do is configure localForage properly. In order to keep things simple, we will create a separate instance of the MediaServiceImpl class for each media type that we will manage. We could actually make our code smarter and even more generic, but it would hinder readability. For this reason, we will use a specific object store for each type of media. Let's see how!

class MediaServiceImpl<T extends Media> implements MediaService<T> {
// Notice how we have made our service implementation generic by requiring a type argument extending from our Media abstract class and how this T generic type is also used on the right side of the implements keyword.

    private readonly _store: LocalForage;



    constructor(private _type: Function) {
        console.log(`Initializing media service for ${_type.name}`);

    // each instance of the media service has its own data store:
    //https://github.com/localForage/localForage
    // the initialization options are described here:
    // https://localforage.github.io/localForage/#settings-api-config

    // First of all, we have declared a _store field. This is what our service will use to load/persist data using localForage. The _store field gets initialized in the constructor, where we used the createInstance function, allowing us to create a dedicated store instance.
    // Notice the -<name> suffix that we have added to the storeName property with -${_type.name}. This suffix will help us to differentiate between collections of media (for example, between collections of Book objects, collections of Movie objects, and so on​). The _type.name property will give us the name of the type that this specific service instance will take care of (for example, Book).
        this._store = localForage.createInstance({
            name: 'mediaMan',
            version: 1.0,
            storeName: `media-man-${_type.name}`, // we add the type name to the object store name!
            description: 'MediaMan data store'
        });
    }

    // Next, we will implement the saveMediaCollection method. This method needs to invoke localForage to serialize and persist the given MediaCollection object. As this operation will be asynchronous, our method will have to return a Promise

    saveMediaCollection(collection: Readonly<MediaCollection<T>>): Promise<void> {
    // By marking the saveMediaCollection argument as read-only, we make sure that we don't modify the object by mistake.

    return new Promise<void>((resolve, reject) => {
        if (!collection) {
            reject(new Error("The list cannot be null or undefined!"));
        }

        console.log(`Saving media collection with the following name ${collection.name}`);

        const serializedVersion = classToPlain(collection, {excludePrefixes: ["_"]});
        console.log("Serialized version: ", serializedVersion);

        this._store.setItem(collection.identifier, serializedVersion)
            .then(value => {
                console.log(`Saved the ${collection.name} collection successfully! Saved value: `, value);
                resolve();
            })
            .catch(err => {
                console.error(`Failed to save the ${collection.name} collection with identifier ${collection.identifier}. Error: ${err}`);
                reject(err);
            });
        });

    // 1. Our method accepts MediaCollection<T> as input and returns Promise<void>, which simply indicates that there won't be a value coming out of the promise upon resolution (that is, it will just be a signal).

    // 2. We immediately return a new Promise object.

    // 3. The first thing we do in the promise definition is to check whether the expected argument was provided. If not, we use the reject callback to directly return an error.

    // 4. We use classToPlain to serialize the MediaCollection object:

    // Note that we use the excludePrefixes option in order to exclude all properties whose name starts with an underscore in order to avoid exposing our private properties directly (for example, _name in the Media class).

    // 5. We invoke the setItem function on our store (that is, localForage) to persist the serialized version of the MediaCollection object, using the collection's identifier as a key.

    // 6. Since the setItem function returns a promise, we use .then to define what to do when it resolves:
    // In this case, we simply call resolve() on the promise that we have returned at the beginning.

    // 7. We also use .catch to catch and pass any errors through using the reject(...​) function on our promise.
    }

    loadMediaCollection(identifier: string): Promise<MediaCollection<T>> {
        console.log(`Trying to load media collection with the following
        identifier: ${identifier}`);
        return new Promise<MediaCollection<T>>((resolve, reject) => {
            this._store.getItem(identifier)
                .then(value => {
                    console.log("Found the collection: ", value);

                    const retrievedCollection =
                    plainToClassFromExist<MediaCollection<T>,
                    any>(new MediaCollection<T>(this._type), value);

                    console.log("Retrieved collection: ",
                    retrievedCollection);
                    resolve(retrievedCollection);
                })
                .catch(err => {
                    reject(err); // let the error through
                });
        });
    }

    // The following are some explanations of the preceding code:
    // This time, the method accepts a string identifier as input and returns Promise<MediaCollection<T>>, which means that we promise to try and deliver an instance of the MediaCollection subsequently.
    // We use the getItem function of the store, which returns Promise.
    // In the then callback function, we use the plainToClassFromExist function that we mentioned earlier to deserialize the value into an instance of our MediaCollection class:
    // Note that we pass this._type as an argument to the constructor, which will then allow class-transformer to get access to the type through the @Type decorator that we defined earlier.
    // Finally, we use the resolve(...​) function to return the object.


    getMediaCollectionIdentifiersList(): Promise<string[]> {
    // This method will simply return an array containing all the keys in the store. This will come in handy later when we work on the UI, in order to allow us to load the existing collections.
        return new Promise<string[]>((resolve, reject) => {
            console.log("Retrieving the list of media collection identifiers");
            this._store.keys().then(keys => {
                console.log(`Retrieved the of media collection
                identifiers:
                ${keys}`);
                resolve(keys);
            })
            .catch(err => {
                console.error(`Failed to retrieve the list of media
                collection identifiers. Error: ${err}`);
                reject(err);
            })
    });

    // This is, of course, very similar to what we've just done in the preceding section. The main difference the following is that we use the keys() method, which returns the list of keys, as described in the localForage documentation: https://localforage.github.io/localForage/#data-api-keys.
   }

   removeMediaCollection(identifier: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
    if (!identifier || '' === identifier.trim()) {
        reject(new Error("The identifier must be provided!"));
    }
    console.log(`Removing media collection with the following
    identifier ${identifier}`);

    this._store.removeItem(identifier)
        .then(() => {
            console.log(`Removed the ${identifier} collection
            successfully!`);
            resolve();
        })
        .catch(err => {
            console.error(`Failed to removed the ${identifier}
            collection`);
            reject(err);
        });
    });
  }
}
