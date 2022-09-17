import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import app from './app';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
