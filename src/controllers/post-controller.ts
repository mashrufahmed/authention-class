import expressAsyncHandler from 'express-async-handler';
import Post from '../models/post-model';

export const createPost = expressAsyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  
  const newPost = await Post.create({
    userId: req?.user?.id,
    title,
    description,
  });

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: newPost,
  });
});
