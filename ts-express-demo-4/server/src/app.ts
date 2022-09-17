import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import usersRoutes from './routes/routes';
import { url } from 'inspector';

const app: Express = express();

app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Good to go');
});

app.use('/api/v1/users', usersRoutes);

export default app;
