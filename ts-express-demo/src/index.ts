import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { itemsRouter } from './items/items.router';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';

dotenv.config();

if (!process.env.PORT) process.exit(1);

const PORT: number = parseInt(process.env.PORT as string, 10);

/**
 * App Variables
 */
const app: Application = express();

/**
 *  App Configuration
 */

// helmet is a collection of 14 small middleware functions that set HTTP response headers. Mounting helmet() doesn't include all of these middleware functions but provides you with sensible defaults such as DNS Prefetch Control, Frameguard, Hide Powered-By, HSTS, IE No Open, Don't Sniff Mimetype, and XSS Filter.
app.use(helmet());

// By mounting cors(), you enable all CORS requests
app.use(cors());

// With express.json(), you parse incoming requests with JSON payloads, which populates the request object with a new body object containing the parsed data.
app.use(express.json());

app.use('/api/menu/items', itemsRouter);

// Your application can't reach any routes you define after mounting the errorHandler middleware function because you close the request-response cycle within errorHandler by sending a response to the client. As such, you must mount the errorHandler middleware function after you have mounted all the controller functions of your application.
app.use(errorHandler);

// But, as noted earlier, errorHandler won't catch 404 errors. However, you can catch these errors by making notFoundHandler the last middleware function that you mount, which effectively creates a catch-all handler for your app.
app.use(notFoundHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
