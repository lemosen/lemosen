import {Arbitrate} from "./Arbitrate";
import {Author} from "./Author";
import {Company} from "./Company";
import {Customer} from "./Customer";
import {Demand} from "./Demand";
import {AppealState} from "./enums";

export class Appeal {
    /**
     *ID
     */
    appealId: number;
    /**
     *设计师
     */
    customer: Customer;
    /**
     *企业
     */
    company: Company;
    /**
     * 任务ID
     */
    demand: Demand;
    /**
     * 申诉标题
     */
    appealTitle: string;
    /**
     * 申诉内容
     */
    appealContent: string;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 作者
     */
    author: Author;

    /**
     * 申诉状态
     */
    appealState: AppealState;

    /**
     * 仲裁信息
     */
    arbitrates: Arbitrate[]
}
