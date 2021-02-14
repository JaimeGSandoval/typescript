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

    get identifier(): string {
        return this._identifier;
    }

    set identifier(identifier: string) {
        this._identifier = identifier;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get pictureLocation(): string {
        return this._pictureLocation;
    }

    set pictureLocation(pictureLocation: string) {
        this._pictureLocation = pictureLocation;
    }

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

    get author(): string {
        return this._author;
    }

    set author(author: string) {
        this._author = author;
    }

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

    get director(): string {
        return this._director;
    }

    set director(director: string) {
        this._director = director;
    }

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

    get identifier(): string {
        return this._identifier;
    }

    set identifier(identifier: string) {
        this._identifier = identifier;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

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
