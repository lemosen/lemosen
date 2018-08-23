/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Bid} from "./Bid";
import {Contract} from "./Contract";
import {CustomerEvaluate} from "./CustomerEvaluate";
import {Appeal} from "./Appeal";
import {Company} from "./Company";
import {DemandCategory} from "./DemandCategory";
import {Audited, DemandState} from "./enums";
import {ExpertReview} from "./ExpertReview";
import {Subtask} from "./Subtask";
import {SkillLevel} from "./SkillLevel";
import {InviteReview} from "./InviteReview";

/**
 * *
 * 任务实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
export class Demand {

    //columns START
    /**
     * ID
     */
    demandId: number;
    /**
     * 发包企业
     */
    company: Company;
    /**
     * 需求任务分类
     */
    demandCategory: DemandCategory;
    /**
     * 需求任务名称
     */

    demandName: string;
    /**
     * 摘要信息
     */

    summary: string;
    /**
     * 详细信息
     */

    detailInfo: string;
    /**
     * 項目周期(天）
     */
    demandCycle: number;
    /**
     * 创建时间
     */

    createTime: Date;

    /**
     * 发布任务时间
     */
    biddingTime: Date;

    /**
     * 中标时间
     */
    biddedTime: Date;
    /**
     * 竞标截止时间
     */
    abortDate: Date;
    /**
     * 是否支付保证金，1表示未支付，2表示已经支付了保证金，默认未支付
     */
    bondPayed: number;  //默认未支付

    /**
     * 预算价格
     */
    budgetPrice: number;

    /**
     * 成交合同价格
     */
    dealPrice: number;

    /**
     * 成交合同周期
     */
    dealCycle: number;

    /**
     * 合同签订时间
     */
     contractTime:Date;

    /**
     * 任务开始时间
     */
    startTime: Date;

    /**
     * 完成时间
     */
    finishTime: Date;

    /**
     * 投标人数
     */
    bidAmount: number;

    /**
     * 当前状态
     */
    demandState: DemandState;

    /**
     * 评价
     */

    evaluateEnabled: boolean;

    /**
     * 评价内容
     */

    evaluateContent: string;

    /**
     * 星级
     */
    starMark: number;

    //态度
    attitude: number;

    //响应度
    responsibility: number;

    //综合评分
    overallComment: number;

    /**
     * 流程状态ware
     */
    progressRate: string;

    filePath: string;

    /**
     * 指定软件
     */
    specifiedSoftware: string;

    // 中止原因
    cancelReason: string;

    /**
     * 任务审核状态
     */
    audited: Audited;

    abortTimeStamp: number;

    /**
     * 是否首页推荐
     */
    recommend: boolean;

    bids: Bid[];
    expertReviews: ExpertReview[];

    subtasks: Subtask[];

    contracts: Contract[];

    skillLevels: SkillLevel[];

    customerEvaluates: CustomerEvaluate[];

    companyEvaluates: CustomerEvaluate[];

    inviteReviews: InviteReview[];

    appeals: Appeal[];
    //columns END

    /**
     * 中标对象
     */
    bid: Bid;


    imageUrls: string[];

    levelIds: number[];

    check:boolean=false;

    expertEnabled:boolean;

    inviteEvaluates:InviteReview[];


}