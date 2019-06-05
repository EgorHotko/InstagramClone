import { Config } from "../../config";
import { IUser } from "../../services/UserService/user.interfaces";
import * as jwt from 'jsonwebtoken';

export interface ITokenData {
    token: string;
    expiresIn: number;
}

interface DataStoredInToken {
    id: number;
}

export function createToken(user: IUser): ITokenData{
    const expiresIn = 60 * 60;
    const secret = Config.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
        id: user.id,
      };
    return {
        expiresIn,
        token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    };
}

export async function verifyToken(token){
    return await jwt.verify(token, Config.JWT_SECRET) as DataStoredInToken;
}