import * as express from 'express';
import { UserController } from '../controllers/UserController/user.controller';
import { IUser } from '../services/UserService/user.interfaces';

const router = express.Router();
const userController = new UserController();

router.get('/:id', async (req, res) => {
    const userId: number = +req.params.id;
    const user = await userController.getUser(userId);
    user.password = undefined;
    await res.send(user);
});

router.get('/email/:email', async (req, res) => {
    const userEmail: string = req.params.email;
    const user = await userController.getUserByEmail(userEmail);
    if(user){
        user.password = undefined;
        await res.send(user);
    } else {
        await res.send({});
    }
});

router.post('/', async (req, res) => {
    const newUser = req.body;
    await userController.createUser(newUser);
    await res.send("User Created");
});

router.put('/:id', async (req, res) => {
    const userId: number = +req.params.id;
    const newUserData: IUser = req.body;
    await userController.editUser(userId, newUserData);
    await res.send("User Edited");
});

router.delete('/:id', async (req, res) => {
    const userId: number = +req.params.id;
    await userController.deleteUser(userId);
    await res.send("User Deleted");
});

export default router;
