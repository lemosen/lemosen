/**
 * Created by Aidy_He on 16/3/10.
 * 规则条件
 */
import {RuleType} from "./enums";

export class ExpRule {

    /**
     * ID
     */
    ruleId: number;
    /**
     * 规则编码
     */
    ruleType: RuleType;

    /**
     * 规则值
     */
    ruleValue: number;
    /**
     * 备注
     */
    remark: string;


}
