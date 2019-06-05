import { IPost } from '../../services/PostService/post.interfaces';

export interface IHashtagController{
    addPostToHashtag(hashtagText: string, postId: number): Promise<void>;
    getPostsByHashtag(hashtagText: string): Promise<IPost[]>;
}
