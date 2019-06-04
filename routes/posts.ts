import * as express from 'express';
import { PostController } from '../controllers/PostController/post.contoller';

const router = express.Router();
const postController = new PostController();

router.get('/:id', async (req, res) => {
    const postId: number = +req.params.id;
    const post = await postController.getPost(postId);
    res.send(post);
});

router.post('/user/:userId', async (req, res) => {
    const userId = +req.params.userId;
    const newPost = req.body;
    await postController.createPost(userId, newPost);
    await res.send("Post created");
});

router.put('/:id', async (req, res) => {
    const postId = req.params.id;
    const newPostData = req.body.text;
    await postController.editPost(postId, newPostData)
    await res.send("Post edited");
});

router.delete('/:id', async (req, res) => {
    const postId = req.params.id;
    await postController.deletePost(postId);
    await res.send("Post deleted");
});

export default router;