import { Router } from 'express';
import controller from '../controllers/controllers';

const router = Router();

router.get('/', controller.getNinjas);

export default router;
