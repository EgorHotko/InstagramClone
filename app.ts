import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import postsRouter from './routes/posts';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import commentRouter from './routes/comment';
import hashtagRouter from './routes/hashtag';
import viewsRouter from './routes/views';
import { database } from './db/database';
import * as cookieParser from 'cookie-parser';


const app: express.Application = express();
database.sync();

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(cookieParser());
app.use('/', viewsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentRouter);
app.use('/api/hashtag', hashtagRouter);
app.use('/api/auth', authRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
