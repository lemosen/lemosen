import {Customer} from "./Customer";
import {SkillTask} from "./SkillTask";
import {Expert} from "./Expert";
import {SkillLevelState} from "./enums";

/**
 * Created by gonglei on 2017/9/4.
 * 设计师新手任务实体
 */
export class DesignerNewbieTask {
    /**
     * ID
     */
    newbieId: number;

    /**
     * 创建时间
     */
    createTime: Date;

    skillTask: SkillTask;


    /**
     * 设计师
     */
    customer: Customer;

    /**
     * 专家
     */
    expert: Expert;

    skillLevelState: SkillLevelState;


    /**
     * 认证时间
     */
    certificationTime: Date;

    /**
     * 认证信息
     */
    certificationInfo: string;

    stateInfo: string;

    imageUrls: string[];

}
