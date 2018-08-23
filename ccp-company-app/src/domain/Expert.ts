/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Customer} from "./Customer";
import {ExpertReview} from "./ExpertReview";
import {InviteReview} from "./InviteReview";
import {Skill} from "./Skill";
import {SkillLevel} from "./SkillLevel";

/**
 * *
 * 专家
 *
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class Expert extends Customer {


    //columns START

    /**
     * 审核意见
     */
    auditingAdvise: string;

    inviteCode: string;

    /**
     * 是否具备技能鉴定权限
     */
    skillEnabled: boolean;


    /**
     * 推荐
     */
    recommend: boolean;


    //columns END
    expertReviews: ExpertReview[];
    inviteReviews: InviteReview[];
    skills: Skill[];
    skillLevels: SkillLevel[];

    skillIds: number[];


}