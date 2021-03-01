import express, {Request, Response} from 'express';

const app = express();
const PORT = 8000;

let authRoutes = require('./routes/authRoutes');
let protectedRouter = require('./routes/protected/protectedRoutes')

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/protected', protectedRouter)
app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log(`⚡️ Server is running at https://localhost:${PORT}`);
});