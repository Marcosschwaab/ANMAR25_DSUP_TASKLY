import { NoteRepository } from '../repositories/NoteRepository';
import { TaskRepository } from '../repositories/TaskRepository';
import { Note } from '../entities/Note';

export class NoteService {
  constructor(
    private noteRepo: NoteRepository,
    private taskRepo: TaskRepository
  ) {}

  async createNoteForTask(taskId: number, content: string): Promise<Note | null> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) return null;

    const note = this.noteRepo.create({ content, task });
    return this.noteRepo.save(note);
  }

  async getNotesByTask(taskId: number): Promise<Note[]> {
    return this.noteRepo.findByTaskId(taskId);
  }

  async getNoteById(id: number): Promise<Note | null> {
    return this.noteRepo.findById(id);
  }

  async updateNote(id: number, content: string): Promise<Note | null> {
    const note = await this.noteRepo.findById(id);
    if (!note) return null;

    note.content = content;
    return this.noteRepo.save(note);
  }

  async deleteNote(id: number): Promise<boolean> {
    const result = await this.noteRepo.delete(id);
    return result.affected !== 0;
  }
}
