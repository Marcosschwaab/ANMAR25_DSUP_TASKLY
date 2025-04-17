import { z } from 'zod';
import { Note } from '../entities/Note';

export const valuesNoteSchema = z.object({
  content: z.string().trim().min(5).max(255),
});