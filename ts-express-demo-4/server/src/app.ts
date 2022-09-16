import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import ninjaRouter from './routes/routes';

const app: Express = express();

app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Good to go');
});

app.use('/api/v1/ninjas', ninjaRouter);

export default app;
