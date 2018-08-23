import {Customer} from "./Customer";
import {SkillTask} from "./SkillTask";
import {SkillLevel} from "./SkillLevel";
import {Expert} from "./Expert";
import {SkillLevelState, TaskType} from "./enums";

/**
 * Created by gonglei on 2017/9/4.
 * 设计师技能等级实体
 */

export class CustomerSkillLevel {
    /**
     * ID
     */
    dslId: number;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 本次技能鉴定绑定的技能题
     */
    skillTask: SkillTask;

    /**
     * 技能等级
     */
    skillLevel: SkillLevel;

    /**
     * 设计师
     */
    customer: Customer;

    /**
     * 专家
     */
    expert: Expert;

    /**
     * 优秀
     */
    excellent: boolean;


    taskType: TaskType;

    /**
     * 技能状态
     */
    skillLevelState: SkillLevelState;

    /**
     * 认证时间
     */
    certificationTime: string;

    /**
     * 申请信息
     */
    applyInfo: string;

    /**
     * 认证信息
     */
    certificationInfo: string;


}
