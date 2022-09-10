import http from 'http';
import express, { Application } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

const router = express();

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((req, res, next) => {
  // set cors policy
  res.header('Access-Control-Allow-Origin', '*');
  // set cors headers
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization'
  );
  // set cors method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PUT DELETE POST');
    return res.status(200).json({});
  }

  next();
});

router.use('/', routes);

router.use((req, res, next) => {
  const error = new Error('Not found');
  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
