import { dataSource } from '../config/database';
import { Note } from '../entities/Note';
import { Task } from '../entities/Task';
import { Repository } from 'typeorm';


export class NoteService {
    private noteRepository: Repository<Note>;
    private taskRepository: Repository<Task>;
  
    constructor() {
      this.noteRepository = dataSource.getRepository(Note);
      this.taskRepository = dataSource.getRepository(Task);
    }

  async createNoteForTask(taskId: number, content: string): Promise<Note | null> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) return null;

    const note = this.noteRepository.create({ content, task });
    return this.noteRepository.save(note);
  }

  async getNotesByTask(taskId: number): Promise<Note[]> {
    return this.noteRepository.find({
      where: { task: { id: taskId } },
      relations: ['task'],
    });
    
  }
}
