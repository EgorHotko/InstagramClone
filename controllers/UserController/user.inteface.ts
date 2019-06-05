import { IUser } from "../../services/UserService/user.interfaces";


export interface IUserController{
    getUser(userId: number): Promise<IUser>;
    createUser(newUser: IUser): Promise<void>;
    editUser(userId: number, newUserData: IUser): Promise<void>;
    deleteUser(userId: number): Promise<void>;
}
