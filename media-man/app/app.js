import "reflect-metadata";
import { Book } from '../media/book/Book';
import { Movie } from '../media/movie/Movie';
import { MediaServiceImpl } from '../api/MediaServiceImpl';
import { HTMLMediaManView } from '../view/HTMLMediaManView';
import { MediaManControllerImpl } from '../controller/MediaManControllerImpl';
console.log("MediaMan - Loading...");
var view = new HTMLMediaManView();
var bookService = new MediaServiceImpl(Book);
console.log("Book service initialized: ", bookService);
var movieService = new MediaServiceImpl(Movie);
console.log("Movie service initialized: ", movieService);
var mediaManController = new MediaManControllerImpl(view, bookService, movieService); // Starts App
var customWindow = window;
customWindow.mediaManController = mediaManController;
console.log("MediaMan ready!", customWindow.mediaManController);
//# sourceMappingURL=app.js.map