import { Request, Response } from 'express';
import { NoteService } from '../services/NoteService';

export class NoteController {
    private noteService: NoteService;
  
    constructor() {
      this.noteService = new NoteService();
    }
  
    createForTask = async (req: Request, res: Response): Promise<void> => {
      const { taskId } = req.params;
      const { content } = req.body;
  
      const note = await this.noteService.createNoteForTask(Number(taskId), content);
      if (!note) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(201).json(note);
    };
  
    getNotesByTask = async (req: Request, res: Response): Promise<void> => {
      const { taskId } = req.params;
      const notes = await this.noteService.getNotesByTask(Number(taskId));
      res.json(notes);
    };
}
