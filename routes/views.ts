import * as express from 'express';
import { Config } from '../config';
import fetch from 'node-fetch';
import { Promise } from "bluebird";

const router = express.Router();


router.get('/', (req, res) => {
    res.render('mainPage');
});

router.get("/user/:id", async (req, res) =>{
    const userId: number = +req.params.id;
    try{
        const userRes = await fetch(`http://localhost:3000/api/users/${userId}`);
        const user = await userRes.json();
        const postsRes = await fetch(`http://localhost:3000/api/posts/user/${userId}`);
        const posts = await postsRes.json();
        await res.render('userPage', {user: user, posts: posts});
    } catch(err){
        throw new Error(err);
    }
});

router.get('/post/:id', async (req, res) => {
    const postId: number = +req.params.id; 
    const postRes = await fetch(`http://localhost:3000/api/posts/${postId}`);
    const post = await postRes.json();
    const userRes = await fetch(`http://localhost:3000/api/users/${post.userId}`);
    const user = await userRes.json();
    const commentsRes = await fetch(`http://localhost:3000/api/comments/post/${postId}`);
    let comments = await commentsRes.json();
    let postComments = await Promise.all(comments.map( async (comment) => {
        const userRes = await fetch(`http://localhost:3000/api/users/${comment.userId}`);
        const user = await userRes.json();
        comment.user = user;
        return comment;
    }));
    res.render('postPage', {user: user, post: post, comments: postComments});
});

router.get('/register', (req, res) => {
    res.render('registerPage');
});

router.get('/login', (req, res) => {
    res.render('logInPage');
});

router.get('/add/post', (req, res) => {
    res.render('addingPostPage');
});

export default router;