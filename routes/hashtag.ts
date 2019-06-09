import * as express from 'express';
import { HashtagController } from '../controllers/HashtagController/hashtag.controller';

const router = express.Router();
const hashtagController = new HashtagController();

router.get('/:hashtag/posts', async (req, res) => {
    const hashtagText: string = req.params.hashtag;
    const posts = await hashtagController.getPostsByHashtag(hashtagText);
    res.send(posts);
});

router.post('/:hashtag', async (req, res) => {
    const hashtagText: string = req.params.hashtag;
    const post = req.body;
    await hashtagController.addPostToHashtag(hashtagText, post.id);
    await res.send("Post added to hashtag");
});

export default router;
