import { IUser } from "../../services/UserService/user.interfaces";


export interface IUserController{
    getUser(userId: number): Promise<IUser>;
    getUserByEmail(userEmail: string): Promise<IUser>;
    createUser(newUser: IUser): Promise<IUser>;
    editUser(userId: number, newUserData: IUser): Promise<void>;
    deleteUser(userId: number): Promise<void>;
}
