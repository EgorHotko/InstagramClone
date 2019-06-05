import { HashtagService } from '../../services/HashtagService/hashtag.service';
import { IPost } from '../../services/PostService/post.interfaces';
import { IHashtagController } from './hashtag.interface';


export class HashtagController implements IHashtagController{
    private hashtagService: HashtagService;

    constructor(){
        this.hashtagService = new HashtagService();
    }

    async addPostToHashtag(hashtagText: string, postId: number): Promise<void>{
        await this.hashtagService.addPostToHashtag(hashtagText, postId);
    }

    async getPostsByHashtag(hashtagText: string): Promise<IPost[]>{
        const posts = await this.hashtagService.getPostsByHashtag(hashtagText);
        return posts;
    }   

}
