import {DemandState} from "../domain/enums";

/**
 * Created by microlink on 2017/9/8.
 * 任务状态表单
 */
export class DemandStateForm {
    //新手任务ID
    taskId: number;

    demandId: number;

    customerId: number;

    demandState: DemandState;

    stateInfo: string;

}
