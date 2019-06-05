import { CommentService } from "../../services/CommentService/comment.service";
import { IComment } from "../../services/CommentService/comment.interfaces";
import { ICommentController } from "./comment.interface";



export class CommentController implements ICommentController{
    private commentService: CommentService;

    constructor(){
        this.commentService = new CommentService();
    }

    async getComments(postId: number): Promise<IComment[]>{
        return await this.commentService.getCommentsByPostId(postId);
    }

    async createComment(newComment: IComment): Promise<void>{
        await this.commentService.createComment(newComment);
    }

    async deleteComment(commentId: number): Promise<void>{
        await this.commentService.deleteCommentById(commentId);
    }
}