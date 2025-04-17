import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';



const router = Router();
const categoryController = new CategoryController();

router.get('/tasks/', categoryController.getAll);

export default router;