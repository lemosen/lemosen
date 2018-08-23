/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Customer} from "./Customer";
import {Demand} from "./Demand";

/**
 * *
 * 设计师评价
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class CustomerEvaluate {


    //columns START
    /**
     * ID
     */
    evaluateId: number;
    /**
     * 被评价的设计师
     */
    customer: Customer;
    /**
     * 所属任务
     */
    demand: Demand;
    /**
     * 技能标星
     */
    starMark: number;


    //态度
    attitude: number;

    //响应度
    responsibility: number;
    /**
     * 评价内容
     */
    evaluateContent: string;
    /**
     * 创建时间
     */
    createTime: Date;

    //综合评分
    overallComment: number;
    //columns END

}