import * as express from 'express';
import { PostController } from '../controllers/PostController/post.contoller';
import { HashtagController } from '../controllers/HashtagController/hashtag.controller';
import { upload } from '../db/storage';
import { IPost } from '../services/PostService/post.interfaces';
import fetch from 'node-fetch';

const router = express.Router();
const postController = new PostController();
const hashtagController = new HashtagController();

router.get('/', async (req, res) => {
    const posts: IPost[] = await postController.getLastPosts();
    res.send(posts);
})

router.get('/:id', async (req, res) => {
    const postId: number = +req.params.id;
    const post: IPost = await postController.getPost(postId);
    res.send(post);
});

router.get('/user/:id', async (req, res) => {
    const userId: number = +req.params.id;
    const posts: IPost[] = await postController.getPostsByUserId(userId);
    res.send(posts);
})

router.post('/user/:userId', upload.single('photo'), async (req, res) => {
    const filename = req["file"].originalname;
    const userId = +req.params.userId;
    const newPost = {...req.body, photo: filename, date: new Date(Date.now()).toString()};
    const hashtags = newPost.text.match(/\B\#\w\w+\b/g);
    const post = await postController.createPost(userId, newPost);
    if(hashtags){
        hashtags.map(async (hashtag) => {
            await hashtagController.addPostToHashtag(hashtag.substr(1), post.id);
        });
    }
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
