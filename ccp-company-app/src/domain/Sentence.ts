/**
 * Created by gonglei on 2017/10/9.
 * 网站内容
 */
import {SentenceType} from "./enums";

export class Sentence {
    /**
     * ID
     */
    sentId: number;
    /**
     * 内容编码
     */
    sentenceCode: string;
    /**
     * 内容名称
     */
    sentenceName: string;
    /**
     * 内容类型
     */
    sentenceType: SentenceType;
    /**
     * 备注
     */
    remark: string;
    /**
     * 内容
     */
    content: string;
    /**
     * 最大长度
     */
    maxLength: number;

}
