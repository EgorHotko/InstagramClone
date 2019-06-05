import * as express from 'express';
import { CommentController } from '../controllers/CommentController/comment.controller';

const router = express.Router();
const commentController = new CommentController();

router.get('/post/:postId', async (req, res) => {
    const postId: number = +req.params.postId;
    const comments = await commentController. getComments(postId);
    res.send(comments);
});

router.post('/', async (req, res) => {
    const newComment = req.body;
    await commentController.createComment(newComment);
    await res.send("Comment created");
});

router.delete('/:id', async (req, res) => {
    const commentId = req.params.id;
    await commentController.deleteComment(commentId);
    await res.send("Comment deleted");
});

export default router;
