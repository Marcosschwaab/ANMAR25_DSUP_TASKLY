import { z } from 'zod';

export const valuesCategorySchema = z.object({
  name: z.string().trim().min(3).max(155),
});