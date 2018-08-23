/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */

import {ChannelPosition, ChannelStyle} from "./enums";
import {Programa} from "./Programa";

/**
 * *
 *CMS内容频道实体类
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class ArticleChannel {


    //columns START
    /**
     *ID
     */
    channelId: number;
    /**
     * 频道编码
     */
    channelCode: string;
    /**
     * 关键字
     */

    channelKey: string;
    /**
     * 频道标题
     */
    channelTitle: string;
    /**
     * 频道风格
     */
    channelStyle: ChannelStyle;

    /***
     * 频道位置
     */
    channelPosition: ChannelPosition;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 描述
     */
    description: string;
    /**
     * 启停状态
     */
    enabled: boolean;
    /**
     * 搜索引擎关键字
     */
    seoKey: string;
    /**
     * 搜索引擎标题
     */
    seoTitle: string;
    /**
     * 序号
     */
    sortOrder: number;
    /**
     * SEO描述
     */
    seoDescription: string;

    /**
     * 频道列表
     */
    programas: Programa[];
    //columns END

}