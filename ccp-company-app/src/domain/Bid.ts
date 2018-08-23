/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {BidId} from "./BidId";
import {Demand} from "./Demand";
import {Customer} from "./Customer";
import {DebtReceivable} from "./DebtReceivable";

/**
 * *
 * 标的实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
export class Bid {


    id: BidId;

    /**
     * 投标价
     */
    bidPrice: number;

    /**
     * 中标周期
     */
    bidCycle: number;

    /**
     * 详细信息
     */
    detailInfo: string;
    /**
     * 投标时间
     */
    createTime: Date;
    /**
     * 中标时间
     */
    biddedTime: Date;
    /**
     * 任务
     */
    demand: Demand;
    /**
     * 设计师
     */
    customer: Customer;

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

    /**
     * 中标通知
     */
    bidNotice: string;

    /**
     * 中标公示
     */
    bidPublicity: string;

    /**
     * 公示内容
     */
    bidPublicityState: boolean;

    /**
     * 是否中标
     */
    winBidding: boolean;

    debtReceivables: DebtReceivable[];


}