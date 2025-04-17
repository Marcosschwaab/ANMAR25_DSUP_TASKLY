import { z } from 'zod';
import { Note } from '../entities/Note';

export const valuesNoteSchema = z.object({
  content: z.string().min(5).max(255),
});