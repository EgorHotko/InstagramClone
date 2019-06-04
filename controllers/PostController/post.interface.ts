import { IPost } from "../../services/PostService/post.interfaces";


export interface IPostController{
    getPost(postId: number): Promise<IPost>;
    createPost(userId: number, newPost: IPost): Promise<void>;
    editPost(postId: number, newPostData: string): Promise<void>;
    deletePost(postId: number): Promise<void>;
}