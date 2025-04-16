import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { TaskRepository } from '../repositories/TaskRepository';
import { NoteRepository } from '../repositories/NoteRepository';

export class TaskController {
  private service: TaskService;

  constructor() {
    this.service = new TaskService(
      new TaskRepository(),
      new NoteRepository()
    );
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const tasks = await this.service.getAllTasks();
    res.json(tasks);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const task = await this.service.getTaskById(Number(req.params.id));
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const task = await this.service.createTask(req.body);
    res.status(201).json(task);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const task = await this.service.updateTask(Number(req.params.id), req.body);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const deleted = await this.service.deleteTask(Number(req.params.id));
    if (!deleted) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(204).send();
  };
}
