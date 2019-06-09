import * as express from 'express';
import { Config } from '../config';
import fetch from 'node-fetch';
import { Promise } from "bluebird";
import * as passport from 'passport';
import { authMiddleware } from '../middlewares/authmiddleware';

const router = express.Router();


router.get('/', authMiddleware, async (req, res) => {
    const currentUser = await req.user;
    const lastPostsRes = await fetch('http://localhost:3000/api/posts');
    const lastPosts = await lastPostsRes.json();
    await Promise.all(lastPosts.map( async (post) => {
        const UserRes = await fetch(`http://localhost:3000/api/users/${post.userId}`);
        const user = await UserRes.json();
        post.user = user;
        return post;
    }));
    await res.render('mainPage', {currentUser: currentUser.dataValues, posts: lastPosts});
});

router.get("/user/:id", authMiddleware, async (req, res) =>{
    const userId: number = +req.params.id;
    const currentUser = await req.user;
    try{
        const userRes = await fetch(`http://localhost:3000/api/users/${userId}`);
        const user = await userRes.json();
        const postsRes = await fetch(`http://localhost:3000/api/posts/user/${userId}`);
        const posts = await postsRes.json();
        await res.render('userPage', {user: user, posts: posts, currentUser: currentUser.dataValues});
    } catch(err){
        throw new Error(err);
    }
});

router.get('/hashtag/:hashtag', authMiddleware, async (req, res) => {
    const hashtag: string = req.params.hashtag;
    const currentUser = await req.user;
    const postsRes = await fetch(`http://localhost:3000/api/hashtags/${hashtag}/posts`);
    const posts = await postsRes.json();
    await Promise.all(posts.map( async (post) => {
        const UserRes = await fetch(`http://localhost:3000/api/users/${post.userId}`);
        const user = await UserRes.json();
        post.user = user;
        return post;
    }));
    await res.render('mainPage', {currentUser: currentUser.dataValues, posts: posts});
});

router.get('/post/:id', authMiddleware, async (req, res) => {
    const postId: number = +req.params.id;
    const currentUser = await req.user; 
    const postRes = await fetch(`http://localhost:3000/api/posts/${postId}`);
    const post = await postRes.json();
    const userRes = await fetch(`http://localhost:3000/api/users/${post.userId}`);
    const user = await userRes.json();
    const commentsRes = await fetch(`http://localhost:3000/api/comments/post/${postId}`);
    let comments = await commentsRes.json();
    await Promise.all(comments.map( async (comment) => {
        const userRes = await fetch(`http://localhost:3000/api/users/${comment.userId}`);
        const user = await userRes.json();
        comment.user = user;
        return comment;
    }));
    res.render('postPage', {user: user, post: post, comments: comments, currentUser: currentUser.dataValues});
});

router.get('/register', (req, res) => {
    res.render('registerPage');
});

router.get('/login', (req, res) => {
    res.render('logInPage');
});

router.get('/add/post', authMiddleware, async (req, res) => {
    const currentUser = await req.user;
    res.render('addingPostPage', {currentUser: currentUser.dataValues});
});

export default router;