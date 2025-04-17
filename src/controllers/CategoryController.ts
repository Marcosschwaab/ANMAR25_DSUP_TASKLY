import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { CategoryService } from '../services/CategoryService';
import { TaskRepository } from '../repositories/TaskRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class CategoryController {
    private categoryService: CategoryService;
    private taskService: TaskService;

    constructor() {
      const cateRepo = new CategoryRepository();
      const taskRepo = new TaskRepository();
      this.categoryService = new CategoryService(cateRepo, taskRepo);
    }
    
      getAll = async (req: Request, res: Response) => {
        const categories = await this.categoryService.getAllCategories();
        res.json(categories);
      };

      createForTask = async (req: Request, res: Response): Promise<void> => {
        const { taskId } = req.params;
        const { name } = req.body;
    
        const category = await this.categoryService.createCategoryForTask(Number(taskId), name);
        if (!category) {
          res.status(404).json({ message: 'Task not found' });
          return;
        }
        res.status(201).json(category);
      };
      getCategoriesByTask = async (req: Request, res: Response): Promise<void> => {
        const { taskId } = req.params;
        const categories = await this.categoryService.getCategoriesByTask(Number(taskId));
        res.json(categories);
      };
  
      getById = async (req: Request, res: Response): Promise<void> => {
        const category = await this.categoryService.getCategoryById(Number(req.params.id));
        if (!category) {
          res.status(404).json({ message: 'Category not found' });
          return;
        }
        res.json(category);
      };
    
      update = async (req: Request, res: Response): Promise<void> => {
        const category = await this.categoryService.updateCategory(Number(req.params.id), req.body.name);
        if (!category) {
          res.status(404).json({ message: 'Category not found' });
          return;
        }
        res.json(category);
      };
    
      delete = async (req: Request, res: Response): Promise<void> => {
        const deleted = await this.categoryService.deleteCategory(Number(req.params.id));
        if (!deleted) {
          res.status(404).json({ message: 'Category not found' });
          return;
        }
        res.status(204).send();
      };
}

