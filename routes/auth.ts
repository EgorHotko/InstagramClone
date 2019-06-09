import * as express from 'express';
import fetch from 'node-fetch';
import { AuthenticateController } from '../controllers/AuthController/authenticate.controller';
import { createToken } from '../auth/JWT/jwtService';
import { createCookie } from '../auth/auth';
import { upload } from '../db/storage';

const router = express.Router();
const authController = new AuthenticateController();
const passport = require('passport');
//const authGoogle = require('../auth/google.auth');
//const authLocal = require('../auth/local.auth');
const auth = require('../auth/newauth');
//require('../auth/new2auth');

auth(passport);

router.post('/register', upload.fields([]), async (req, res) => {
    const user = req.body;
    const newUser = await authController.registation(user);
    // const tokenData = await createToken(newUser);
    // await res.setHeader('Instagram-Cookie', [createCookie(tokenData)]);
    await res.send(newUser);
});

router.get('/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    async (req, res) => {
        res.redirect('/');
    }
);

// router.post('/login', upload.fields([]), async (req, res) => {
//     const user = req.body;
//     const newUser = await authController.logginingIn(user);
//     const tokenData = await createToken(newUser);
//     console.log(tokenData);
//     await res.setHeader('Instagram-Cookie', [createCookie(tokenData)]);
//     await res.send(newUser); 
// });

router.post('/login', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/login'
}), () => {
    console.log("we are in login callback");
});

// router.post('/logout', (req, res) =>{
//     res.setHeader('Instagram-Cookie', ['Authorization=;Max-age=0']);
//     res.send(200);
// });

router.post('/logout', (req, res) =>{
    req.logout();
	res.send(null);
});

export default router;
