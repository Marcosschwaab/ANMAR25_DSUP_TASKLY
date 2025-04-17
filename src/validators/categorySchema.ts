import { z } from 'zod';

export const valuesNoteSchema = z.object({
  content: z.string().trim().min(3).max(155),
});