import * as express from 'express';
import { CommentController } from '../controllers/CommentController/comment.controller';
import { upload } from '../db/storage';
import { MailController } from '../controllers/MailController/mail.controller';
import { UserController } from '../controllers/UserController/user.controller';
import { Promise } from "bluebird";

const mailController = new MailController();
const userController = new UserController();

const router = express.Router();
const commentController = new CommentController();

router.get('/post/:postId', async (req, res) => {
    const postId: number = +req.params.postId;
    const comments = await commentController.getComments(postId);
    res.send(comments);
});

router.post('/', upload.fields([]), async (req, res) => {
    const newComment = req.body;
    const usersNicknames = newComment.text.match(/\B@[a-z0-9_-]+/gi);
    await commentController.createComment(newComment);
    if(usersNicknames){
        const users = await Promise.all(usersNicknames.map(async (usernickname) => {
            const user = await userController.getUserByUsername(usernickname.substr(1));
            return user;
        }));
        if(users){
            users.map(user => mailController.sendMail(user, newComment));
        }
    }
    await res.send("Comment created");
});

router.delete('/:id', async (req, res) => {
    const commentId = req.params.id;
    await commentController.deleteComment(commentId);
    await res.send("Comment deleted");
});

export default router;
