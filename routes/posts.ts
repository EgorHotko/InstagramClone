import * as express from 'express';

const router = express.Router();

router.get('/:id', async (req, res) => {
    const postId: number = req.params.id;
    res.send("Some post");
});

router.post('/', async (req, res) => {
    const newPost = req.body;
    res.send("Created");
});

router.put('/:id', async (req, res) => {
    const newPost = req.body;
    res.send("Edited");
});

router.delete('/:id', async (req, res) => {
    const newPost = req.body;
    res.send("Deleted");
});

export default router;