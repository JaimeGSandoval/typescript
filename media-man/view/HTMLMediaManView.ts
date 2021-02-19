import { MediaCollection } from '../model/MediaCollection';
import { Book } from '../media/book/Book';
import { Movie } from '../media/movie/Movie';
import { Genre } from '../media/abstract-media/Media';

export interface MediaManView {
    getNewBookCollectionName(): string;
    renderBookCollection(bookCollection: Readonly<MediaCollection<Book>>): void;
    displayErrorMessage(message: string): void;
    clearBookCollections(): void;
    removeBookCollection(identifier: string): void;
    getNewBookDetails(collectionIdentifier: string): { error?: string, book?: Readonly<Book> };
    renderBook(collectionIdentifier: string, book: Readonly<Book>): void;
    removeBook(collectionIdentifier: string, bookIdentifier: string): void;
    clearNewBookForm(collectionIdentifier: string): void;
    clearNewBookCollectionForm(): void;


    getNewMovieCollectionName(): string;
    renderMovieCollection(movieCollection: Readonly<MediaCollection<Movie>>): void;
    clearMovieCollections(): void;
    removeMovieCollection(identifier: string): void;
    getNewMovieDetails(collectionIdentifier: string): { error?: string, movie?: Readonly<Movie> };
    renderMovie(collectionIdentifier: string, movie: Readonly<Movie>): void;
    removeMovie(collectionIdentifier: string, movieIdentifier: string): void;
    clearNewMovieForm(collectionIdentifier: string): void;
    clearNewMovieCollectionForm(): void;
}

export class HTMLMediaManView implements MediaManView {
    private readonly _newBookCollectionForm: HTMLFormElement;
    private readonly _newBookCollectionName: HTMLInputElement;
    private readonly _bookCollectionsContainer: HTMLDivElement;

    private readonly _newMovieCollectionForm: HTMLFormElement;
    private readonly _newMovieCollectionName: HTMLInputElement;
    private readonly _movieCollectionsContainer: HTMLDivElement;


    private readonly _genreOptions: string = "";

    constructor() {
        this._newBookCollectionForm = document.getElementById('newBookCollection') as HTMLFormElement;
        this._newBookCollectionName = document.getElementById('newBookCollectionName') as HTMLInputElement;
        this._bookCollectionsContainer = document.getElementById("bookCollections") as HTMLDivElement;

        this._newMovieCollectionForm = document.getElementById('newMovieCollection') as HTMLFormElement;
        this._newMovieCollectionName = document.getElementById('newMovieCollectionName') as HTMLInputElement;
        this._movieCollectionsContainer = document.getElementById('movieCollections') as HTMLDivElement;

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

        for (let genreKey in Genre) {
            this._genreOptions += `<option value="${genreKey}">${Genre[genreKey]}</option>">`;
        }
    }

    getNewBookCollectionName(): string {
        // build upon standard HTML DOM validation
        if (this._newBookCollectionName.checkValidity() === false) {
            this._newBookCollectionName.reportValidity();
            throw new Error("Invalid collection name!");
        }
        return this._newBookCollectionName.value;
    }

    renderBook(collectionIdentifier: string, book: Readonly<Book>): void {
        if (!book) {
            throw new Error("The book to render must be provided!");
        }

        const collectionTableBody = document.getElementById(`collectionTableBody-${collectionIdentifier}`) as HTMLTableSectionElement;

        if (!collectionTableBody) {
            throw new Error(`The table body for collection ${collectionIdentifier} could not be found! Was the template changed?`);
        }

        const tableRow: HTMLTableRowElement = collectionTableBody.insertRow();

        tableRow.id = `book-${collectionIdentifier}-${book.identifier}`;

        tableRow.innerHTML = `
                <td>
                    <img class="mediaImage" src="${book.pictureLocation}">
                </td>
                <td>${book.name}</td>
                <td>${book.genre}</td>
                <td>${book.description}</td>
                <td>${book.author}</td>
                <td>${book.numberOfPages}</td>
                <td>
                    <a href="#" onclick="mediaManController.removeBook('${collectionIdentifier}','${book.identifier}');">X</a>
                </td>
        `;

        collectionTableBody.appendChild(tableRow);
    }

    renderBookCollection(bookCollection: Readonly<MediaCollection<Book>>): void {
        this._bookCollectionsContainer.innerHTML += `
        <div id="bookCollection-${bookCollection.identifier}" class="collection">
            <h3 class="collectionName">${bookCollection.name}</h3>
            <div class="containerGroup">
                <div class="container">
                    <h3>New book</h3>
                    <form id="newBook-${bookCollection.identifier}" action="#">
                        <ul>
                            <li>
                                <input id="newBookName-${bookCollection.identifier}" type="text" title="Name" placeholder="Name" required>
                                <input id="newBookAuthor-${bookCollection.identifier}" type="text" placeholder="Author" required>
                            </li>
                            <li>
                                <select id="newBookGenre-${bookCollection.identifier}" required>
                                    ${this._genreOptions}
                                </select>
                                <input id="newBookPages-${bookCollection.identifier}" type="number" placeholder="Pages" required>
                            </li>
                            <li>
                                <input id="newBookPicture-${bookCollection.identifier}" type="url" title="Picture" placeholder="Picture URL">
                            </li>
                            <li>
                                <textarea id="newBookDescription-${bookCollection.identifier}" placeholder="Description"></textarea>
                            </li>
                        </ul>
                        <input type="button" value="Create" onclick="mediaManController.createBook('${bookCollection.identifier}');" />
                    </form>
                </div>
                <div class="collectionToolsContainer">
                    <h3>Tools</h3>
                    <form action="#">
                        <input type="button" value="Remove collection" onclick="mediaManController.removeBookCollection('${bookCollection.identifier}');" />
                    </form>
                </div>
            </div>
            <div class="containerGroup">
                <div class="container">
                    <table class="collectionTable">
                        <thead>
                        <tr>
                            <td>Picture</td>
                            <td>Name</td>
                            <td>Genre</td>
                            <td>Description</td>
                            <td>Author</td>
                            <td>Pages</td>
                            <td>Remove</td>
                        </tr>
                        </thead>
                        <tbody id="collectionTableBody-${bookCollection.identifier}"></tbody>
                    </table>
                </div>
            </div>
        </div>
        `;

        bookCollection.collection.forEach(book => {
            this.renderBook(bookCollection.identifier, book);
        });
    }

    clearBookCollections(): void {
        this._bookCollectionsContainer.innerHTML = "";
    }

    removeBookCollection(identifier: string) {
        const bookCollectionDOMNode: HTMLDivElement = document.getElementById(`bookCollection-${identifier}`) as HTMLDivElement;
        if (!bookCollectionDOMNode) {
            throw new Error("Could not remove the book collection from the DOM. Couldn't find the DOM node");
        } else {
            bookCollectionDOMNode.remove();
        }
    }

    displayErrorMessage(errorMessage: string): void {
        if (!errorMessage) {
            throw new Error("An error message must be provided!");
        }
        alert(errorMessage); // bad user experience but ignore this for now
    }

    getNewBookDetails(collectionIdentifier: string): { error?: string, book?: Book } {
        if (!collectionIdentifier) {
            // we throw this one because it means that there is a bug!
            throw new Error("The collection identifier must be provided!");
        }

        // required
        const newBookForm = document.getElementById(`newBook-${collectionIdentifier}`) as HTMLFormElement;

        if (!newBookForm) {
            throw new Error(`Could not find the new book form for collection ${collectionIdentifier}`);
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
        const newBookNameField = document.getElementById(`newBookName-${collectionIdentifier}`) as HTMLInputElement;
        if (!newBookNameField) {
            throw new Error("The new book form's name input was not found! Did the template change?");
        }
        const newBookAuthorField = document.getElementById(`newBookAuthor-${collectionIdentifier}`) as HTMLInputElement;
        if (!newBookAuthorField) {
            throw new Error("The new book form's author input was not found! Did the template change?");
        }
        const newBookGenreSelect = document.getElementById(`newBookGenre-${collectionIdentifier}`) as HTMLSelectElement;
        if (!newBookGenreSelect) {
            throw new Error("The new book form's genre select was not found! Did the template change?");
        }
        const newBookPagesField = document.getElementById(`newBookPages-${collectionIdentifier}`) as HTMLInputElement;
        if (!newBookPagesField) {
            throw new Error("The new book form's page input was not found! Did the template change?");
        }

        // optional
        const newBookPictureField = document.getElementById(`newBookPicture-${collectionIdentifier}`) as HTMLInputElement;
        if (!newBookPictureField) {
            throw new Error("The new book form's picture input was not found! Did the template change?");
        }
        const newBookDescriptionField = document.getElementById(`newBookDescription-${collectionIdentifier}`) as HTMLTextAreaElement;
        if (!newBookDescriptionField) {
            throw new Error("The new book form's description input was not found! Did the template change?");
        }

        const newBookGenre = Genre[newBookGenreSelect.value as keyof typeof Genre];

        const newBookNumberOfPages = Number.parseInt(newBookPagesField.value);

        return {
            book: new Book(newBookNameField.value, newBookDescriptionField.value, newBookPictureField.value, newBookGenre, newBookAuthorField.value, newBookNumberOfPages)
        };
    }

    removeBook(collectionIdentifier: string, bookIdentifier: string) {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }

        if (!bookIdentifier) {
            throw new Error("The book identifier must be provided!");
        }

        const bookElement = document.getElementById(`book-${collectionIdentifier}-${bookIdentifier}`) as HTMLInputElement;
        if (!bookElement) {
            throw new Error("The element corresponding to the book to remove could not be found! Did the template change?");
        }

        bookElement.remove();
    }

    clearNewBookForm(collectionIdentifier: string): void {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }

        const newBookForm = document.getElementById(`newBook-${collectionIdentifier}`) as HTMLFormElement;

        if (!newBookForm) {
            throw new Error(`Could not find the new book form for collection ${collectionIdentifier}`);
        }

        newBookForm.reset();
    }

    clearNewBookCollectionForm(): void {
        this._newBookCollectionForm.reset();
    }



    // *****************************

     renderMovieCollection(movieCollection: Readonly<MediaCollection<Movie>>): void {
        this._movieCollectionsContainer.innerHTML += `
        <div id="movieCollection-${movieCollection.identifier}" class="collection">
            <h3 class="collectionName">${movieCollection.name}</h3>
            <div class="containerGroup">
                <div class="container">
                    <h3>New movie</h3>
                    <form id="newMovie-${movieCollection.identifier}" action="#">
                        <ul>
                            <li>
                                <input id="newMovieName-${movieCollection.identifier}" type="text" title="Name" placeholder="Name" required>
                                <input id="newMovieDirector-${movieCollection.identifier}" type="text" placeholder="Director" required>
                            </li>
                            <li>
                                <select id="newMovieGenre-${movieCollection.identifier}" required>
                                    ${this._genreOptions}
                                </select>
                                <input id="newMovieDuration-${movieCollection.identifier}" type="number" placeholder="Duration" required>
                            </li>
                            <li>
                                <input id="newMoviePicture-${movieCollection.identifier}" type="url" title="Picture" placeholder="Picture URL">
                            </li>
                            <li>
                                <textarea id="newMovieDescription-${movieCollection.identifier}" placeholder="Description"></textarea>
                            </li>
                        </ul>
                        <input type="button" value="Create" onclick="mediaManController.createMovie('${movieCollection.identifier}');" />
                    </form>
                </div>
                <div class="collectionToolsContainer">
                    <h3>Tools</h3>
                    <form action="#">
                        <input type="button" value="Remove collection" onclick="mediaManController.removeMovieCollection('${movieCollection.identifier}');" />
                    </form>
                </div>
            </div>
            <div class="containerGroup">
                <div class="container">
                    <table class="collectionTable">
                        <thead>
                        <tr>
                            <td>Picture</td>
                            <td>Name</td>
                            <td>Genre</td>
                            <td>Description</td>
                            <td>Director</td>
                            <td>Duration</td>
                            <td>Remove</td>
                        </tr>
                        </thead>
                        <tbody id="collectionTableBody-${movieCollection.identifier}"></tbody>
                    </table>
                </div>
            </div>
        </div>
        `;

        movieCollection.collection.forEach(movie => {
            this.renderMovie(movieCollection.identifier, movie);
        });
    }

    getNewMovieCollectionName(): string {
        // build upon standard HTML DOM validation
        if (this._newMovieCollectionName.checkValidity() === false) {
            this._newMovieCollectionName.reportValidity();
            throw new Error("Invalid collection name!");
        }
        return this._newMovieCollectionName.value;
    }

    renderMovie(collectionIdentifier: string, movie: Readonly<Movie>): void {
        if (!movie) {
            throw new Error("The movie to render must be provided!");
        }

    const collectionTableBody = document.getElementById(`collectionTableBody-${collectionIdentifier}`) as HTMLTableSectionElement;

        if (!collectionTableBody) {
            throw new Error(`The table body for collection ${collectionIdentifier} could not be found! Was the template changed?`);
        }

    const tableRow: HTMLTableRowElement = collectionTableBody.insertRow();

    tableRow.id = `movie-${collectionIdentifier}-${movie.identifier}`;

    tableRow.innerHTML = `
        <td>
            <img class="mediaImage" src="${movie.pictureLocation}">
        </td>
        <td>${movie.name}</td>
        <td>${movie.genre}</td>
        <td>${movie.description}</td>
        <td>${movie.director}</td>
        <td>${movie.duration}</td>
        <td>
            <a href="#" onclick="mediaManController.removeMovie('${collectionIdentifier}','${movie.identifier}');">X</a>
        </td>
    `;

    collectionTableBody.appendChild(tableRow);
  }



    clearMovieCollections(): void {
        this._movieCollectionsContainer.innerHTML = "";
    }

    removeMovieCollection(identifier: string) {
        const movieCollectionDOMNode: HTMLDivElement = document.getElementById(`movieCollection-${identifier}`) as HTMLDivElement;
        if (!movieCollectionDOMNode) {
            throw new Error("Could not remove the movie collection from the DOM. Couldn't find the DOM node");
        } else {
            movieCollectionDOMNode.remove();
        }
    }

    getNewMovieDetails(collectionIdentifier: string): { error?: string, movie?: Movie } {
        if (!collectionIdentifier) {
            // we throw this one because it means that there is a bug!
            throw new Error("The collection identifier must be provided!");
        }

        // required
        const newMovieForm = document.getElementById(`newMovie-${collectionIdentifier}`) as HTMLFormElement;

        if (!newMovieForm) {
            throw new Error(`Could not find the new movie form for collection ${collectionIdentifier}`);
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
        const newMovieNameField = document.getElementById(`newMovieName-${collectionIdentifier}`) as HTMLInputElement;
        if (!newMovieNameField) {
            throw new Error("The new movie form's name input was not found! Did the template change?");
        }
        const newMovieDirectorField = document.getElementById(`newMovieDirector-${collectionIdentifier}`) as HTMLInputElement;
        if (!newMovieDirectorField) {
            throw new Error("The new movie form's director input was not found! Did the template change?");
        }
        const newMovieGenreSelect = document.getElementById(`newMovieGenre-${collectionIdentifier}`) as HTMLSelectElement;
        if (!newMovieGenreSelect) {
            throw new Error("The new movie form's genre select was not found! Did the template change?");
        }
        const newMovieDurationField = document.getElementById(`newMovieDuration-${collectionIdentifier}`) as HTMLInputElement;
        if (!newMovieDurationField) {
            throw new Error("The new movie form's page input was not found! Did the template change?");
        }

        // optional
        const newMoviePictureField = document.getElementById(`newMoviePicture-${collectionIdentifier}`) as HTMLInputElement;
        if (!newMoviePictureField) {
            throw new Error("The new book form's picture input was not found! Did the template change?");
        }
        const newMovieDescriptionField = document.getElementById(`newMovieDescription-${collectionIdentifier}`) as HTMLTextAreaElement;
        if (!newMovieDescriptionField) {
            throw new Error("The new book form's description input was not found! Did the template change?");
        }

        const newMovieGenre = Genre[newMovieGenreSelect.value as keyof typeof Genre];

        const newMovieDuration = Number.parseInt(newMovieDurationField.value);

        return {
            movie: new Movie(newMovieNameField.value, newMovieDescriptionField.value, newMoviePictureField.value, newMovieGenre, newMovieDirectorField.value, newMovieDuration)
        };
    }

    removeMovie(collectionIdentifier: string, movieIdentifier: string) {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }

        if (!movieIdentifier) {
            throw new Error("The movie identifier must be provided!");
        }

        const movieElement = document.getElementById(`movie-${collectionIdentifier}-${movieIdentifier}`) as HTMLInputElement;
        if (!movieElement) {
            throw new Error("The element corresponding to the movie to remove could not be found! Did the template change?");
        }

        movieElement.remove();
    }

    clearNewMovieForm(collectionIdentifier: string): void {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }

        const newMovieForm = document.getElementById(`newMovie-${collectionIdentifier}`) as HTMLFormElement;

        if (!newMovieForm) {
            throw new Error(`Could not find the new movie form for collection ${collectionIdentifier}`);
        }

        newMovieForm.reset();
    }

    clearNewMovieCollectionForm(): void {
        this._newMovieCollectionForm.reset();
    }
}
