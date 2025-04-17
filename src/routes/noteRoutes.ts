import { Router } from 'express';
import { NoteController } from '../controllers/NoteController';

import { validateBody } from '../middlewares/zodValidator';
import { valuesNoteSchema } from '../validators/noteSchema';

const router = Router();
const noteController = new NoteController();

router.get('/tasks/:taskId/notes', noteController.getNotesByTask);
router.post('/tasks/:taskId/notes',validateBody(valuesNoteSchema), noteController.createForTask);
router.get('/notes/:id', noteController.getById);
router.put('/notes/:id',validateBody(valuesNoteSchema), noteController.update);
router.delete('/notes/:id', noteController.delete);

export default router;

