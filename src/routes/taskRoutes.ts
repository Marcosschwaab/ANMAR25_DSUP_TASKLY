import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();
const taskController = new TaskController();

router.get('/', taskController.getAll);
router.get('/:id', taskController.getById);
router.post('/', taskController.create);

export default router;

