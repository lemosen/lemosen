import {Company} from "./Company";
import {DebtPayType} from "./enums";

/**
 * 应付款实体
 */

export class DebtPayable {


    //columns START
    /**
     * ID
     */
    debtId: number;

    /**
     * 应付款
     */
    debtAccount: number;

    /**
     * 企业
     */
    company: Company;

    /**
     * 年份
     */
    pcYear: number;

    /**
     * 月份
     */
    pcMonth: number;

    /**
     * 当前月
     */
    currentBalance: number;


    /**
     * 创建时间
     */
    createTime: Date;

    payType:DebtPayType
    //columns END

}
