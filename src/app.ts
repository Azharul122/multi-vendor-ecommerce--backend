import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './models/user/user.route';
import { authRoutes } from './models/auth/auth.route';
const app: Application = express();



// paeser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// export
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/auth",authRoutes)

export default app;
