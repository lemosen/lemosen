/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Demand} from "./Demand";
import {Skill} from "./Skill";

/**
 * *
 * 任务类别
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class DemandCategory {


    //columns START
    /**
     * ID
     */
    categoryId: number;
    /**
     * 分类名称
     */
    categoryName: string;
    /**
     * 启用，停用
     */
    enabled: boolean;

    /**
     * 排序号
     */
    sortOrder: number;

    /**
     * 摘要
     */
    summary: string;

    /**
     * 是否为热门分类
     */
    hot: boolean; // 默认为热门分类

    /**
     * 备注
     */
    remark: string;

    demands: Demand[];

    skills: Skill[];
    //columns END

    //任务分类编码
    categoryCode: string;

    check:boolean;

}