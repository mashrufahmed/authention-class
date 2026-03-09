import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import GlobalErrorHandler from './middlewares/global-error-handler';
import authRouter from './routes/auth-route';
import postRouter from './routes/post-route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

// 404 Error Handler
app.use((req, res, next) => {
  return res.status(404).json({ success: false, message: 'Not Found' });
});

// Global Error Handler
app.use(GlobalErrorHandler);

export default app;
