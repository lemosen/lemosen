/**
 * *
 * 提现申请实体
 *
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {WithdrawalState} from "./enums";

export class WithdrawalApply {

    //columns START
    /**
     * ID
     */
    applyId: number;

    /**
     * 额度
     */
    margin: number;
    /**
     * 创建时间
     */
    createTime: Date;

    createYear: number;


    createMonth: number;
    /**
     * 审核状态
     */
    withdrawalState: WithdrawalState;
    /**
     * 详情
     */
    detailContent: string;


    /**
     * 审核理由
     */
    auditReason: string;

}
