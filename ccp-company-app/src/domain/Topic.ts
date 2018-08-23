/**
 * *
 * 帖子实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {Author} from "./Author";
import {Board} from "./Board";
import {Reply} from "./Reply";

export class Topic {
    //columns START
    /**
     *ID
     */
    topicId: number;

    /**
     * 标题
     */
    topicName: string;
    /**
     * 内容
     */
    topicContent: string;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 点击量
     */
    clickRate: number;
    /**
     * 回复时间
     */
    replyTime: Date;
    /**
     * 点赞
     */
    praise: number;

    /**
     * 主题的回复数量
     */
    replyAmount: number;
    /**
     * r
     * 是否是精华推荐
     */
    recommend: boolean;

    /**
     * 是否在前台显示
     */
    showTopic: boolean = true;
    /**
     * 作者
     */
    author: Author;
    /**
     * 所属版块
     */
    board: Board;
    //columns END
    replies: Reply[];

}