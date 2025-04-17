import { z } from 'zod';
import { Task } from '../entities/Task';

const statusValues = ['todo', 'in_progress', 'done'] as const;
const priorityValues = ['low', 'medium', 'high', 'critical'] as const;

export const valuesTaskSchema = z.object({
  title: z.string().trim().min(3).max(255),
  description: z.string().trim().min(5).max(255),
  status: z.enum(statusValues).optional().default('todo'),
  priority: z.enum(priorityValues).optional().default('medium'),
});
