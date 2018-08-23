import {Topic} from "./Topic";
import {Author} from "./Author";

export class ThumbUp {

    //columns START
    /**
     *ID
     */
    thumbId: number;

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

    status: boolean;
    //columns END


}