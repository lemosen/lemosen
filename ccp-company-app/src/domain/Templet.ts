/**
 * *
 * 模板实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {TempletType} from "./enums";

export class Templet {

    //columns START
    /**
     *ID
     */
    templetId: number;
    /**
     * 模板名称
     */
    templetName: string;
    /**
     * 模板类型
     */
    templetType: TempletType;
    /**
     * 备注
     */
    remark: string;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 版本号
     */
    version: number;
    /**
     * 启停用
     */
    enabled: boolean;
    //columns END


}