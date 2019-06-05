
export interface IComment{
    text: string;
    date: Date;
    userId: number;
    postId: number;
}

export interface ICommentDal{
    getByPostId(postId: number): Promise<IComment[]>;
    deleteById(commentId: number): Promise<void>;
    create(newComment: IComment): Promise<void>;
    isCommentExisted(commentId: number): Promise<boolean>;
}

export interface ICommentService{
    getCommentsByPostId(postId: number): Promise<IComment[]>;
    createComment(newComment: IComment): Promise<void>;
    deleteCommentById(commentId: number): Promise<void>;
}