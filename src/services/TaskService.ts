// src/service/TaskService.ts
import { Repository } from 'typeorm';
import { Task } from '../entities/Task';
import { dataSource } from '../config/database';


export class TaskService {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = dataSource.getRepository(Task);
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
    const result = await this.taskRepository.delete(id);
    return result.affected !== 0;
  }
}
