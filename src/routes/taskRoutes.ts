import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

import { validateBody } from '../middlewares/zodValidator';
import { valuesTaskSchema } from '../validators/taskSchema';


const router = Router();
const taskController = new TaskController();

router.get('/tasks/', taskController.getAll);
router.get('/tasks/:id', taskController.getById);
router.post('/tasks/', validateBody(valuesTaskSchema), taskController.create);
router.put('/tasks/:id',validateBody(valuesTaskSchema), taskController.update);
router.delete('/tasks/:id', taskController.delete);

export default router;

