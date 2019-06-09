import { IHashtagDal, IHashtagService } from './hashtag.interfaces';
import { HashtagDal } from './DAL/hashtag.dal';
import { IPost } from '../PostService/post.interfaces';


export class HashtagService implements IHashtagService{
    private hashtagDal: IHashtagDal;

    constructor(){
        this.hashtagDal = new HashtagDal();
    }

    public async addPostToHashtag(hashtagText: string, postId: number): Promise<void>{
        if(await this.hashtagDal.isHashtagExisted(hashtagText)){
            this.hashtagDal.addPostToHashtag(postId, hashtagText);
        } else{
            await this.hashtagDal.create({text: hashtagText});
            await this.hashtagDal.addPostToHashtag(postId, hashtagText);
        }
    }

    public async getPostsByHashtag(hashtagText: string): Promise<IPost[]>{
        const posts = await this.hashtagDal.getPostsByHashtagText(hashtagText);
        return posts;
    }

    public async deletePostFromHashtags(postId: number): Promise<void>{
        await this.hashtagDal.deletePost(postId);
    }
}
