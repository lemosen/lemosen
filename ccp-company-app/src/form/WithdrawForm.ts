/**
 * Created by Administrator on 2017/9/18.
 * 提现表单
 */
export class WithdrawForm {

    companyId: number;

    withdrawalAccount: number;

    debtBalance: number;//应收款

    applyBalance: number;//正在审批的款

    customerId: number;

    expertId: number;
    /**
     * 提现理由
     */
    detailContent: string;


}
