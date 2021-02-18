import { Book } from '../media/book/Book';
import { MediaCollection } from '../model/MediaCollection';
var MediaManControllerImpl = /** @class */ (function () {
    function MediaManControllerImpl(view, bookService, movieService) {
        // MODEL DATABASE AS A MAP
        this._bookCollections = new Map();
        // MODEL DATABASE AS A MAP
        this._movieCollections = new Map();
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
    MediaManControllerImpl.prototype.reloadBookCollections = function () {
        var _this = this;
        // API KEYS ARRAY RETRIEVAL FROM _store.keys()- MEDIA SERVICE INTERFACE
        this._bookService.getMediaCollectionIdentifiersList()
            .then(function (keys) {
            // clear the current state - CLEAR MODEL - MAP MEDIA COLLECTIONS<BOOK>
            _this._bookCollections.clear();
            // remove the DOM nodes - CLEAR DOM VIEW - MEDIA MAN VIEW INTERFACE
            _this._view.clearBookCollections();
            keys.forEach(function (key) {
                // _bookService = type MediaService<Book> API
                // loadMediaCollection() goes into database to get collection using key
                _this._bookService.loadMediaCollection(key)
                    .then(function (collection) {
                    // SET MAP MODEL
                    _this._bookCollections.set(key, collection);
                    // SET DOM VIEW
                    _this._view.renderBookCollection(collection);
                });
            });
            console.log(keys);
        });
    };
    MediaManControllerImpl.prototype.createBookCollection = function () {
        var _this = this;
        var newBookCollectionName = this._view.getNewBookCollectionName();
        console.log("Creating a new book collection: ", newBookCollectionName);
        var newBookCollection = new MediaCollection(Book, newBookCollectionName);
        this._bookCollections.set(newBookCollection.identifier, newBookCollection);
        this._bookService.saveMediaCollection(newBookCollection).then(function () {
            console.log("New book collection called \"" + newBookCollection.name + "\" saved successfully. Identifier: ", newBookCollection.identifier);
            _this._view.clearNewBookCollectionForm();
            _this._view.renderBookCollection(newBookCollection);
        }).catch(function (_) {
            _this._view.displayErrorMessage("Failed to save the new book collection called " + newBookCollectionName);
        });
    };
    MediaManControllerImpl.prototype.removeBookCollection = function (identifier) {
        var _this = this;
        if (!identifier) {
            throw new Error("An identifier must be provided");
        }
        this._bookCollections.delete(identifier);
        this._view.removeBookCollection(identifier);
        this._bookService.removeMediaCollection(identifier).then(function () {
            console.log("Removed the collection with identifier: ", identifier);
        }).catch(function (_) {
            _this._view.displayErrorMessage("Failed to remove the collection!");
        });
    };
    MediaManControllerImpl.prototype.createBook = function (collectionIdentifier) {
        var _this = this;
        if (!collectionIdentifier) {
            throw new Error("The collection identifier is required to create a new book!");
        }
        console.log("Retrieving the details about the new book to create...");
        var bookDetailsResult = this._view.getNewBookDetails(collectionIdentifier);
        if (bookDetailsResult.error) {
            console.error("Failed to retrieve the book details: ", bookDetailsResult.error);
            return;
        }
        if (!this._bookCollections.has(collectionIdentifier) || !this._bookCollections.get(collectionIdentifier)) {
            console.error("Tried to add a book to an unknown collection. Identifier: ", collectionIdentifier);
            this._view.displayErrorMessage("Failed to create the new book!");
            return;
        }
        var existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection || !bookDetailsResult.book) {
            throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
        }
        var newBook = bookDetailsResult.book;
        existingCollection.addMedia(newBook);
        this._bookService.saveMediaCollection(existingCollection)
            .then(function () {
            console.log("Book collection called \"" + existingCollection.name + "\" updated successfully.");
            _this._view.clearNewBookForm(collectionIdentifier);
            _this._view.renderBook(existingCollection.identifier, newBook); // here we are sure that the book property is set
        })
            .catch(function (error) {
            console.error("Error while updating an existing book collection: ", error);
            _this._view.displayErrorMessage("Failed to update the existing book collection called " + existingCollection.name);
        });
    };
    MediaManControllerImpl.prototype.removeBook = function (collectionIdentifier, bookIdentifier) {
        var _this = this;
        if (!collectionIdentifier) {
            throw new Error("The collection identifier is required to remove a book!");
        }
        if (!bookIdentifier) {
            throw new Error("The book identifier is required to remove a book");
        }
        console.log("Removing book " + bookIdentifier + " which should be part of collection " + collectionIdentifier);
        var existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection) {
            throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
        }
        existingCollection.removeMedia(bookIdentifier);
        this._bookService.saveMediaCollection(existingCollection)
            .then(function () {
            console.log("Book collection called \"" + existingCollection.name + "\" updated successfully.");
            _this._view.removeBook(collectionIdentifier, bookIdentifier);
        })
            .catch(function (error) {
            console.error("Error while updating an existing book collection: ", error);
            _this._view.displayErrorMessage("Failed to save the modifications made to the " + existingCollection.name + " book collection (removal of the following book: " + bookIdentifier);
        });
    };
    return MediaManControllerImpl;
}());
export { MediaManControllerImpl };
//# sourceMappingURL=MediaManControllerImpl.js.map