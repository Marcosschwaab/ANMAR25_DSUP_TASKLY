import { z } from 'zod';

export const valuesNoteSchema = z.object({
  content: z.string().trim().min(5).max(255),
  created_at: z.coerce.date().optional(), 
  updated_at: z.coerce.date().nullable().optional(),
});