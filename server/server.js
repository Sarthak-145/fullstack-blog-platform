import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';

dotenv.config();
const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

//routes
app.use('/api/auth', authRouter);

app.use('/api/posts', postsRouter);

const port = process.env.PORT || 5000;
app.listen(port, hostname, () => {
  console.log(`Server is listening on port ${port}`);
});
