import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { CategoryService } from '../services/CategoryService';
import { TaskRepository } from '../repositories/TaskRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { NoteRepository } from '../repositories/NoteRepository';

export class CategoryCOntroller {
    private categoryService: CategoryService;
    private taskService: TaskService;

    constructor() {
        this.categoryService = new CategoryService(
          new CategoryRepository(),
          new TaskService(new TaskRepository(), new NoteRepository())
        );
        this.taskService = new TaskService(new TaskRepository(), new NoteRepository());
      }
    
      getAll = async (req: Request, res: Response) => {
        const categories = await this.categoryService.getAllCategories();
        res.json(categories);
      };
}

