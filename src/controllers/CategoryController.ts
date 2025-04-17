import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { CategoryService } from '../services/CategoryService';
import { TaskRepository } from '../repositories/TaskRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { NoteRepository } from '../repositories/NoteRepository';

export class CategoryController {
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

      createForTask = async (req: Request, res: Response): Promise<void> => {
        const { taskId } = req.params;
        const { content } = req.body;
    
        const note = await this.categoryService.createCategoryForTask(Number(taskId), content);
        if (!note) {
          res.status(404).json({ message: 'Category not found' });
          return;
        }
        res.status(201).json(note);
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
        const category = await this.categoryService.updateCategory(Number(req.params.id), req.body.content);
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

