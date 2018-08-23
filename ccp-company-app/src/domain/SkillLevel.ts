/**
 * *
 * 技能等级实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {Skill} from "./Skill";
import {Demand} from "./Demand";
import {SkillTask} from "./SkillTask";
import {CustomerSkillLevel} from "./CustomerSkillLevel";

export class SkillLevel {


    //columns START
    /**
     *ID
     */
    levelId: number;

    /**
     * 所属技能
     */
    skill: Skill;
    /**
     * 等级名称
     */
    levelName: string;
    /**
     * 等级排序
     */

    sortOrder: number;
    /**
     * 详细信息
     */
    detailInfo: string;
    /**
     * 是否选中
     */
    selected: boolean;
    /**
     * 等级编码
     */
    levelCode: string;
    demands: Demand[];

    skillId:number;
    skillName:string;

    skillTasks: SkillTask[];
    customerSkillLevels: CustomerSkillLevel[];
    //columns END

    check:boolean=false;

}