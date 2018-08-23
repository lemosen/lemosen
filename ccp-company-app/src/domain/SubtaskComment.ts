/**
 * *
 * 子任务评论
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {Subtask} from "./Subtask";
import {Author} from "./Author";

export class SubtaskComment {

    //columns START
    /**
     *ID
     */
    commentId: number;
    /**
     *所属子任务
     */
    subtask: Subtask;

    /**
     * 作者
     */
    author: Author;

    /**
     * 评论内容
     */
    commentContent: string;
    /**
     * 评论时间
     */
    createTime: Date;
    //columns END


}