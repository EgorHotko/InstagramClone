import { IComment, ICommentDal, ICommentService } from "./comment.interfaces";
import { CommentDal } from './DAL/comment.dal';


export class CommentService implements ICommentService{
    private commentDal: ICommentDal;

    constructor(){
        this.commentDal = new CommentDal();
    }

    public async getCommentsByPostId(postId: number): Promise<IComment[]>{
        const comments = await this.commentDal.getByPostId(postId);
        if(comments.length == 0){
            throw new Error("Comment not found");
        } else{
            return comments;
        }
    }

    public async createComment(newComment: IComment): Promise<void>{
        await this.commentDal.create(newComment);
    }

    public async deleteCommentById(commentId: number): Promise<void>{
        if(await this.commentDal.isCommentExisted(commentId)){
            await this.commentDal.deleteById(commentId);
        } else{
            throw new Error("Comment not found");
        }
    }
}
