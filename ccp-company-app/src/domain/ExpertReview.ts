/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Demand} from "./Demand";
import {Expert} from "./Expert";

/**
 * *
 * 专家评审实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class ExpertReview {


    //columns START
    /**
     * ID
     */
    reviewId: number;
    /**
     * 所属需求任务
     */
    demand: Demand;
    /**
     * 专家
     */
    expert: Expert;
    /**
     * 标星
     */
    starMark: number;
    /**
     * 评审内容
     */
    reviewContent: string;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 是否通过
     */
    pass: boolean;
    //columns END

}