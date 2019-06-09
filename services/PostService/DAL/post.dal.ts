import { IPost ,IPostDal } from "../post.interfaces";
import { Post, Comment } from '../../../db/models/models';
import { Config } from '../../../config';


export class PostDal implements IPostDal{
    private Post = Post;
    private Comment = Comment;

    constructor(){}

    public async getById(postId: number): Promise<IPost>{
        const post = await this.Post.findOne({
            where: {id: postId}
        });
        return post;
    }

    public async getLastPosts(): Promise<IPost[]>{
        const posts = await this.Post.findAll({
            limit: 10,
            order: [[ 'id', 'DESC' ]]
        });
        return posts;
    }

    public async getByUserId(userId: number): Promise<IPost[]>{
        const posts = await this.Post.findAll({
            where: {userId: userId}
        });
        return posts;
    }

    public async create(userId: number, newPost: IPost): Promise<void>{
        const photoPath = `${Config.PHOTOSPATH}\\${newPost.photo}`;
        const post = await this.Post.create({
            text: newPost.text,
            date: newPost.date,
            photo: photoPath,
            userId: userId});
    }

    public async deleteById(postId: number): Promise<void>{
        await this.Comment.destroy({
            where: {postId: postId}
        });
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
