import * as express from 'express';
import { Config } from '../config';
import fetch from 'node-fetch';

const router = express.Router();


router.get('/', (req, res) => {
    res.render('mainPage');
});

router.get("/user/:id", async (req, res) =>{
    const userId = +req.params.id;
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

router.get('/post/:id', (req, res) => {
    res.render('postPage');
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