import { Router } from 'express';
import { NoteController } from '../controllers/NoteController';

const router = Router();
const noteController = new NoteController();

router.get('/tasks/:taskId/notes', noteController.getNotesByTask);
router.post('/tasks/:taskId/notes', noteController.createForTask);
router.get('/notes/:id', noteController.getById);
router.put('/notes/:id', noteController.update);
router.delete('/notes/:id', noteController.delete);

export default router;
