import * as express from 'express';
import postsRouter from './routes/posts';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import commentRouter from './routes/comment';
import { database } from './db/database';
import * as cookieParser from 'cookie-parser';


const app: express.Application = express();
database.sync();

app.use(express.json());
app.use(cookieParser());
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentRouter);
app.use('/api/auth', authRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});