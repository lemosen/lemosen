/**
 * *
 * 技能鉴定任务实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {DemandCategory} from "./DemandCategory";
import {Audited} from "./enums";
import {ExpertReview} from "./ExpertReview";
import {SkillLevel} from "./SkillLevel";
import {InviteReview} from "./InviteReview";

export class SkillTask {

    //columns START
    /**
     * ID
     */
    taskId: number;

//    private DemandState demandState;

    /**
     * 任务分类
     */
    demandCategory: DemandCategory;
    /**
     * 任务名称
     */
    taskName: string;
    /**
     * 摘要信息
     */
    summary: string;

    newbie: boolean;
    /**
     * 详细信息
     */
    detailInfo: string;
    /**
     * 完成周期(天）
     */
    demandCycle: number;
    /**
     * 创建时间
     */
    createTime: Date;

    /**
     * 任务开始时间
     */
    startTime: Date;

    /**
     * 完成时间
     */
    finishTime: Date;

    /**
     * 评价
     */
    evaluatEnabled: boolean;

    /**
     * 停启
     */
    enabled: boolean;

    /**
     * 评价内容
     */
    evaluateContent: string;

    /**
     * 任务审核状态
     */
    audited: Audited;


    expertReviews: ExpertReview[];


    skillLevels: SkillLevel[];

    inviteReviews: InviteReview[];
    //columns END


    imageUrls: string[];

    levelIds: number[];


}