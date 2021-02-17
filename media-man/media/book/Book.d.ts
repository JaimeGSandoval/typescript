import { Media, Genre } from '../abstract-media/Media';
export declare class Book extends Media {
    private _author;
    private _numberOfPages;
    constructor(name: string, description: string, pictureLocation: string, genre: Genre, author: string, numberOfPages: number, identifier?: string);
    author: string;
    numberOfPages: number;
}
