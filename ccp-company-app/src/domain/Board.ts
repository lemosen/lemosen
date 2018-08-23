/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Topic} from "./Topic";

/**
 * *
 * 版块实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
export class Board {

    //columns START
    /**
     *ID
     */
    boardId: number;
    /**
     * 版块名称
     */
    boardName: string;
    /**
     * 版块描述
     */
    description: string;
    /**
     * 创建时间
     */
    createTime: Date;

    /**
     * 启停用
     */
    enabled: boolean;
    /**
     * 排序
     */
    sortOrder: number;
    /**
     * 备注
     */

    remark: string;


    topics: Topic[];
    //columns END


}