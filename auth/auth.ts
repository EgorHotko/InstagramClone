import * as bcrypt from 'bcrypt';
import { ITokenData } from './JWT/jwtService';

export async function comparePassword(userpassword: string, dbpassword: string): Promise<boolean>{
    return await bcrypt.compare(userpassword, dbpassword);
}

export async function hashPassword(userpassword): Promise<string>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(userpassword, salt);
}

export function createCookie(tokenData: ITokenData): string{
    return `Authorization=${tokenData.token}; HttpOnly: false; Max-Aage=${tokenData.expiresIn}`
} 