import { MediaManView } from '../view/HTMLMediaManView';
import { MediaService } from '../api/MediaServiceImpl';
import { Book } from '../media/book/Book';
import { Movie } from '../media/movie/Movie';
export interface MediaManController {
    createBookCollection(): void;
    reloadBookCollections(): void;
    removeBookCollection(identifier: string): void;
    createBook(collectionIdentifier: string): void;
    removeBook(collectionIdentifier: string, bookIdentifier: string): void;
}
export declare class MediaManControllerImpl implements MediaManController {
    private readonly _view;
    private readonly _bookService;
    private readonly _movieService;
    private _bookCollections;
    private _movieCollections;
    constructor(view: MediaManView, bookService: MediaService<Book>, movieService: MediaService<Movie>);
    reloadBookCollections(): void;
    createBookCollection(): void;
    removeBookCollection(identifier: string): void;
    createBook(collectionIdentifier: string): void;
    removeBook(collectionIdentifier: string, bookIdentifier: string): void;
}
