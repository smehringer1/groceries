import express from 'express';

const app = express();
const PORT = process.env.PORT;

const authRoutes = require('./routes/auth-routes');
const protectedRouter = require('./routes/protected/protected-routes')

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', protectedRouter)

app.listen(PORT, () => {
  console.log(`⚡️ Server is running at https://localhost:${PORT}`);
});