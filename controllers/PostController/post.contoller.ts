import { PostService } from "../../services/PostService/post.service";
import { IPostController } from "./post.interface";
import { IPost } from "../../services/PostService/post.interfaces";


export class PostController implements IPostController{
    private postService: PostService;
    
    constructor(){
        this.postService = new PostService();
    }

    async getLastPosts(): Promise<IPost[]>{
        return await this.postService.getLastPosts();
    }

    async getPost(postId: number): Promise<IPost>{
        return await this.postService.getPostById(postId);
    }

    async getPostsByUserId(userId: number): Promise<IPost[]>{
        return await this.postService.getPostsByUserId(userId);
    }

    async createPost(userId: number, newPost: IPost): Promise<void>{
        await this.postService.createPost(userId, newPost);
    }

    async editPost(postId: number, newPostData: string): Promise<void>{
        await this.postService.editPostById(postId, newPostData);
    }

    async deletePost(postId: number): Promise<void>{
        await this.postService.deletePostById(postId);
    }
}
