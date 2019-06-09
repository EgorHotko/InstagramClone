import * as bcrypt from 'bcrypt';

export async function comparePassword(userpassword: string, dbpassword: string): Promise<boolean>{
    return await bcrypt.compare(userpassword, dbpassword);
}

export async function hashPassword(userpassword): Promise<string>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(userpassword, salt);
}
 