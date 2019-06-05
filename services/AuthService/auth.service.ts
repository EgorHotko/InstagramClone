import { IUserDal, IUser } from "../UserService/user.interfaces";
import { UserDal } from '../UserService/DAL/user.dal';
import { comparePassword, hashPassword } from '../../auth/auth';


export class AuthService {
    private userDal: IUserDal;

    constructor(){
        this.userDal = new UserDal();
    }

    public async register(user: IUser): Promise<IUser>{
        if(await this.userDal.isUserExistedByEmail(user.email)){
            throw new Error('User already exists');
        } else{
            const hashedPassword = await hashPassword(user.password);
            const newUser = await this.userDal.create({...user, password: hashedPassword}); 
            newUser.password = undefined;
            return newUser;
        }
    }

    public async loginIn(userData: IUser): Promise<IUser>{
        const user = await this.userDal.getByEmail(userData.email);
        if(user){
            const isPasswordMatching = await comparePassword(userData.password, user.password);
            if(isPasswordMatching){
                user.password = undefined;
                return user;
            } else{
                throw new Error("Incorrect password");
            }
        } else{
            throw new Error("User not found");
        }
    }
}