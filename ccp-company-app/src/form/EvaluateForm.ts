import {Demand} from "../domain/Demand";

/**
 * Created by Administrator on 2017/9/20.
 * 评价表单
 */
export class EvaluateForm {


    customerId: number;

    companyId: number;

    expertId: number;
    /**
     * 所属任务
     */
    demand: Demand;
    /**
     * 标星
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


}
