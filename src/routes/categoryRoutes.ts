import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

import { validateBody } from '../middlewares/zodValidator';
import { valuesCategorySchema } from '../validators/categorySchema';

const router = Router();
const categoryController = new CategoryController();

router.get('/categories/', categoryController.getAll);

router.get('/tasks/:taskId/categories', categoryController.getCategoriesByTask);
router.post('/tasks/:taskId/categories',validateBody(valuesCategorySchema), categoryController.createForTask);
router.get('/categories/:id', categoryController.getById);
router.put('/categories/:id',validateBody(valuesCategorySchema), categoryController.update);
router.delete('/categories/:id', categoryController.delete);

export default router;