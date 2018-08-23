/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Appeal} from "./Appeal";
import {CompanyEvaluate} from "./CompanyEvaluate";
import {CompanyTransaction} from "./CompanyTransaction";
import {Authed, CompanyScope, Honour, PayedMethod} from "./enums";
import {Demand} from "./Demand";

/**
 * *
 * 企业实体
 *
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class Company {


    //columns START
    /**
     * ID
     */
    companyId: number;
    /**
     * 帐号
     */

    accountName: string;
    /**
     * 企业名称
     */

    companyName: string;
    /**
     * 手机
     */

    mobile: string;
    /**
     * 邮箱
     */

    email: string;
    /**
     * 负责人姓名
     */

    masterName: string;
    /**
     * 摘要信息
     */

    summary: string;
    /**
     * 企业说明
     */

    introduce: string;
    /**
     * 创建时间
     */

    createTime: Date;
    /**
     * 密码
     */

    password: string;
    /**
     * 发标数量
     */
    demandAmount: number;
    /**
     * 成交数量
     */
    dealDemandAmount: number;

    /**
     * 交易总额
     */
    /* @Max(10)*/
    dealPrice: number;

    /**
     * 认证
     */
    authed: Authed;

    /**
     * 法人身份信息
     */
    legalImg: string;
    /**
     * 营业执照注册码
     */

    licenseCode: string;
    /**
     * 营业执照所在地
     */
    licenseAddress: string;

    /**
     * 营业执照
     */
    licenseImg: string;

    /**
     * 停启
     */
    enabled: boolean;

    /**
     * 是否推荐前台显示
     */
    recommend: boolean;

    /**
     * 企业logo路径
     */
    logoUrl: string;
    /**
     * 公司经营范围
     */
    companyScope: CompanyScope;
    /**
     * 公司常用地址
     */
    companyAddress: string;

    /**
     * 企业用户余额
     */
//    companyBalance:number;

    /**
     * 支付宝账号
     */
    alipayAccount: string;

    /**
     * 支付方式
     */
    payedMethod: PayedMethod;

    /**
     * 企业头衔
     */
    honour: Honour;

    /**
     * 微信账号
     */
    openId: string;

    /**
     * 认证理由
     */
    authedReason: string;

    /**
     * 企业总余额
     */
    totalBalance: number;

    /**
     * 企业应付款
     */
    debitBalance: number;

    /**
     * 星级
     */
    starMark: number;

    /**
     * 最后登录时间
     */
    lastLoginTime: Date;

    /**
     * 经验
     */
    exp: number;
    /**
     * 积分
     */
    score: number;

    /**
     * 第一次完善信息
     */
    firstCompleteInfo: boolean;

    portraitUrl: string;

    demands: Demand[];

    appeals: Appeal[];

    companyEvaluates: CompanyEvaluate[];

    companyTransactions: CompanyTransaction[];


}