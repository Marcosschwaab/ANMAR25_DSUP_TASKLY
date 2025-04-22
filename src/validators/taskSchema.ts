import { z } from 'zod';

const statusValues = ['todo', 'in_progress', 'done'] as const;
const priorityValues = ['low', 'medium', 'high', 'critical'] as const;
const categoryValues = ['anonymous', 'backend', 'frontend', 'design', 'devops'] as const;

export const valuesTaskSchema = z.object({
  title: z.string().trim().min(3).max(255).refine(val => /^[a-zA-Z0-9\s.,!?áéíóúãõçÁÉÍÓÚÃÕÇ'"-]*$/.test(val), {
    message: 'Title contains invalid characters',
  }),
  description: z.string().trim().min(5).max(255).refine(val => /^[a-zA-Z0-9\s.,!?áéíóúãõçÁÉÍÓÚÃÕÇ'"-]*$/.test(val), {
    message: 'Description contains invalid characters',
  }),
  status: z.enum(statusValues).optional().default('todo'),
  priority: z.enum(priorityValues).optional().default('medium'),
  category: z.enum(categoryValues).optional().default('anonymous'),
  created_at: z.coerce.date().optional(), 
  updated_at: z.coerce.date().nullable().optional(),
});
