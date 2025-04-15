import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'validate error',
      errors: err.flatten().fieldErrors,
    });
    return;
  }

  const error = err as Error;

  console.error('[ERROR 500]', error);

  res.status(500).json({
    error: 'this is a message error',
    detail: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
};
