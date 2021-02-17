import { MediaManView } from '../view/HTMLMediaManView';
import { MediaService } from '../api/MediaServiceImpl';
import { Book } from '../media/book/Book';
import { Movie } from '../media/movie/Movie';
import { MediaCollection } from '../model/MediaCollection';

export interface MediaManController {
    createBookCollection(): void;
    reloadBookCollections(): void;
    removeBookCollection(identifier: string): void;
    createBook(collectionIdentifier: string): void;
    removeBook(collectionIdentifier: string, bookIdentifier: string): void;
}

export class MediaManControllerImpl implements MediaManController {
    private readonly _view: MediaManView; // VIEW
    private readonly _bookService: MediaService<Book>; // API
    private readonly _movieService: MediaService<Movie>;// API

     // MODEL DATABASE AS A MAP
    private _bookCollections: Map<string, MediaCollection<Book>> = new Map<string, MediaCollection<Book>>();
    // MODEL DATABASE AS A MAP
    private _movieCollections: Map<string, MediaCollection<Movie>> = new Map<string, MediaCollection<Movie>>();

    constructor(view: MediaManView, bookService: MediaService<Book>, movieService: MediaService<Movie>) {

        if (!view) {
        throw new Error("The view is mandatory!");
        }
        if (!bookService) {
            throw new Error("The book service is mandatory!");
        }
        if (!movieService) {
            throw new Error("The movie service is mandatory!");
        }

        // MEDIA MAN VIEW
        this._view = view;
        // MEDIA SERVICE API FOR BOOKS COLLECTION
        this._bookService = bookService;
        // MEDIA SERVICE API FOR MOVIE COLLECTION
        this._movieService = movieService;
        // reload saved data when the application starts // CONTROLLER

        this.reloadBookCollections();

    }

    reloadBookCollections(): void { // CONTROLLER
            // API KEYS ARRAY RETRIEVAL FROM _store.keys()- MEDIA SERVICE INTERFACE
            this._bookService.getMediaCollectionIdentifiersList()
            .then(keys => {
            // clear the current state - CLEAR MODEL - MAP MEDIA COLLECTIONS<BOOK>
            this._bookCollections.clear(); // Commented out for now because it doesn't seem to do anything

            // remove the DOM nodes - CLEAR DOM VIEW - MEDIA MAN VIEW INTERFACE
            this._view.clearBookCollections(); // Commented out for now because it doesn't seem to do anything
            keys.forEach(key => {
                // _bookService = type MediaService<Book> API
                // loadMediaCollection() goes into database to get collection using key
                this._bookService.loadMediaCollection(key)
                .then(collection => {
                // SET MAP MODEL
                this._bookCollections.set(key, collection);
                // SET DOM VIEW
                this._view.renderBookCollection(collection);
                });
            });
            console.log(keys);
        });
    }

    createBookCollection(): void {
        const newBookCollectionName: string = this._view.getNewBookCollectionName();

        console.log("Creating a new book collection: ", newBookCollectionName);

        const newBookCollection: MediaCollection<Book> = new MediaCollection<Book>(Book, newBookCollectionName);
        this._bookCollections.set(newBookCollection.identifier, newBookCollection);

        this._bookService.saveMediaCollection(newBookCollection).then(() => {
            console.log(`New book collection called "${newBookCollection.name}" saved successfully. Identifier: `, newBookCollection.identifier);
            this._view.clearNewBookCollectionForm();
            this._view.renderBookCollection(newBookCollection);
        }).catch(_ => {
            this._view.displayErrorMessage(`Failed to save the new book collection called ${newBookCollectionName}`);
        });
    }

    removeBookCollection(identifier: string): void {
        if (!identifier) {
            throw new Error("An identifier must be provided");
        }

        this._bookCollections.delete(identifier);
        this._view.removeBookCollection(identifier);
        this._bookService.removeMediaCollection(identifier).then(() => {
            console.log("Removed the collection with identifier: ", identifier);
        }).catch(_ => {
            this._view.displayErrorMessage("Failed to remove the collection!");
        });
    }

    createBook(collectionIdentifier: string): void {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier is required to create a new book!");
        }

        console.log("Retrieving the details about the new book to create...");

        const bookDetailsResult = this._view.getNewBookDetails(collectionIdentifier);

        if (bookDetailsResult.error) {
            console.error("Failed to retrieve the book details: ", bookDetailsResult.error);
            return;
        }

        if (!this._bookCollections.has(collectionIdentifier) || !this._bookCollections.get(collectionIdentifier)) {
            console.error("Tried to add a book to an unknown collection. Identifier: ", collectionIdentifier);
            this._view.displayErrorMessage("Failed to create the new book!");
            return;
        }

        const existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection || !bookDetailsResult.book) {
            throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
        }

        const newBook: Readonly<Book> = bookDetailsResult.book;

        existingCollection.addMedia(newBook);

        this._bookService.saveMediaCollection(existingCollection)
            .then(() => {
                console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
                this._view.clearNewBookForm(collectionIdentifier);
                this._view.renderBook(existingCollection.identifier, newBook); // here we are sure that the book property is set
            })
            .catch(error => {
                console.error("Error while updating an existing book collection: ", error);
                this._view.displayErrorMessage(`Failed to update the existing book collection called ${existingCollection.name}`);
            });
    }

    removeBook(collectionIdentifier: string, bookIdentifier: string): void {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier is required to remove a book!");
        }

        if(!bookIdentifier) {
            throw new Error("The book identifier is required to remove a book");
        }

        console.log(`Removing book ${bookIdentifier} which should be part of collection ${collectionIdentifier}`);

        const existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection) {
            throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
        }

        existingCollection.removeMedia(bookIdentifier);
        this._bookService.saveMediaCollection(existingCollection)
            .then(() => {
                console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
                this._view.removeBook(collectionIdentifier, bookIdentifier);
            })
            .catch(error => {
                console.error("Error while updating an existing book collection: ", error);
                this._view.displayErrorMessage(`Failed to save the modifications made to the ${existingCollection.name} book collection (removal of the following book: ${bookIdentifier}`);
            });
    }
}
