/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Programa} from "./Programa";
import {Author} from "./Author";

/**
 * *
 *CMS文章实体类
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
export class Article {

    //columns START
    /**
     *ID
     */
    articleId: number;
    /**
     *频道
     */
    programa: Programa;
    /**
     * 文章编号
     */
    articleCode: string;
    /**
     * 文章标题
     */
    articleTitle: string;
    /**
     * 作者
     */
    author: Author;
    /**
     * 内容
     */
    content: string;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 启停状态
     */
    enabled: boolean;
    /**
     * 图片路径
     */
    picPath: string;
    /**
     * 发布时间
     */
    publishDate: Date;
    /**
     * 备注
     */
    private String
    remark: string;
    //columns END

}