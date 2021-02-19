import { Book } from '../media/book/Book';
import { Movie } from '../media/movie/Movie';
import { Genre } from '../media/abstract-media/Media';
var HTMLMediaManView = /** @class */ (function () {
    function HTMLMediaManView() {
        this._genreOptions = "";
        this._newBookCollectionForm = document.getElementById('newBookCollection');
        this._newBookCollectionName = document.getElementById('newBookCollectionName');
        this._bookCollectionsContainer = document.getElementById("bookCollections");
        this._newMovieCollectionForm = document.getElementById('newMovieCollection');
        this._newMovieCollectionName = document.getElementById('newMovieCollectionName');
        this._movieCollectionsContainer = document.getElementById('movieCollections');
        if (!this._newBookCollectionForm) {
            throw new Error("Could not initialize the view. The 'newBookCollection' element id was not found. Was the template changed?");
        }
        if (!this._newBookCollectionName) {
            throw new Error("Could not initialize the view. The 'newBookCollectionName' element id was not found. Was the template changed?");
        }
        if (!this._bookCollectionsContainer) {
            throw new Error("Could not initialize the view. The 'bookCollections' element id was not found. Was the template changed?");
        }
        if (!this._newMovieCollectionForm) {
            throw new Error("Could not initialize the view. The 'newMovieCollection' element id was not found. Was the template changed?");
        }
        if (!this._newMovieCollectionName) {
            throw new Error("Could not initialize the view. The 'newMovieCollectionName' element id was not found. Was the template changed?");
        }
        if (!this._movieCollectionsContainer) {
            throw new Error("Could not initialize the view. The 'movieCollections' element id was not found. Was the template changed?");
        }
        for (var genreKey in Genre) {
            this._genreOptions += "<option value=\"" + genreKey + "\">" + Genre[genreKey] + "</option>\">";
        }
    }
    HTMLMediaManView.prototype.getNewBookCollectionName = function () {
        // build upon standard HTML DOM validation
        if (this._newBookCollectionName.checkValidity() === false) {
            this._newBookCollectionName.reportValidity();
            throw new Error("Invalid collection name!");
        }
        return this._newBookCollectionName.value;
    };
    HTMLMediaManView.prototype.renderBook = function (collectionIdentifier, book) {
        if (!book) {
            throw new Error("The book to render must be provided!");
        }
        var collectionTableBody = document.getElementById("collectionTableBody-" + collectionIdentifier);
        if (!collectionTableBody) {
            throw new Error("The table body for collection " + collectionIdentifier + " could not be found! Was the template changed?");
        }
        var tableRow = collectionTableBody.insertRow();
        tableRow.id = "book-" + collectionIdentifier + "-" + book.identifier;
        tableRow.innerHTML = "\n                <td>\n                    <img class=\"mediaImage\" src=\"" + book.pictureLocation + "\">\n                </td>\n                <td>" + book.name + "</td>\n                <td>" + book.genre + "</td>\n                <td>" + book.description + "</td>\n                <td>" + book.author + "</td>\n                <td>" + book.numberOfPages + "</td>\n                <td>\n                    <a href=\"#\" onclick=\"mediaManController.removeBook('" + collectionIdentifier + "','" + book.identifier + "');\">X</a>\n                </td>\n        ";
        collectionTableBody.appendChild(tableRow);
    };
    HTMLMediaManView.prototype.renderBookCollection = function (bookCollection) {
        var _this = this;
        this._bookCollectionsContainer.innerHTML += "\n        <div id=\"bookCollection-" + bookCollection.identifier + "\" class=\"collection\">\n            <h3 class=\"collectionName\">" + bookCollection.name + "</h3>\n            <div class=\"containerGroup\">\n                <div class=\"container\">\n                    <h3>New book</h3>\n                    <form id=\"newBook-" + bookCollection.identifier + "\" action=\"#\">\n                        <ul>\n                            <li>\n                                <input id=\"newBookName-" + bookCollection.identifier + "\" type=\"text\" title=\"Name\" placeholder=\"Name\" required>\n                                <input id=\"newBookAuthor-" + bookCollection.identifier + "\" type=\"text\" placeholder=\"Author\" required>\n                            </li>\n                            <li>\n                                <select id=\"newBookGenre-" + bookCollection.identifier + "\" required>\n                                    " + this._genreOptions + "\n                                </select>\n                                <input id=\"newBookPages-" + bookCollection.identifier + "\" type=\"number\" placeholder=\"Pages\" required>\n                            </li>\n                            <li>\n                                <input id=\"newBookPicture-" + bookCollection.identifier + "\" type=\"url\" title=\"Picture\" placeholder=\"Picture URL\">\n                            </li>\n                            <li>\n                                <textarea id=\"newBookDescription-" + bookCollection.identifier + "\" placeholder=\"Description\"></textarea>\n                            </li>\n                        </ul>\n                        <input type=\"button\" value=\"Create\" onclick=\"mediaManController.createBook('" + bookCollection.identifier + "');\" />\n                    </form>\n                </div>\n                <div class=\"collectionToolsContainer\">\n                    <h3>Tools</h3>\n                    <form action=\"#\">\n                        <input type=\"button\" value=\"Remove collection\" onclick=\"mediaManController.removeBookCollection('" + bookCollection.identifier + "');\" />\n                    </form>\n                </div>\n            </div>\n            <div class=\"containerGroup\">\n                <div class=\"container\">\n                    <table class=\"collectionTable\">\n                        <thead>\n                        <tr>\n                            <td>Picture</td>\n                            <td>Name</td>\n                            <td>Genre</td>\n                            <td>Description</td>\n                            <td>Author</td>\n                            <td>Pages</td>\n                            <td>Remove</td>\n                        </tr>\n                        </thead>\n                        <tbody id=\"collectionTableBody-" + bookCollection.identifier + "\"></tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n        ";
        bookCollection.collection.forEach(function (book) {
            _this.renderBook(bookCollection.identifier, book);
        });
    };
    HTMLMediaManView.prototype.clearBookCollections = function () {
        this._bookCollectionsContainer.innerHTML = "";
    };
    HTMLMediaManView.prototype.removeBookCollection = function (identifier) {
        var bookCollectionDOMNode = document.getElementById("bookCollection-" + identifier);
        if (!bookCollectionDOMNode) {
            throw new Error("Could not remove the book collection from the DOM. Couldn't find the DOM node");
        }
        else {
            bookCollectionDOMNode.remove();
        }
    };
    HTMLMediaManView.prototype.displayErrorMessage = function (errorMessage) {
        if (!errorMessage) {
            throw new Error("An error message must be provided!");
        }
        alert(errorMessage); // bad user experience but ignore this for now
    };
    HTMLMediaManView.prototype.getNewBookDetails = function (collectionIdentifier) {
        if (!collectionIdentifier) {
            // we throw this one because it means that there is a bug!
            throw new Error("The collection identifier must be provided!");
        }
        // required
        var newBookForm = document.getElementById("newBook-" + collectionIdentifier);
        if (!newBookForm) {
            throw new Error("Could not find the new book form for collection " + collectionIdentifier);
        }
        // build upon standard HTML DOM validation
        if (newBookForm.checkValidity() === false) {
            newBookForm.reportValidity();
            return {
                error: "The new book form is invalid!"
            };
        }
        // from here on out, no need to check the validity of the specific form fields
        // we just need to check if the fields can be found
        var newBookNameField = document.getElementById("newBookName-" + collectionIdentifier);
        if (!newBookNameField) {
            throw new Error("The new book form's name input was not found! Did the template change?");
        }
        var newBookAuthorField = document.getElementById("newBookAuthor-" + collectionIdentifier);
        if (!newBookAuthorField) {
            throw new Error("The new book form's author input was not found! Did the template change?");
        }
        var newBookGenreSelect = document.getElementById("newBookGenre-" + collectionIdentifier);
        if (!newBookGenreSelect) {
            throw new Error("The new book form's genre select was not found! Did the template change?");
        }
        var newBookPagesField = document.getElementById("newBookPages-" + collectionIdentifier);
        if (!newBookPagesField) {
            throw new Error("The new book form's page input was not found! Did the template change?");
        }
        // optional
        var newBookPictureField = document.getElementById("newBookPicture-" + collectionIdentifier);
        if (!newBookPictureField) {
            throw new Error("The new book form's picture input was not found! Did the template change?");
        }
        var newBookDescriptionField = document.getElementById("newBookDescription-" + collectionIdentifier);
        if (!newBookDescriptionField) {
            throw new Error("The new book form's description input was not found! Did the template change?");
        }
        var newBookGenre = Genre[newBookGenreSelect.value];
        var newBookNumberOfPages = Number.parseInt(newBookPagesField.value);
        return {
            book: new Book(newBookNameField.value, newBookDescriptionField.value, newBookPictureField.value, newBookGenre, newBookAuthorField.value, newBookNumberOfPages)
        };
    };
    HTMLMediaManView.prototype.removeBook = function (collectionIdentifier, bookIdentifier) {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }
        if (!bookIdentifier) {
            throw new Error("The book identifier must be provided!");
        }
        var bookElement = document.getElementById("book-" + collectionIdentifier + "-" + bookIdentifier);
        if (!bookElement) {
            throw new Error("The element corresponding to the book to remove could not be found! Did the template change?");
        }
        bookElement.remove();
    };
    HTMLMediaManView.prototype.clearNewBookForm = function (collectionIdentifier) {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }
        var newBookForm = document.getElementById("newBook-" + collectionIdentifier);
        if (!newBookForm) {
            throw new Error("Could not find the new book form for collection " + collectionIdentifier);
        }
        newBookForm.reset();
    };
    HTMLMediaManView.prototype.clearNewBookCollectionForm = function () {
        this._newBookCollectionForm.reset();
    };
    // *****************************
    HTMLMediaManView.prototype.renderMovieCollection = function (movieCollection) {
        var _this = this;
        this._movieCollectionsContainer.innerHTML += "\n        <div id=\"movieCollection-" + movieCollection.identifier + "\" class=\"collection\">\n            <h3 class=\"collectionName\">" + movieCollection.name + "</h3>\n            <div class=\"containerGroup\">\n                <div class=\"container\">\n                    <h3>New movie</h3>\n                    <form id=\"newMovie-" + movieCollection.identifier + "\" action=\"#\">\n                        <ul>\n                            <li>\n                                <input id=\"newMovieName-" + movieCollection.identifier + "\" type=\"text\" title=\"Name\" placeholder=\"Name\" required>\n                                <input id=\"newMovieDirector-" + movieCollection.identifier + "\" type=\"text\" placeholder=\"Director\" required>\n                            </li>\n                            <li>\n                                <select id=\"newMovieGenre-" + movieCollection.identifier + "\" required>\n                                    " + this._genreOptions + "\n                                </select>\n                                <input id=\"newMovieDuration-" + movieCollection.identifier + "\" type=\"number\" placeholder=\"Duration\" required>\n                            </li>\n                            <li>\n                                <input id=\"newMoviePicture-" + movieCollection.identifier + "\" type=\"url\" title=\"Picture\" placeholder=\"Picture URL\">\n                            </li>\n                            <li>\n                                <textarea id=\"newMovieDescription-" + movieCollection.identifier + "\" placeholder=\"Description\"></textarea>\n                            </li>\n                        </ul>\n                        <input type=\"button\" value=\"Create\" onclick=\"mediaManController.createMovie('" + movieCollection.identifier + "');\" />\n                    </form>\n                </div>\n                <div class=\"collectionToolsContainer\">\n                    <h3>Tools</h3>\n                    <form action=\"#\">\n                        <input type=\"button\" value=\"Remove collection\" onclick=\"mediaManController.removeMovieCollection('" + movieCollection.identifier + "');\" />\n                    </form>\n                </div>\n            </div>\n            <div class=\"containerGroup\">\n                <div class=\"container\">\n                    <table class=\"collectionTable\">\n                        <thead>\n                        <tr>\n                            <td>Picture</td>\n                            <td>Name</td>\n                            <td>Genre</td>\n                            <td>Description</td>\n                            <td>Director</td>\n                            <td>Duration</td>\n                            <td>Remove</td>\n                        </tr>\n                        </thead>\n                        <tbody id=\"collectionTableBody-" + movieCollection.identifier + "\"></tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n        ";
        movieCollection.collection.forEach(function (movie) {
            _this.renderMovie(movieCollection.identifier, movie);
        });
    };
    HTMLMediaManView.prototype.getNewMovieCollectionName = function () {
        // build upon standard HTML DOM validation
        if (this._newMovieCollectionName.checkValidity() === false) {
            this._newMovieCollectionName.reportValidity();
            throw new Error("Invalid collection name!");
        }
        return this._newMovieCollectionName.value;
    };
    HTMLMediaManView.prototype.renderMovie = function (collectionIdentifier, movie) {
        if (!movie) {
            throw new Error("The movie to render must be provided!");
        }
        var collectionTableBody = document.getElementById("collectionTableBody-" + collectionIdentifier);
        if (!collectionTableBody) {
            throw new Error("The table body for collection " + collectionIdentifier + " could not be found! Was the template changed?");
        }
        var tableRow = collectionTableBody.insertRow();
        tableRow.id = "movie-" + collectionIdentifier + "-" + movie.identifier;
        tableRow.innerHTML = "\n        <td>\n            <img class=\"mediaImage\" src=\"" + movie.pictureLocation + "\">\n        </td>\n        <td>" + movie.name + "</td>\n        <td>" + movie.genre + "</td>\n        <td>" + movie.description + "</td>\n        <td>" + movie.director + "</td>\n        <td>" + movie.duration + "</td>\n        <td>\n            <a href=\"#\" onclick=\"mediaManController.removeMovie('" + collectionIdentifier + "','" + movie.identifier + "');\">X</a>\n        </td>\n    ";
        collectionTableBody.appendChild(tableRow);
    };
    HTMLMediaManView.prototype.clearMovieCollections = function () {
        this._movieCollectionsContainer.innerHTML = "";
    };
    HTMLMediaManView.prototype.removeMovieCollection = function (identifier) {
        var movieCollectionDOMNode = document.getElementById("movieCollection-" + identifier);
        if (!movieCollectionDOMNode) {
            throw new Error("Could not remove the movie collection from the DOM. Couldn't find the DOM node");
        }
        else {
            movieCollectionDOMNode.remove();
        }
    };
    HTMLMediaManView.prototype.getNewMovieDetails = function (collectionIdentifier) {
        if (!collectionIdentifier) {
            // we throw this one because it means that there is a bug!
            throw new Error("The collection identifier must be provided!");
        }
        // required
        var newMovieForm = document.getElementById("newMovie-" + collectionIdentifier);
        if (!newMovieForm) {
            throw new Error("Could not find the new movie form for collection " + collectionIdentifier);
        }
        // build upon standard HTML DOM validation
        if (newMovieForm.checkValidity() === false) {
            newMovieForm.reportValidity();
            return {
                error: "The new book form is invalid!"
            };
        }
        // from here on out, no need to check the validity of the specific form fields
        // we just need to check if the fields can be found
        var newMovieNameField = document.getElementById("newMovieName-" + collectionIdentifier);
        if (!newMovieNameField) {
            throw new Error("The new movie form's name input was not found! Did the template change?");
        }
        var newMovieDirectorField = document.getElementById("newMovieDirector-" + collectionIdentifier);
        if (!newMovieDirectorField) {
            throw new Error("The new movie form's director input was not found! Did the template change?");
        }
        var newMovieGenreSelect = document.getElementById("newMovieGenre-" + collectionIdentifier);
        if (!newMovieGenreSelect) {
            throw new Error("The new movie form's genre select was not found! Did the template change?");
        }
        var newMovieDurationField = document.getElementById("newMovieDuration-" + collectionIdentifier);
        if (!newMovieDurationField) {
            throw new Error("The new movie form's page input was not found! Did the template change?");
        }
        // optional
        var newMoviePictureField = document.getElementById("newMoviePicture-" + collectionIdentifier);
        if (!newMoviePictureField) {
            throw new Error("The new book form's picture input was not found! Did the template change?");
        }
        var newMovieDescriptionField = document.getElementById("newMovieDescription-" + collectionIdentifier);
        if (!newMovieDescriptionField) {
            throw new Error("The new book form's description input was not found! Did the template change?");
        }
        var newMovieGenre = Genre[newMovieGenreSelect.value];
        var newMovieDuration = Number.parseInt(newMovieDurationField.value);
        return {
            movie: new Movie(newMovieNameField.value, newMovieDescriptionField.value, newMoviePictureField.value, newMovieGenre, newMovieDirectorField.value, newMovieDuration)
        };
    };
    HTMLMediaManView.prototype.removeMovie = function (collectionIdentifier, movieIdentifier) {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }
        if (!movieIdentifier) {
            throw new Error("The movie identifier must be provided!");
        }
        var movieElement = document.getElementById("movie-" + collectionIdentifier + "-" + movieIdentifier);
        if (!movieElement) {
            throw new Error("The element corresponding to the movie to remove could not be found! Did the template change?");
        }
        movieElement.remove();
    };
    HTMLMediaManView.prototype.clearNewMovieForm = function (collectionIdentifier) {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }
        var newMovieForm = document.getElementById("newMovie-" + collectionIdentifier);
        if (!newMovieForm) {
            throw new Error("Could not find the new movie form for collection " + collectionIdentifier);
        }
        newMovieForm.reset();
    };
    HTMLMediaManView.prototype.clearNewMovieCollectionForm = function () {
        this._newMovieCollectionForm.reset();
    };
    return HTMLMediaManView;
}());
export { HTMLMediaManView };
//# sourceMappingURL=HTMLMediaManView.js.map