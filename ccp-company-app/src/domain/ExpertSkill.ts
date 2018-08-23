/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {ExpertSkillId} from "./ExpertSkillId";
import {Expert} from "./Expert";
import {Skill} from "./Skill";

/**
 * *
 * 专家技能
 *
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class ExpertSkill {


    /**
     * ID
     */
    id: ExpertSkillId;
    /**
     * 专家
     */
    expert: Expert;
    /**
     * 所属技能
     */
    skill: Skill;


}