/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {InviteReviewId} from "./InviteReviewId";
import {DemandState, InviteState} from "./enums";
import {Demand} from "./Demand";
import {Expert} from "./Expert";

/**
 * *
 * 专家邀请实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class InviteReview {


    /**
     * ID
     */
    id: InviteReviewId;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 邀请状态
     */
    inviteState: InviteState;
    /**
     * 任务
     */
    demand: Demand;
    /**
     * 专家
     */
    expert: Expert;

    hasComment: boolean;

    overallComment: number;

    demandId: number;

    demandName: string;

    demandBudgetPrice: number;

    demandSummary: string;

    companyName: string;

    demandState: DemandState;

    imageUrls:string[];
    /**
     * 前台页面用于选中
     * @type {boolean}
     */
    check:boolean=false;

    evaluateContent:string;
}