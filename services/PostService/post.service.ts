import { IPost, IPostDal, IPostService } from "./post.interfaces";
import { PostDal } from './DAL/post.dal';



export class PostService implements IPostService{
    private postDal: IPostDal;

    constructor(){
        this.postDal = new PostDal();
    }

    public async getLastPosts(): Promise<IPost[]>{
        const posts: IPost[] = await this.postDal.getLastPosts();
        return posts;
    }

    public async getPostById(postId: number): Promise<IPost>{
        const post: IPost = await this.postDal.getById(postId);
        if(post == undefined){
            throw new Error("Post not found");
        } else{
            return post;
        }
    }

    public async getPostsByUserId(userId: number): Promise<IPost[]>{
        const posts: IPost[] = await this.postDal.getByUserId(userId);
        return posts;
    }

    public async createPost(userId: number, newPost: IPost): Promise<IPost>{
        return await this.postDal.create(userId, newPost);
    }

    public async editPostById(userId: number,newPostData: IPost): Promise<void>{
        await this.postDal.editById(userId, newPostData);
    }

    public async deletePostById(postId: number): Promise<void>{
        if(await this.postDal.isPostExisted(postId)){
            await this.postDal.deleteById(postId);
        } else{
            throw new Error("Post not found");
        }
    }
}
