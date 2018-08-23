/**
 * 积分实体
 */
import {ScoreRuleType} from "./enums";

export class Score {

    /**
     * ID
     */
    scoreId: number;
    /**
     * 规则编码
     */
    ruleType: ScoreRuleType;

    /**
     * 积分值
     */
    scoreValue: number;
    /**
     * 积分时间
     */
    scoreTime: Date;
    /**
     * 帐号
     */
    accountName: string;

}
