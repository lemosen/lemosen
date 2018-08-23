/**
 * 积分规则实体
 */
import {ScoreRuleType} from "./enums";

export class ScoreRule {

    /**
     * ID
     */
    ruleId: number;
    /**
     * 规则编码
     */
    scoreRuleType: ScoreRuleType;

    /**
     * 规则值
     */
    ruleValue: number;
    /**
     * 备注
     */
    remark: string;

}
