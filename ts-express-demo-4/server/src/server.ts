import http from 'http';
import dotenv from 'dotenv';
import app from './app';

dotenv.config({ path: `${__dirname}/.env` });

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
