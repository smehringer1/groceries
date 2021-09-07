import express from 'express';

const app = express();
const PORT = process.env.PORT;

// imports

const authRoutes = require('./routes/auth-routes');
const protectedRouter = require('./routes/protected/protected-routes')

// express config

app.use(express.json());

// routes

app.use('/auth', authRoutes);
app.use('/', protectedRouter)



app.listen(PORT, () => {
  console.log(`⚡️ Server is running at https://localhost:${PORT}`);
});