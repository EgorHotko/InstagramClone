import { Hashtag, Post } from '../../../db/models/models';
import { IHashtag, IHashtagDal } from '../hashtag.interfaces';
import { IPost } from '../../PostService/post.interfaces';

export class HashtagDal implements IHashtagDal{
    private Hashtag = Hashtag;
    private Post = Post;

    constructor(){}

    public async addPostToHashtag(postId: number, hashtagText: string): Promise<void>{
        const hashtag = await this.Hashtag.findOne({
            where: {text: hashtagText}
        });
        const post = await this.Post.findOne({
            where: {id: postId}
        });
        await hashtag.addPost(post);
    }

    public async getPostsByHashtagText(hashtagText: string): Promise<IPost[]>{
        const hashtag = await this.Hashtag.findOne({
            where: {text: hashtagText}
        });
        const posts = await hashtag.getPosts();
        return posts;
    }

    public async getHashtagByHashtagText(hashtagText: string): Promise<IHashtag>{
        const hashtag = await this.Hashtag.findOne({
            where: {text: hashtagText}
        });
        return hashtag;
    }

    public async create(newHashtag: IHashtag): Promise<IHashtag>{
        const hashtag = await this.Hashtag.create({
            text: newHashtag.text
        });
        return hashtag;
    }

    public async isHashtagExisted(hashtagText: string): Promise<boolean>{
        const hashtag = this.Hashtag.findOne({
            where: {text: hashtagText}
        });
        if(hashtag == null){
            return false;
        } else{
            return true;
        }
    }
}
