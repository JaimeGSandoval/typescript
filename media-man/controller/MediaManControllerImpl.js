import { Book } from '../media/book/Book';
import { Movie } from '../media/movie/Movie';
import { MediaCollection } from '../model/MediaCollection';
var MediaManControllerImpl = /** @class */ (function () {
    function MediaManControllerImpl(view, bookService, movieService) {
        // MODEL DATABASE AS A MAP
        this._bookCollections = new Map();
        // MODEL DATABASE AS A MAP
        this._movieCollections = new Map();
        console.log('github test');
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
        this.reloadMovieCollections();
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
    // *************************************
    MediaManControllerImpl.prototype.reloadMovieCollections = function () {
        var _this = this;
        // API KEYS ARRAY RETRIEVAL FROM _store.keys()- MEDIA SERVICE INTERFACE
        this._movieService.getMediaCollectionIdentifiersList()
            .then(function (keys) {
            // clear the current state - CLEAR MODEL - MAP MEDIA COLLECTIONS<BOOK>
            _this._movieCollections.clear();
            // remove the DOM nodes - CLEAR DOM VIEW - MEDIA MAN VIEW INTERFACE
            _this._view.clearMovieCollections();
            keys.forEach(function (key) {
                // _movieService = type MediaService<Movie> API
                // loadMediaCollection() goes into database to get collection using key
                _this._movieService.loadMediaCollection(key)
                    .then(function (collection) {
                    // SET MAP MODEL
                    _this._movieCollections.set(key, collection);
                    // SET DOM VIEW
                    _this._view.renderMovieCollection(collection);
                });
            });
            console.log(keys);
        });
    };
    MediaManControllerImpl.prototype.createMovieCollection = function () {
        var _this = this;
        var newMovieCollectionName = this._view.getNewMovieCollectionName();
        console.log("Creating a new book collection: ", newMovieCollectionName);
        var newMovieCollection = new MediaCollection(Movie, newMovieCollectionName);
        this._movieCollections.set(newMovieCollection.identifier, newMovieCollection);
        this._movieService.saveMediaCollection(newMovieCollection).then(function () {
            console.log("New movie collection called \"" + newMovieCollection.name + "\" saved successfully. Identifier: ", newMovieCollection.identifier);
            _this._view.clearNewMovieCollectionForm();
            _this._view.renderMovieCollection(newMovieCollection);
        }).catch(function (_) {
            _this._view.displayErrorMessage("Failed to save the new movie collection called " + newMovieCollectionName);
        });
    };
    MediaManControllerImpl.prototype.removeMovieCollection = function (identifier) {
        var _this = this;
        if (!identifier) {
            throw new Error("An identifier must be provided");
        }
        this._movieCollections.delete(identifier);
        this._view.removeMovieCollection(identifier);
        this._movieService.removeMediaCollection(identifier).then(function () {
            console.log("Removed the collection with identifier: ", identifier);
        }).catch(function (_) {
            _this._view.displayErrorMessage("Failed to remove the collection!");
        });
    };
    MediaManControllerImpl.prototype.createMovie = function (collectionIdentifier) {
        var _this = this;
        if (!collectionIdentifier) {
            throw new Error("The collection identifier is required to create a new movie!");
        }
        console.log("Retrieving the details about the new movie to create...");
        var movieDetailsResult = this._view.getNewMovieDetails(collectionIdentifier);
        if (movieDetailsResult.error) {
            console.error("Failed to retrieve the movie details: ", movieDetailsResult.error);
            return;
        }
        if (!this._movieCollections.has(collectionIdentifier) || !this._movieCollections.get(collectionIdentifier)) {
            console.error("Tried to add a movie to an unknown collection. Identifier: ", collectionIdentifier);
            this._view.displayErrorMessage("Failed to create the new movie!");
            return;
        }
        var existingCollection = this._movieCollections.get(collectionIdentifier);
        if (!existingCollection || !movieDetailsResult.movie) {
            throw new Error("The collection couldn't be retrieved or we could not get the movie details from the view!");
        }
        var newMovie = movieDetailsResult.movie;
        existingCollection.addMedia(newMovie);
        this._movieService.saveMediaCollection(existingCollection)
            .then(function () {
            console.log("Movie collection called \"" + existingCollection.name + "\" updated successfully.");
            _this._view.clearNewMovieForm(collectionIdentifier);
            _this._view.renderMovie(existingCollection.identifier, newMovie); // here we are sure that the book property is set
        })
            .catch(function (error) {
            console.error("Error while updating an existing movie collection: ", error);
            _this._view.displayErrorMessage("Failed to update the existing movie collection called " + existingCollection.name);
        });
    };
    MediaManControllerImpl.prototype.removeMovie = function (collectionIdentifier, movieIdentifier) {
        var _this = this;
        if (!collectionIdentifier) {
            throw new Error("The collection identifier is required to remove a movie!");
        }
        if (!movieIdentifier) {
            throw new Error("The movie identifier is required to remove a movie");
        }
        console.log("Removing movie " + movieIdentifier + " which should be part of collection " + collectionIdentifier);
        var existingCollection = this._movieCollections.get(collectionIdentifier);
        if (!existingCollection) {
            throw new Error("The collection couldn't be retrieved or we could not get the movie details from the view!");
        }
        existingCollection.removeMedia(movieIdentifier);
        this._movieService.saveMediaCollection(existingCollection)
            .then(function () {
            console.log("Book collection called \"" + existingCollection.name + "\" updated successfully.");
            _this._view.removeMovie(collectionIdentifier, movieIdentifier);
        })
            .catch(function (error) {
            console.error("Error while updating an existing book collection: ", error);
            _this._view.displayErrorMessage("Failed to save the modifications made to the " + existingCollection.name + " book collection (removal of the following book: " + movieIdentifier);
        });
    };
    return MediaManControllerImpl;
}());
export { MediaManControllerImpl };
//# sourceMappingURL=MediaManControllerImpl.js.map