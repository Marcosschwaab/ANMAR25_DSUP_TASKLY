import { CategoryRepository } from '../repositories/CategoryRepository';
import { TaskService } from './TaskService';



export class CategoryService {
    constructor(
        private cateRepo: CategoryRepository,
        private taskService: TaskService
    ){}

    async getAllCategories(){
        return this.cateRepo.findAll();
    }
}