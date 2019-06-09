import { IUserDal, IUser, IUserService } from "./user.interfaces";
import { UserDal } from "./DAL/user.dal";


export class UserService implements IUserService{
    private userDal: IUserDal;

    constructor(){
        this.userDal = new UserDal();
    }

    public async getUserById(userId: number): Promise<IUser>{
        const user = await this.userDal.getById(userId);
        if(user == undefined){
            throw new Error("User not found");
        } else{
            return user;
        }
    }

    public async getUserByEmail(userEmail: string): Promise<IUser>{
        const user = await this.userDal.getByEmail(userEmail);
        return user;
    }

    public async getUserByUsername(username: string): Promise<IUser>{
        const user = await this.userDal.getByUsername(username);
        return user;
    }

    public async createUser(newUser: IUser): Promise<IUser>{
        return await this.userDal.create(newUser);
    }

    public async editUserById(userId: number,newUserData: IUser): Promise<void>{
        if(await this.userDal.isUserExisted(userId)){
            await this.userDal.editById(userId, newUserData);
        } else{
            throw new Error("User not found");
        }
    }

    public async deleteUserById(userId: number): Promise<void>{
        if(await this.userDal.isUserExisted(userId)){
            await this.userDal.deleteById(userId);
        } else{
            throw new Error("User not found");
        }
    }
}
