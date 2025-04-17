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
}