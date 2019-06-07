import * as express from 'express';
import { PostController } from '../controllers/PostController/post.contoller';
import { upload } from '../db/storage';

const router = express.Router();
const postController = new PostController();

router.get('/:id', async (req, res) => {
    const postId: number = +req.params.id;
    const post = await postController.getPost(postId);
    res.send(post);
});

router.get('/user/:id', async (req, res) => {
    const userId: number = +req.params.id;
    const posts = await postController.getPostsByUserId(userId);
    res.send(posts);
})

router.post('/user/:userId', upload.single('photo'), async (req, res) => {
    const filename = req["file"].originalname;
    const userId = +req.params.userId;
    const newPost = {...req.body, photo: filename, date: new Date(Date.now()).toString()};
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
