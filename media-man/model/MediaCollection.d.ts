import { Media } from '../media/abstract-media/Media';
export declare class MediaCollection<T extends Media> {
    private _identifier;
    private _name;
    private _collection;
    private readonly _type;
    constructor(type: Function, name?: string, identifier?: string);
    identifier: string;
    name: string;
    collection: ReadonlyArray<T>;
    addMedia(media: Readonly<T>): void;
    removeMedia(itemId: string): void;
}
