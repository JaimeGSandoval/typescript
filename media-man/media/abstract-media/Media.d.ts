export declare enum Genre {
    Horror = "Horror",
    Fantastic = "Fantastic",
    Thriller = "Thriller",
    Romance = "Romance",
    Fiction = "Fiction",
    ScienceFiction = "Science Fiction"
}
export declare abstract class Media {
    private _name;
    private _description;
    private _pictureLocation;
    private _genre;
    private _identifier;
    protected constructor(_name: string, _description: string, _pictureLocation: string, _genre: Genre, identifier?: string);
    identifier: string;
    name: string;
    description: string;
    pictureLocation: string;
    genre: Genre;
}
