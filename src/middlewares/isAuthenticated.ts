import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import User from '../models/user-model';

interface jwtPayload extends JwtPayload {
  id: string;
}

export default async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies['auth-token'];
  if (!token) {
    next(createHttpError(401, 'Unauthorized'));
  }
  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as jwtPayload;
  
  const getUser = await User.findById(decodedToken.id);
  if (!getUser) {
    next(createHttpError(401, 'Unauthorized'));
  }
  req.user = {
    id: decodedToken.id,
  };
  next();
}
