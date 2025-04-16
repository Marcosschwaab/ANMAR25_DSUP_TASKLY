import { Repository } from 'typeorm';
import { Task } from '../entities/Task';
import { dataSource } from '../config/database';

export class TaskRepository {
  private taskRepo: Repository<Task>;

  constructor() {
    this.taskRepo = dataSource.getRepository(Task);
  }

  findAll() {
    return this.taskRepo.find();
  }

  createQueryBuilder(alias: string) {
    return this.taskRepo.createQueryBuilder(alias);
  }
  
  findById(id: number) {
    return this.taskRepo.findOne({
      where: { id },
      relations: ['notes'],
    });
  }

  create(data: Partial<Task>) {
    return this.taskRepo.create(data);
  }

  save(task: Task) {
    return this.taskRepo.save(task);
  }

  remove(task: Task) {
    return this.taskRepo.remove(task);
  }
}
