import "reflect-metadata";
import { Book } from '../media/book/Book';
import { Movie } from '../media/movie/Movie';
import { MediaServiceImpl } from '../api/MediaServiceImpl';
import { HTMLMediaManView } from '../view/HTMLMediaManView';
import { MediaManControllerImpl , MediaManController} from '../controller/MediaManControllerImpl';

console.log("MediaMan - Loading...");

const view: HTMLMediaManView = new HTMLMediaManView();

const bookService = new MediaServiceImpl<Book>(Book);
console.log("Book service initialized: ", bookService);

const movieService = new MediaServiceImpl<Movie>(Movie);
console.log("Movie service initialized: ", movieService);

const mediaManController = new MediaManControllerImpl(view, bookService, movieService); // Starts App

interface CustomWindow extends Window {
    mediaManController?: MediaManController
}

const customWindow: CustomWindow = window;
customWindow.mediaManController = mediaManController;

console.log("MediaMan ready!", customWindow.mediaManController);
