import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
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
