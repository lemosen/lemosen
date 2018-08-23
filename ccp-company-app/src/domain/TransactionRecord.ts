/**
 * *
 * 交易记录实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {PayedMethod, TransactionType} from "./enums";

export abstract class TransactionRecord {

    //columns START
    /**
     *ID
     */
    recordId: number;


    /**
     * 交易类型
     */
    transactionType: TransactionType;
    /**
     * 支付方式
     */
    payedMethod: PayedMethod;
    /**
     * 交易价格(以平台方为准，流入平台为+，流出平台为-)
     */

    transactionPrice: number;
    /**
     * 创建时间
     */

    createTime: Date;

    /**
     * 总余额
     */
    countBalance: number;
    /**
     * 详细信息
     */
    detailContent: string;
    //columns END

    /*@NotNull
    private WithdrawalState withdrawalState;*/

    createYear: number;

    createMonth: number;

    createDay: number;

}
