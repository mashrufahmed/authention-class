import type { NextFunction, Request, Response } from 'express';
import type { HttpError } from 'http-errors';

export default function GlobalErrorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const message = err.message || 'Internal Server Error';
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorStack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}
