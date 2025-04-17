import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

import { validateBody } from '../middlewares/zodValidator';
import { valuesNoteSchema } from '../validators/noteSchema';

const router = Router();
const categoryController = new CategoryController();

router.get('/categories/', categoryController.getAll);

router.get('/tasks/:taskId/dategories', categoryController.getCategoriesByTask);
router.post('/tasks/:taskId/categories',validateBody(valuesNoteSchema), categoryController.createForTask);
router.get('/categories/:id', categoryController.getById);
router.put('/categories/:id',validateBody(valuesNoteSchema), categoryController.update);
router.delete('/categories/:id', categoryController.delete);

export default router;