import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './models/user/user.route';
import { authRoutes } from './models/auth/auth.route';
import globalErrorHandler from './middlewares/globalHandler';
import notFound from './middlewares/NotFound';
const app: Application = express();

// paeser
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// export
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

// Global Error
app.use(globalErrorHandler);
app.use(notFound);

export default app;
