/**
 * *
 *
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {DemandCategory} from "./DemandCategory";
import {SkillLevel} from "./SkillLevel";
import {Expert} from "./Expert";

export class Skill {

    //columns START
    /**
     *ID
     */
    skillId: number;
    /**
     * 所属需求分类，允许为空
     */
    demandCategory: DemandCategory;
    /**
     * 技术名称
     */
    skillName: string;
    /**
     * 备注
     */
    remark: string;
    //columns END
    skillLevels: SkillLevel[];
    experts: Expert[];

    check:boolean;

    selectSkillLevelName:string;
}