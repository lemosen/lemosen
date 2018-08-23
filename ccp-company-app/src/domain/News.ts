/**
 * *
 * 新闻实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {NewsType} from "./NewsType";

export class News {

    //columns START
    /**
     *ID
     */
    newsId: number;
    /**
     * 新闻标题
     */
    newsTitle: string;

    /**
     * 作者
     */
    author: string;

    /**
     * 摘要
     */
    summary: string;

    /**
     * 新闻类型
     */
    newsType: NewsType;
    /**
     * 新闻内容
     */
    content: string;

    /**
     * 发布时间
     */
    publishTime: Date;

    /**
     * 创建时间
     */
    createTime: Date;

    /**
     * 浏览数
     */
    viewNum: number;

    /**
     * 是否启用
     */
    enabled: boolean;

    /**
     * 是否热门
     */
    hot: boolean;
    //columns END


}