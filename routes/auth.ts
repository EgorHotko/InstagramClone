import * as express from 'express';
import { AuthenticateController } from '../controllers/AuthController/authenticate.controller';
import { createToken } from '../auth/JWT/jwtService';
import { createCookie } from '../auth/auth';

const router = express.Router();
const authController = new AuthenticateController();

router.post('/register', async (req, res) => {
    const user = req.body;
    const newUser = await authController.registation(user);
    const tokenData = await createToken(newUser);
    await res.setHeader('Instagram-Cookie', [createCookie(tokenData)]);
    await res.send(newUser);
});

router.post('/login', async (req, res) => {
    const user = req.body;
    const newUser = await authController.logginingIn(user);
    const tokenData = await createToken(newUser);
    await res.setHeader('Instagram-Cookie', [createCookie(tokenData)]);
    await res.send(newUser); 
});

router.post('/logout', (req, res) =>{
    res.setHeader('Instagram-Cookie', ['Authorization=;Max-age=0']);
    res.send(200);
})

export default router;
