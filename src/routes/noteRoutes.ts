import { Router } from 'express';
import { NoteController } from '../controllers/NoteController';

const router = Router();
const noteController = new NoteController();

router.get('/tasks/:taskId/notes', noteController.getNotesByTask);
router.post('/tasks/:taskId/notes', noteController.createForTask);


export default router;
