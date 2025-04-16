import { TaskRepository } from '../repositories/TaskRepository';
import { NoteRepository } from '../repositories/NoteRepository';
import { Task } from '../entities/Task';

export class TaskService {
  constructor(
    private taskRepo: TaskRepository,
    private noteRepo: NoteRepository
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepo.findAll();
  }

  async getTaskById(id: number): Promise<Task | null> {
    return this.taskRepo.findById(id);
  }

  async createTask(data: Partial<Task>): Promise<Task> {
    const task = this.taskRepo.create(data);
    return this.taskRepo.save(task);
  }

  async updateTask(id: number, data: Partial<Task>): Promise<Task | null> {
    const task = await this.taskRepo.findById(id);
    if (!task) return null;
    Object.assign(task, data);
    return this.taskRepo.save(task);
  }

  async deleteTask(id: number): Promise<boolean> {
    const task = await this.taskRepo.findById(id);
    if (!task) return false;

    if (task.notes && task.notes.length > 0) {
      await this.noteRepo.removeMany(task.notes);
    }

    await this.taskRepo.remove(task);
    return true;
  }
}
