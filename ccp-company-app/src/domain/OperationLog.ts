/**
 * *
 * 操作日志实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

import {User} from "./User";
import {OperateType} from "./enums";

export class OperationLog {

    //columns START
    /**
     *ID
     */
    logId: number;
    /**
     * 平台用户
     */
    user: User;
    /**
     * 操作类型
     */

    operateType: OperateType;
    /**
     * 方法名
     */
    methodName: String;
    /**
     * 输入参数
     */
    argNames: String;
    /**
     * 输出
     */
    returning: String;


    /**
     * 创建时间
     */

    createTime: Date;
    //columns END

}