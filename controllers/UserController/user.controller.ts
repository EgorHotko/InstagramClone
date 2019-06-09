import { UserService } from "../../services/UserService/user.service";
import { IUser } from "../../services/UserService/user.interfaces";
import { IUserController } from "./user.inteface";

export class UserController implements IUserController{
    private userService: UserService;
    
    constructor(){
        this.userService = new UserService();
    }

    async getUser(userId: number): Promise<IUser>{
        return await this.userService.getUserById(userId);
    }

    async getUserByEmail(userEmail: string): Promise<IUser>{
        return await this.userService.getUserByEmail(userEmail);
    }

    async createUser(newUser: IUser): Promise<IUser>{
        return await this.userService.createUser(newUser);
    }

    async editUser(userId: number, newUserData: IUser): Promise<void>{
        await this.userService.editUserById(userId, newUserData);
    }

    async deleteUser(userId: number): Promise<void>{
        await this.userService.deleteUserById(userId);
    }
}
