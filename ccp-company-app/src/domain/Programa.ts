/**
 * *
 * 频道
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {Article} from "./Article";
import {ArticleChannel} from "./ArticleChannel";

export class Programa {

    //columns START
    /**
     *ID
     */
    programaId: number;
    /**
     *所属频道
     */
    articleChannel: ArticleChannel;
    /**
     * 创建时间
     */

    createTime: Date;
    /**
     * 栏目描述
     */
    description: string;
    /**
     * 状态
     */

    enabled: boolean;
    /**
     * 图片路径
     */

    operaImgPath: string;
    /**
     * 栏目编号
     */

    programaCode: string;
    /**
     * 栏目名称
     */
    programaName: string;
    /**
     * 推荐
     */

    recommend: boolean;
    /**
     * SEO描述
     */
    seoDescription: string;
    /**
     * SEO关键字
     */
    seoKey: string;
    /**
     * SEO标题
     */
    seoTitle: string;
    /**
     * 排序
     */

    sortOrder: number;
    //columns END
    articles: Article[];


}