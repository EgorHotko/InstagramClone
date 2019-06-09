import { IPost } from '../PostService/post.interfaces';

export interface IHashtag{
    text: string;
}

export interface IHashtagDal{
    getHashtagByHashtagText(hashtagText: string): Promise<IHashtag>;
    create(newHashtag: IHashtag): Promise<IHashtag>;
    deletePost(postId: number): Promise<void>;
    isHashtagExisted(hashtagText: string): Promise<boolean>;
    addPostToHashtag(postId: number, hashtagText: string): Promise<void>;
    getPostsByHashtagText(hashtagText: string): Promise<IPost[]>
}

export interface IHashtagService{
    addPostToHashtag(hashtagText: string, postId: number): Promise<void>;
    getPostsByHashtag(hashtagText: string): Promise<IPost[]>;
    deletePostFromHashtags(postId: number): Promise<void>;
}
