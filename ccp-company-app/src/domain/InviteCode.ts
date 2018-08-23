/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Skill} from "./Skill";

/**
 * *
 * 邀请码实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
export class InviteCode {

    //columns START
    /**
     * ID
     */
    codeId: number;
    /**
     * 邀请码，机器随机生成
     */
    inviteCode: string;
    /**
     * 专家姓名
     */
    expertName: string;
    /**
     * 手机
     */
    mobile: string;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 是否已经使用
     */
    used: boolean;

    /**
     * 是否已经使用注册
     */
    registered: boolean;
    /**
     * 创建时间
     */
    createTime: Date;


    /**
     * 备注
     */
    remark: string;
    //columns END

    skillIds: number[];

    skills: Skill[];


}