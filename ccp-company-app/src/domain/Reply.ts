/**
 * *
 * 回复
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {Topic} from "./Topic";
import {Author} from "./Author";

export class Reply {

    //columns START
    /**
     *ID
     */
    replyId: number;
    /**
     * 内容
     */
    content: string;
    /**
     * 所属帖子
     */
    topic: Topic;

    /**
     * 所属帖子ID
     */
    topicId: number;
    /**
     * 作者
     */
    author: Author;
    /**
     * 创建时间
     */
    createTime: Date;
    //columns END

}