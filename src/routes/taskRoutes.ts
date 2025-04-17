import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

import { validateBody } from '../middlewares/zodValidator';
import { createTaskSchema } from '../validators/taskSchema';


const router = Router();
const taskController = new TaskController();

router.get('/tasks/', taskController.getAll);
router.get('/tasks/:id', taskController.getById);
router.post('/tasks/', validateBody(createTaskSchema), taskController.create);
router.put('/tasks/:id', taskController.update);
router.delete('/tasks/:id', taskController.delete);

export default router;

