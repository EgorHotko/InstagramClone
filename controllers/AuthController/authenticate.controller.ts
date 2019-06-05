import { IUser } from "../../services/UserService/user.interfaces";
import { AuthService } from '../../services/AuthService/auth.service';

export class AuthenticateController{
    
    private authService: AuthService;
    
    constructor(){
        this.authService = new AuthService();
    }
    
    async registation(user: IUser): Promise<IUser>{
        const newUser = await this.authService.register(user);
        return newUser;
    }

    async logginingIn(user: IUser): Promise<IUser>{
        const newUser = await this.authService.loginIn(user);
        return newUser;
    }
}
