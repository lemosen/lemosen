/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Bid} from "./Bid";

/**
 * *
 * 应收款实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class DebtReceivable {


    //columns START
    /**
     * ID
     */
    debtId: number;

    /**
     * 标的
     */
    bid: Bid;

    /**
     * 年份
     */
    pcYear: number;

    /**
     * 月份
     */
    pcMonth: number;

    /**
     * 应收款
     */
    debtAccount: number;

    /**
     * 创建时间
     */
    createTime: Date;
    //columns END


}