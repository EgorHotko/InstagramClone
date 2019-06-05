import * as express from 'express';
import { AuthenticateController } from '../controllers/AuthController/authenticate.controller';

const router = express.Router();
const authController = new AuthenticateController();

router.post('/register', async (req, res) => {
    const user = req.body;
    const newUser = await authController.registation(user);
    await res.send(newUser);
});

router.post('/login', async (req, res) => {
    const user = req.body;
    const newUser = await authController.logginingIn(user);
    await res.send(newUser); 
})

export default router;
