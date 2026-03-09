import { Router } from 'express';
import { createPost } from '../controllers/post-controller';
import isAuthenticated from '../middlewares/isAuthenticated';

const postRouter = Router();

postRouter.post('/create-post', isAuthenticated, createPost);

export default postRouter;
