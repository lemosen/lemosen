/**
 * *
 * 子任务实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {Demand} from "./Demand";
import {SubtaskChange} from "./SubtaskChange";
import {SubtaskComment} from "./SubtaskComment";

export class Subtask {


    //columns START
    /**
     *ID
     */
    subtaskId: number;

    /**
     * 所属需求任务
     */
    demand: Demand;
    /**
     * 子任务·名称
     */
    subtaskName: string;
    /**
     * 截止时间
     */
    overdueDate: Date;
    /**
     * 详细内容
     */
    detailInfo: string;
    /**
     * 设计师提交子任务完成说明
     */
    completeInstruction: string;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 任务状态
     */
    complete: boolean;

    /**
     * 附件
     */
    attachmentUrl: string;

    //columns END
    subtaskChanges: SubtaskChange[];
    subtaskComments: SubtaskComment[];


}