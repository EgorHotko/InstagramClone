import { User } from '../../../db/models/models';
import { IUser, IUserDal } from '../user.interfaces';
import * as fs from 'fs';
import { Config } from '../../../config';

export class UserDal implements IUserDal{
    private User = User;

    constructor(){}

    public async getById(userId: number): Promise<IUser>{
        const user = await this.User.findOne({
            where: {id: userId}
        });
        return user;
    }

    public async getByEmail(userEmail: string): Promise<IUser>{
        const user = await this.User.findOne({
            where: {email: userEmail}
        });
        return user;
    }

    public async create(newUser: IUser): Promise<IUser>{
        if(!newUser.username){
            newUser.username = /[^@]+/.exec(newUser.email)[0];
        }
        const photoPath = Config.PHOTOSPATH;
        const user = await this.User.create({email: newUser.email,
            username: newUser.username,
            password: newUser.password,
            photo: photoPath});
        return user;
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

    public async isUserExistedByEmail(userEmail: string): Promise<boolean>{
        const user = await this.User.findOne({
            where: {email: userEmail}
        });
        if(user == null){
            return false;
        } else{
            return true;
        }
    }
}
