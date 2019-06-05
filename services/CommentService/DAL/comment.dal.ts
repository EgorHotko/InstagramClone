import { Comment } from '../../../db/models/models';
import { IComment, ICommentDal } from '../comment.interfaces';

export class CommentDal implements ICommentDal{
    private Comment = Comment;

    constructor(){}

    public async getByPostId(postId: number): Promise<IComment[]>{
        const comments = await this.Comment.findAll({
            where: {postId: postId}
        });
        return comments;
    }

    public async deleteById(commentId: number): Promise<void>{
        await this.Comment.destroy({
            where: {id: commentId}
        });
    }

    public async create(newComment: IComment): Promise<void>{
        await this.Comment.create({
            text: newComment.text,
            date: newComment.date,
            userId: newComment.userId,
            postId: newComment.postId
        });
    }

    public async isCommentExisted(commentId: number): Promise<boolean>{
        const comment = this.Comment.findOne({
            where: {id: commentId}
        });
        if(comment == null){
            return false;
        } else{
            return true;
        }
    }
}
