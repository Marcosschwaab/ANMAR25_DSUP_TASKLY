import { TaskRepository } from '../repositories/TaskRepository';
import { NoteRepository } from '../repositories/NoteRepository';
import { Task } from '../entities/Task';
import { TaskQueryDTO } from '../dtos/TaskQueryDTO';


export class TaskService {
  constructor(
    private taskRepo: TaskRepository,
    private noteRepo: NoteRepository
  ) {}

  async getAllTasks(query: TaskQueryDTO): Promise<{ count: number; pages: number; data: Task[] }> {
    const page = query.page || 1;
    const limit = query.limit || 5;
    const skip = (page - 1) * limit;
  
    const qb = this.taskRepo.createQueryBuilder('task');

    if (query.search) {
      qb.andWhere('task.title ILIKE :search OR task.description ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    if (query.status) {
      qb.andWhere('task.status = :status', { status: query.status });
    }
    
    if (query.priority) {
      qb.andWhere('task.priority = :priority', { priority: query.priority });
    }
    if (query.priority) {
      qb.andWhere('task.category = :category', { category: query.category });
    }

    const [tasks, count] = await qb
      .skip(skip)
      .take(limit)
      .orderBy('task.created_at', 'DESC')
      .getManyAndCount();

    const pages = Math.ceil(count / limit);

    return {
      count,
      pages,
      data: tasks,
    };
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
