import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        res.status(400).json({ errors });
      } else if (error instanceof Error) {
        res.status(400).json({ errors: error.message });
      } else {
        res.status(400).json({ errors: 'Validation failed' });
      }
    }
  };
}