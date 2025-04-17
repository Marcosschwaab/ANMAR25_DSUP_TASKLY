import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'tittle is required'),
  description: z.string().min(1, 'description is required'),
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
});