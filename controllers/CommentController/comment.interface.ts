import { IComment } from '../../services/CommentService/comment.interfaces';

export interface ICommentController{
    getComments(postId: number): Promise<IComment[]>;
    createComment(newComment: IComment): Promise<void>;
    deleteComment(commentId: number): Promise<void>;
}
