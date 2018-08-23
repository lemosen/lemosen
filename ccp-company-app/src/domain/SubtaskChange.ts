/**
 * *
 * 子任务变更实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {Subtask} from "./Subtask";

export class SubtaskChange {

    //columns START
    /**
     *ID
     */
    changeId: number;
    /**
     * 子任务名称
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
     * 变更说明
     */
    changeInfo: string;
    /**
     *所属子任务
     */
    subtask: Subtask;
    /**
     * 创建时间
     */
    createTime: Date;

    //columns END


}
