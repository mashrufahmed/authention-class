import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../models/user-model';

export const register = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // exiting User
  const exitingUser = await User.findOne({ email });
  if (exitingUser) {
    next(createHttpError(400, 'User already exists'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser,
  });
});

export const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // exiting User
  const exitingUser = await User.findOne({ email });
  if (!exitingUser) {
    next(createHttpError(400, 'User not found'));
  }

  const hashedPassword = await bcrypt.compare(
    password,
    exitingUser?.password as string,
  );

  if (!hashedPassword) {
    next(createHttpError(400, 'Invalid password'));
  }

  const token = jwt.sign(
    { id: exitingUser?._id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' },
  );

  res.cookie('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: 'User login successfully',
    data: exitingUser,
  });
});
