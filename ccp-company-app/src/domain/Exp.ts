/**
 * 经验实体
 */
import {AuthorType, RuleType} from "./enums";

export class Exp {

    /**
     * ID
     */
    scoreId: number;
    /**
     * 规则编码
     */
    ruleType: RuleType;

    /**
     * 经验值
     */
    scoreValue: number;
    /**
     * 时间
     */
    scoreTime: Date;
    /**
     * 帐号
     */
    accountName: string;
    /**
     * 帐号类型
     */
    authorType: AuthorType;


}
