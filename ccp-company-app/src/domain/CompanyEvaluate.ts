/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */

import {Company} from "./Company";
import {Demand} from "./Demand";
import {Customer} from "./Customer";

/**
 * *
 * 企业评价实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
export class CompanyEvaluate {

    //columns START
    /**
     * ID
     */
    evaluateId: number;
    /**
     *
     */
    demand: Demand;
    /**
     * 评价的设计者
     */
    customer: Customer;

    /**
     * 被评价的企业
     */
    company: Company;
    /**
     * 标星
     */
    startMark: number;
    /**
     * 评价内容
     */

    evaluateContent: string;
    /**
     * 创建时间
     */

    createTime: Date;
    //columns END

}