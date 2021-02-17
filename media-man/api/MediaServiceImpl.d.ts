import { Media } from '../media/abstract-media/Media';
import { MediaCollection } from '../model/MediaCollection';
export interface MediaService<T extends Media> {
    loadMediaCollection(identifier: string): Promise<MediaCollection<T>>;
    saveMediaCollection(collection: Readonly<MediaCollection<T>>): Promise<void>;
    getMediaCollectionIdentifiersList(): Promise<string[]>;
    removeMediaCollection(identifier: string): Promise<void>;
}
export declare class MediaServiceImpl<T extends Media> implements MediaService<T> {
    private _type;
    private readonly _store;
    constructor(_type: Function);
    loadMediaCollection(identifier: string): Promise<MediaCollection<T>>;
    saveMediaCollection(collection: Readonly<MediaCollection<T>>): Promise<void>;
    getMediaCollectionIdentifiersList(): Promise<string[]>;
    removeMediaCollection(identifier: string): Promise<void>;
}
