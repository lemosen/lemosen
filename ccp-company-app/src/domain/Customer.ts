/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {CompanyEvaluate} from "./CompanyEvaluate";
import {Appeal} from "./Appeal";
import {Bid} from "./Bid";
import {CustomerTransaction} from "./CustomerTransaction";
import {CustomerEvaluate} from "./CustomerEvaluate";
import {Audited, Education, Honour} from "./enums";
import {DesignReviewed} from "./DesignReviewed";
import {CustomerSkillLevel} from "./CustomerSkillLevel";

/**
 * *
 * 设计师实体
 *
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class Customer  {


    //columns START

    /**
     * ID
     */
    customerId: number;

    /**
     * 帐号名称
     */
    accountName: string;
    /**
     * 设计师姓名
     */
    customerName: string;
    /**
     * 手机号码
     */
    mobile: string;
    /**
     * 邮箱
     */
    email: string;

    /**
     * 密码
     */
    password: string;

    /**
     * 简介
     */
    introduce: string;
    /**
     * 启用
     */

    enabled: boolean;
    /**
     * 审核
     */
    audited: Audited;


    /**
     * 生日
     */
    birthday: Date;
    /**
     * 身份证
     */
    idCardNo: string;
    /**
     * 身份证图片
     */
    idCardImg: string;

    /**
     * 支付宝账号
     */
    alipayAccount: string;

    /**
     * 微信账号
     */
    openId: string;

    /**
     * 性别
     */
    gender: boolean;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 审核时间
     */
    auditedTime: Date;

    /**
     * 投标任务数量
     */
    bidAmount: number;
    /**
     * 中标任务数量
     */
    joinBidAmount: number;
    /**
     * 完成任务数量
     */
    finishBidAmount: number;
    /**
     * 就业经历
     */
    exper: string;
    /**
     * 工作年限
     */
    period: Date;
    /**
     * 教育经历
     */
    education: Education;
    /**
     * 作品描述
     */
    introDucation: string;
    /**
     * 作品路径
     */
    productionUrl: string;

    /**
     * 审核信息
     */
    auditCause: string;

    /**
     * 设计师应收款
     */
    debtBalance: number;

    area: string;

    /**
     * 星级评价
     */
    starMark: number;

    /**
     * 经验值
     */
    exp: number;
    /**
     * 积分
     */
    score: number;

    /**
     * 头衔
     */
    honour: Honour;

    /**
     * 并发任务
     */
    loadBid: number;

    /**
     * 最后登录时间
     */
    lastLoginTime: Date;

    /**
     * 是否专家
     */
    isExpert: boolean;

    /**
     * 第一次完善信息
     */
    firstCompleteInfo: boolean;

    portraitUrl: string

    //columns END
    customerTransactions: CustomerTransaction[];
    customerEvaluates: CustomerEvaluate[];
    companyEvaluates: CompanyEvaluate[];
    appeals: Appeal[];
    bids: Bid[];
    designRevieweds: DesignReviewed[];
    customerSkillLevels: CustomerSkillLevel[];
    levelIds: number[];

}