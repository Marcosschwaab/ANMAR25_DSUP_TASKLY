import { Repository } from 'typeorm';
import { Task } from '../entities/Task';
import { dataSource } from '../config/database';

export class TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = dataSource.getRepository(Task);
  }

  findAll() {
    return this.repository.find();
  }

  findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['notes'],
    });
  }

  create(data: Partial<Task>) {
    return this.repository.create(data);
  }

  save(task: Task) {
    return this.repository.save(task);
  }

  remove(task: Task) {
    return this.repository.remove(task);
  }
}
