import * as express from 'express';
import { UserController } from '../controllers/UserController/user.controller';
import { IUser } from '../services/UserService/user.interfaces';

const router = express.Router();
const userController = new UserController();

router.get('/:id', async (req, res) => {
    const userId: number = +req.params.id;
    const user = await userController.getUser(userId);
    await res.send(user);
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