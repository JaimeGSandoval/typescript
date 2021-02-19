import { MediaCollection } from '../model/MediaCollection';
import { Book } from '../media/book/Book';
import { Movie } from '../media/movie/Movie';
export interface MediaManView {
    getNewBookCollectionName(): string;
    renderBookCollection(bookCollection: Readonly<MediaCollection<Book>>): void;
    displayErrorMessage(message: string): void;
    clearBookCollections(): void;
    removeBookCollection(identifier: string): void;
    getNewBookDetails(collectionIdentifier: string): {
        error?: string;
        book?: Readonly<Book>;
    };
    renderBook(collectionIdentifier: string, book: Readonly<Book>): void;
    removeBook(collectionIdentifier: string, bookIdentifier: string): void;
    clearNewBookForm(collectionIdentifier: string): void;
    clearNewBookCollectionForm(): void;
    getNewMovieCollectionName(): string;
    renderMovieCollection(movieCollection: Readonly<MediaCollection<Movie>>): void;
    clearMovieCollections(): void;
    removeMovieCollection(identifier: string): void;
    getNewMovieDetails(collectionIdentifier: string): {
        error?: string;
        movie?: Readonly<Movie>;
    };
    renderMovie(collectionIdentifier: string, movie: Readonly<Movie>): void;
    removeMovie(collectionIdentifier: string, movieIdentifier: string): void;
    clearNewMovieForm(collectionIdentifier: string): void;
    clearNewMovieCollectionForm(): void;
}
export declare class HTMLMediaManView implements MediaManView {
    private readonly _newBookCollectionForm;
    private readonly _newBookCollectionName;
    private readonly _bookCollectionsContainer;
    private readonly _newMovieCollectionForm;
    private readonly _newMovieCollectionName;
    private readonly _movieCollectionsContainer;
    private readonly _genreOptions;
    constructor();
    getNewBookCollectionName(): string;
    renderBook(collectionIdentifier: string, book: Readonly<Book>): void;
    renderBookCollection(bookCollection: Readonly<MediaCollection<Book>>): void;
    clearBookCollections(): void;
    removeBookCollection(identifier: string): void;
    displayErrorMessage(errorMessage: string): void;
    getNewBookDetails(collectionIdentifier: string): {
        error?: string;
        book?: Book;
    };
    removeBook(collectionIdentifier: string, bookIdentifier: string): void;
    clearNewBookForm(collectionIdentifier: string): void;
    clearNewBookCollectionForm(): void;
    renderMovieCollection(movieCollection: Readonly<MediaCollection<Movie>>): void;
    getNewMovieCollectionName(): string;
    renderMovie(collectionIdentifier: string, movie: Readonly<Movie>): void;
    clearMovieCollections(): void;
    removeMovieCollection(identifier: string): void;
    getNewMovieDetails(collectionIdentifier: string): {
        error?: string;
        movie?: Movie;
    };
    removeMovie(collectionIdentifier: string, movieIdentifier: string): void;
    clearNewMovieForm(collectionIdentifier: string): void;
    clearNewMovieCollectionForm(): void;
}
