import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './models/user/user.route';
import { authRoutes } from './models/auth/auth.route';
import globalErrorHandler from './middlewares/globalHandler';
import notFound from './middlewares/NotFound';
import { blogRouter } from './models/blogs/blog.route';
import { productRouter } from './models/products/product.route';
import { categoryRoutes } from './models/categories/category.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Router
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/category', categoryRoutes);

// Global Error
app.use(globalErrorHandler);
app.use(notFound);

export default app;
