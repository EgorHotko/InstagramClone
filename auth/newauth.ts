const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import { comparePassword, hashPassword } from './auth';
import { UserController } from '../controllers/UserController/user.controller';
const LocalStrategy = require('passport-local').Strategy;
const userController = new UserController();

module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        const user = userController.getUser(id);
        done(null, user);
    });
    passport.use("local", new LocalStrategy({
        usernameField: 'email',
    },
    async function(email, password, done) {
        const user = await userController.getUserByEmail(email);
        if(!user){
            return done(null, false, {message: 'Unknown User'});
        }
        if(await comparePassword(password, user.password)){
            return done(null, user);
        } else{
            return done(null, false, {message: 'Invalid password'});
        }
    }
    ));

    
    passport.use(new GoogleStrategy({
            clientID: "56585008905-k3as9f92v2d3fvslgo269lsj6v5q1qcq.apps.googleusercontent.com",
            clientSecret: "SfG6xSuvv098ClyujtfkDuTr",
            callbackURL: "http://localhost:3000/api/auth/google/callback"
        },
        async (token, refreshToken, profile, done) => {
           const user = await userController.getUserByEmail(profile.emails[0].value);
           if(Object.keys(user).length != 0){
            return done(null, user);
           } else {
                const password = await hashPassword(Math.random().toString(36).substr(2, 8));
                const newUser = userController.createUser({email: profile.emails[0].value, password: password});
                return done(null, newUser);
           }

        })
    );

    
};