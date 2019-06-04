import * as express from 'express';

const router = express.Router();

router.get('/:id', async (req, res) => {
    const postId: number = req.params.id;
    res.send("Some user");
});

router.post('/', async (req, res) => {
    const newPost = req.body;
    res.send("User Created");
});

router.put('/:id', async (req, res) => {
    const newPost = req.body;
    res.send("User Edited");
});

router.delete('/:id', async (req, res) => {
    const newPost = req.body;
    res.send("User Deleted");
});

export default router;