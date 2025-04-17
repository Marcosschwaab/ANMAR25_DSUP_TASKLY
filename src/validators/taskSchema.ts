import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'tittle is required'),
  description: z.string().min(1, 'description is required'),
});