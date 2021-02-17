import { MediaCollection } from '../model/MediaCollection';
import { Book } from '../media/book/Book';
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
}
export declare class HTMLMediaManView implements MediaManView {
    private readonly _newBookCollectionForm;
    private readonly _newBookCollectionName;
    private readonly _bookCollectionsContainer;
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
}
