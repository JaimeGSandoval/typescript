import { Media}  from '../media/abstract-media/Media';
import { MediaCollection } from '../model/MediaCollection';
import {classToPlain, plainToClassFromExist } from "class-transformer";
import localForage from "localforage";

export interface MediaService<T extends Media> {
    loadMediaCollection(identifier: string): Promise<MediaCollection<T>>

    saveMediaCollection(collection: Readonly<MediaCollection<T>>): Promise<void>

    getMediaCollectionIdentifiersList(): Promise<string[]>

    removeMediaCollection(identifier: string): Promise<void>
}

export class MediaServiceImpl<T extends Media> implements MediaService<T> {
    private readonly _store: LocalForage;

    // _type is the constructor of either class Book or Movie
    constructor(private _type: Function) {
        console.log(`Initializing media service for ${_type.name}`);

        // each instance of the media service has its own data store: https://github.com/localForage/localForage
        // the initialization options are described here: https://localforage.github.io/localForage/#settings-api-config
        this._store = localForage.createInstance({
            name: 'mediaMan',
            version: 1.0,
            storeName: `media-man-${_type.name}`, // we add the type name to the object store name!
            description: 'MediaMan data store'
        });
    }

    loadMediaCollection(identifier: string): Promise<MediaCollection<T>> { // identifier is a key to get collection from database
        console.log(`Trying to load media collection with the following identifier: ${identifier}`);
        return new Promise<MediaCollection<T>>((resolve, reject) => {
            this._store.getItem(identifier)
                .then(value => { // value is the collection found by using key/identifier
                    console.log("Found the collection: ", value);
                                                                                                 // _type is either class Book or Movie
                    const retrievedCollection = plainToClassFromExist<MediaCollection<T>, any>(new MediaCollection<T>(this._type), value);

                    console.log("Retrieved collection: ", retrievedCollection);
                    resolve(retrievedCollection);
                })
                .catch(err => {
                    reject(err); // let the error through
                });
        });
    }

    saveMediaCollection(collection: Readonly<MediaCollection<T>>): Promise<void> {
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
    }

    getMediaCollectionIdentifiersList(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            console.log("Retrieving the list of media collection identifiers");
            this._store.keys()
            .then(keys => {
                console.log("Retrieved the of media collection identifiers: ", keys);
                resolve(keys);
            })
            .catch(err => {
                console.error("Failed to retrieve the list of media collection identifiers. Error: ", err);
                reject(err);
            })
        });
    }

    removeMediaCollection(identifier: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!identifier || '' === identifier.trim()) {
                reject(new Error("The identifier must be provided!"));
            }

            console.log(`Removing media collection with the following identifier ${identifier}`);

            this._store.removeItem(identifier)
                .then(() => {
                    console.log(`Removed the ${identifier} collection successfully!`);
                    resolve();
                })
                .catch(err => {
                    console.error(`Failed to removed the ${identifier} collection`);
                    reject(err);
                });
        });
    }
}
