import { z } from 'zod';

export const valuesNoteSchema = z.object({
  content: z.string().trim().min(5).max(255).refine(val => /^[a-zA-Z0-9\s.,!?áéíóúãõçÁÉÍÓÚÃÕÇ'"-]*$/.test(val), {
    message: 'Content contains invalid characters',
  }),
  created_at: z.coerce.date().optional(), 
  updated_at: z.coerce.date().nullable().optional(),
});