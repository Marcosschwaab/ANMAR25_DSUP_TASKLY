import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { TaskRepository } from '../repositories/TaskRepository';
import { NoteRepository } from '../repositories/NoteRepository';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService(
      new TaskRepository(),
      new NoteRepository()
    );
  }

  getAll = async (req: Request, res: Response) => {
    const tasks = await this.taskService.getAllTasks(req.query); 
    res.json(tasks);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const task = await this.taskService.getTaskById(Number(req.params.id));
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const task = await this.taskService.createTask(req.body); 
    res.status(201).json(task);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const task = await this.taskService.updateTask(Number(req.params.id), req.body);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const deleted = await this.taskService.deleteTask(Number(req.params.id));
    if (!deleted) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(204).send();
  };
}
