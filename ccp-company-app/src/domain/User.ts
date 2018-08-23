/**
 * *
 * 后台用户实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {OperationLog} from "./OperationLog";
import {Role} from "./Role";
import {Honour} from "./enums";

export class User {
    //columns START
    /**
     *ID
     */
    userId: number;
    /**
     * 用户名
     */
    userName: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 真实姓名
     */
    realName: string;
    /**
     * 性别
     */
    sex: boolean;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 手机号码
     */
    mobile: string;
    /**
     * 是否启用
     */
    enabled: boolean;
    /**
     * 上次登录时间
     */
    lastTime: Date;
    /**
     * 备注
     */
    remark: string;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 角色名称
     */
    roleNames: string;
    /**
     * 包含角色
     */
    roleIds: number[];


    /**
     * 头衔
     */
    honour: Honour;

    /**
     * 头像图片路径
     */
    photograph: string;

    roles: Role[];

    //columns END
    operationLogs: OperationLog[];

}
