import { z } from 'zod';
import { Task } from '../entities/Task';

const statusValues = ['todo', 'in_progress', 'done'] as const;
const priorityValues = ['low', 'medium', 'high', 'critical'] as const;

export const createTaskSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3),
  status: z.enum(statusValues).optional().default('todo'),
  priority: z.enum(priorityValues).optional().default('medium'),
});

export const updateTaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(3).optional(),
  status: z.enum(statusValues).optional(),
  priority: z.enum(priorityValues).optional(),
});