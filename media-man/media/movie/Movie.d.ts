import { Media, Genre } from '../abstract-media/Media';
export declare class Movie extends Media {
    private _duration;
    private _director;
    constructor(name: string, description: string, pictureLocation: string, genre: Genre, director: string, duration: number, identifier?: string);
    director: string;
    duration: number;
}
