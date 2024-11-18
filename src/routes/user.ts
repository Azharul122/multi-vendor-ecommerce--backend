import app from '../app';
import { getAllUser } from '../controllers/user';

app.get('/all', getAllUser);

export default app;
