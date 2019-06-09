import * as express from 'express';
import fetch from 'node-fetch';
import { AuthenticateController } from '../controllers/AuthController/authenticate.controller';
import { upload } from '../db/storage';

const router = express.Router();
const authController = new AuthenticateController();
const passport = require('passport');
const auth = require('../auth/passport');

auth(passport);

router.post('/register', upload.fields([]), async (req, res) => {
    const user = req.body;
    const newUser = await authController.registation(user);
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

router.post('/login', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/login'
}), () => {
    console.log("we are in login callback");
});


router.post('/logout', (req, res) =>{
    req.logout();
	res.send(null);
});

export default router;
