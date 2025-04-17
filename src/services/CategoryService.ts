import { Category } from '../entities/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { TaskRepository } from '../repositories/TaskRepository';


export class CategoryService {
    constructor(
        private cateRepo: CategoryRepository,
        private taskRepo: TaskRepository
    ){}

    async getAllCategories(): Promise<Category[]> {
        return this.cateRepo.findAll();
    }
    async createCategoryForTask(taskId: number, name: string): Promise<Category | null> {
      const task = await this.taskRepo.findById(taskId);
      if (!task) return null;
  
      const category = this.cateRepo.create({ name, task });
      return this.cateRepo.save(category);
    }
    
    async getCategoriesByTask(taskId: number): Promise<Category[]> {
        return this.cateRepo.findByTaskId(taskId);
      }
    
      async getCategoryById(id: number): Promise<Category | null> {
        return this.cateRepo.findById(id);
      }
    
      async updateCategory(id: number, name: string): Promise<Category | null> {
        const category = await this.cateRepo.findById(id);
        if (!category) return null;
    
        category.name = name;
        return this.cateRepo.save(category);
      }
    
      async deleteCategory(id: number): Promise<boolean> {
        const result = await this.cateRepo.delete(id);
        return result.affected !== 0;
      }
}