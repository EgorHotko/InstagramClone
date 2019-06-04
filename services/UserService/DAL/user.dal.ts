import { User } from '../../../db/models/models';
import { IUser, IUserDal } from '../user.interfaces';
import * as fs from 'fs';

export class UserDal implements IUserDal{
    private User = User;

    constructor(){}

    public async getById(userId: number): Promise<IUser>{
        const user = await this.User.findOne({
            where: {id: userId}
        });
        return user;
    }

    public async create(newUser: IUser): Promise<void>{
        const photoPath = `C:\\Users\\exotk\\OneDrive\\Documents\\Photos\\Users\\`; // TODO: move to config file
        const user = await this.User.create({email: newUser.email,
            username: newUser.username,
            password: newUser.password,
            photo: photoPath});
        await fs.mkdirSync(photoPath + `${user.id}`);
    }

    public async deleteById(userId: number): Promise<void>{
        await this.User.destroy({
            where: {id: userId}
        }, { force: true });
    }

    public async editById(userId: number, newUserData: IUser): Promise<void>{
        const user = await this.User.findOne({
            where: {id: userId}
        });
        await user.update({username: newUserData.username,
            email: newUserData.email,
            password: newUserData.password});
    }

    public async isUserExisted(userId: number): Promise<boolean>{
        const user = await this.User.findOne({
            where: {id: userId}
        });
        if(user == null){
            return false;
        } else{
            return true;
        }
    }
}