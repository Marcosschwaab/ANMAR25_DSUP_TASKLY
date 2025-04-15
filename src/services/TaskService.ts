// src/service/TaskService.ts
import { Repository } from 'typeorm';
import { Note } from '../entities/Note';
import { Task } from '../entities/Task';
import { dataSource } from '../config/database';


export class TaskService {
  private taskRepository: Repository<Task>;
  private noteRepository: Repository<Note>;

  constructor() {
    this.taskRepository = dataSource.getRepository(Task);
    this.noteRepository = dataSource.getRepository(Note);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }
  async getTaskById(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }
  async createTask(data: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(data);
    return this.taskRepository.save(task);
  }
  async updateTask(id: number, data: Partial<Task>): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;

    Object.assign(task, data);
    return this.taskRepository.save(task);
  }
  async deleteTask(id: number): Promise<boolean> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['notes'],
    });
    if (!task) return false;
    if (task.notes && task.notes.length > 0) {
      await this.noteRepository.remove(task.notes);
    }
    await this.taskRepository.remove(task);

    return true;
  }
}
