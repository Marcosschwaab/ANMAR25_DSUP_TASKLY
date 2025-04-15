import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  getAll = async (req: Request, res: Response) => {
    const tasks = await this.taskService.getAllTasks();
    res.json(tasks);
  };

  create = async (req: Request, res: Response) => {
    const task = await this.taskService.createTask(req.body);
    res.status(201).json(task);
  };
}
