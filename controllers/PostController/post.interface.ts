import { IPost } from "../../services/PostService/post.interfaces";


export interface IPostController{
    getPost(postId: number): Promise<IPost>;
    getLastPosts(): Promise<IPost[]>;
    getPostsByUserId(userId: number): Promise<IPost[]>;
    createPost(userId: number, newPost: IPost): Promise<IPost>;
    editPost(postId: number, newPostData: string): Promise<void>;
    deletePost(postId: number): Promise<void>;
}
