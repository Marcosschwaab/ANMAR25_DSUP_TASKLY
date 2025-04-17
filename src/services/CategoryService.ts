import { Category } from '../entities/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { TaskService } from './TaskService';

export class CategoryService {
    constructor(
        private cateRepo: CategoryRepository,
        private taskService: TaskService
    ){}

    async getAllCategories(): Promise<Category[]> {
        return this.cateRepo.findAll();
    }
    async createCategoryForTask(taskId: number, content: string): Promise<Category | null> {
        const task = await this.cateRepo.findById(taskId);
        if (!task) return null;
    
        const note = this.cateRepo.create({ content, task });
        return this.cateRepo.save(note);
      }
}