

export interface IPost{
    id?: number;
    photo: string;
    text?: string;
    date?: Date;
}

export interface IPostDal {
    getById(postId: number): Promise<IPost>;
    getLastPosts(): Promise<IPost[]>;
    getByUserId(userId: number): Promise<IPost[]>;
    create(userId: number, newPost: IPost): Promise<IPost>;
    editById(postId: number, newPostData: string): Promise<void>;
    deleteById(postId: number): Promise<void>;
    isPostExisted(postId: number): Promise<boolean>;
}

export interface IPostService {
    getPostById(postId: number): Promise<IPost>;
    getLastPosts(): Promise<IPost[]>;
    getPostsByUserId(userId: number): Promise<IPost[]>
    createPost(userId: number, newPost: IPost): Promise<IPost>;
    editPostById(userId: number,newPostData: string): Promise<void>;
    deletePostById(postId: number): Promise<void>;
}
