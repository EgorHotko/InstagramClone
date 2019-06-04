import * as express from 'express';
import postsRouter from './routes/posts';
import usersRouter from './routes/users';
import { database } from './db/database';

// Create a new express application instance
const app: express.Application = express();
database.sync();

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});