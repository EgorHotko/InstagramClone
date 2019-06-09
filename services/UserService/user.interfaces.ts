export interface IUser {
    id?: number;
    email: string;
    username?: string;
    password: string;
    photo?: string;
}

export interface IUserDal {
    getById(userId: number): Promise<IUser>;
    getByEmail(userEmail: string): Promise<IUser>;
    getByUsername(username: string): Promise<IUser>;
    create(newUser: IUser): Promise<IUser>;
    deleteById(userId: number): Promise<void>;
    editById(userId: number, newUserData: IUser): Promise<void>;
    isUserExisted(userId: number): Promise<boolean>;
    isUserExistedByEmail(userEmail: string): Promise<boolean>;
}

export interface IUserService {
    getUserById(userId: number): Promise<IUser>;
    getUserByEmail(userEmail: string): Promise<IUser>;
    getUserByUsername(username: string): Promise<IUser>;
    createUser(newUser: IUser): Promise<IUser>;
    editUserById(userId: number,newUserData: IUser): Promise<void>;
    deleteUserById(userId: number): Promise<void>;
}
