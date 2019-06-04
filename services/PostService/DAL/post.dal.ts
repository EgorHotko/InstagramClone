import { IPost ,IPostDal } from "../post.interfaces";
import { Post } from '../../../db/models/models';
import { Config } from '../../../config';


export class PostDal implements IPostDal{
    private Post = Post;

    constructor(){}

    public async getById(postId: number): Promise<IPost>{
        const post = await this.Post.findOne({
            where: {id: postId}
        });
        return post;
    }

    public async create(userId: number, newPost: IPost): Promise<void>{
        const photoPath = `${Config.PHOTOSPATH}${userId}`;
        const post = await this.Post.create({
            text: newPost.text,
            date: newPost.date,
            photo: photoPath,
            userId: userId});
        // TODO: create photo in photoPath + `${userId}` folder
    }

    public async deleteById(postId: number): Promise<void>{
        await this.Post.destroy({
            where: {id: postId}
        }, { force: true });
    }

    public async editById(postId: number, newPostData: string): Promise<void>{
        const post = await this.Post.findOne({
            where: {id: postId}
        });
        await post.update({text: newPostData});
    }

    public async isPostExisted(postId: number): Promise<boolean>{
        const user = await this.Post.findOne({
            where: {id: postId}
        });
        if(user == null){
            return false;
        } else{
            return true;
        }
    }
}