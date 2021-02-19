import { Expose } from 'class-transformer';
import { Media , Genre } from '../abstract-media/Media';


export class Movie extends Media {
    private _duration: number;
    private _director: string;

    constructor(
        name: string,
        description: string,
        pictureLocation: string,
        genre: Genre,
        director: string,
        duration: number,
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
    get duration(): number {
        return this._duration;
    }

    set duration(duration: number) {
        this._duration = duration;
    }
}
