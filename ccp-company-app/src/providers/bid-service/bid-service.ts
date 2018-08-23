import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";
import {PageQuery} from "../../common/PageQuery";
import {Bid} from "../../domain/Bid";
import {DemandStateForm} from "../../form/DemandStateForm";
import {ExpertReview} from "../../domain/ExpertReview";

/*
 Generated class for the BidServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class BidServiceProvider extends HttpService {

    constructor(public http: HttpClient, public alertCtrl: AlertController) {
        super(http, alertCtrl);
    }

    /**
     * 列出设计师所有可申诉任务
     */
    getBidsByDesignerId(customerId) {
        const params = new HttpParams().set("customerId", customerId);
        return this.get('/bid/getBidsByDesignerId.do', params);
    }

    /**
     * 已投标的任务
     * @param query  tip:customerId
     * @returns {Promise<any>}
     */
    listBiddings(query: PageQuery): Promise<any> {
        return this.post('/bid/listBiddings.do', query.toJsonString());
    }

    /**
     * 已投标的任务详情
     * @param query tip:demandId
     * @returns {Promise<any>}
     */
    viewBidding(demandId, customerId): Promise<any> {
        const params = new HttpParams().set('demandId', demandId).set("customerId", customerId);
        return this.get('/bid/viewBidding.do', params);
    }

    /**
     * 已中标的任务
     * @param query  tip:customerId
     * @returns {Promise<any>}
     */
    listBiddeds(query: PageQuery): Promise<any> {
        return this.post('/bid/listBiddeds.do', query.toJsonString());
    }


    /**
     * 已投标的任务详情
     * @param query tip:demandId
     * @returns {Promise<any>}
     */
    viewBidded(demandId, customerId): Promise<any> {
        const params = new HttpParams().set('demandId', demandId).set("customerId", customerId);
        return this.get('/bid/viewBidded.do', params);
    }

    /**
     * 进行中的任务
     * @param query  tip:customerId
     * @returns {Promise<any>}
     */
    listExecutings(query: PageQuery): Promise<any> {
        return this.post('/bid/listExecutings.do', query.toJsonString());
    }

    /**
     * 进行中的任务详情
     * @param query tip:demandId
     * @returns {Promise<any>}
     */
    viewExecuting(demandId, customerId): Promise<any> {
        const params = new HttpParams().set('demandId', demandId).set("customerId", customerId);
        return this.get('/bid/viewExecuting.do', params);
    }

    /**
     * 完成的任务
     * @param query  tip:customerId
     * @returns {Promise<any>}
     */
    listFinisheds(query: PageQuery): Promise<any> {
        return this.post('/bid/listFinisheds.do', query.toJsonString());
    }

    /**
     * 完成的任务详情
     * @param query tip:demandId
     * @returns {Promise<any>}
     */
    viewFinished(demandId, customerId): Promise<any> {
        const params = new HttpParams().set('demandId', demandId).set("customerId", customerId);
        return this.get('/bid/viewFinished.do', params);
    }

    /**
     * 邀请的任务
     * @param query  tip:customerId
     * @returns {Promise<any>}
     */
    listInviteDemands(query: PageQuery): Promise<any> {
        return this.post('/bid/listInviteDemands.do', query.toJsonString());
    }

    /**
     * 任务详情
     * @param query tip:demandId
     * @returns {Promise<any>}
     */
    viewDemandDetail(demandId): Promise<any> {
        const params = new HttpParams().set('demandId', demandId);
        return this.get('/bid/viewDemandDetail.do', params);
    }

    /**
     * 接受评审的任务
     * @param query  tip:customerId
     * @returns {Promise<any>}
     */
    listConfirmedDemands(query: PageQuery): Promise<any> {
        return this.post('/bid/listConfirmedDemands.do', query.toJsonString());
    }

    /**
     * 完成评审的任务
     * @param query  tip:customerId
     * @returns {Promise<any>}
     */
    listFinishedDemands(query: PageQuery): Promise<any> {
        return this.post('/bid/listFinishedDemands.do', query.toJsonString());
    }


    /**
     * 任务详情
     * @param query tip:demandId
     * @returns {Promise<any>}
     */
    viewDemandSubtasks(demandId): Promise<any> {
        const params = new HttpParams().set('demandId', demandId);
        return this.get('/bid/viewDemandSubtasks.do', params);
    }

    /**
     * invite-demand-detail use
     * @param demandId
     * @param customerId
     * @returns {Promise<any>}
     */
    joinInviteDemand(demandId, customerId): Promise<any> {
        const params = new HttpParams().set("demandId", demandId).set("customerId", customerId);
        return this.get('/bid/joinInviteDemand.do', params);
    }

    /**
     * invite-demand-detail use
     * @param demandId
     * @param customerId
     * @returns {Promise<any>}
     */
    refuseInviteDemand(demandId, customerId): Promise<any> {
        const params = new HttpParams().set("demandId", demandId).set("customerId", customerId);
        return this.get('/bid/refuseInviteDemand.do', params);
    }


    /**
     * 投标
     *
     * @param demandId
     * @param customer
     * @return
     */
    bidDemand(demandId, customerId): Promise<any> {
        const params = new HttpParams().set("demandId", demandId).set("customerId", customerId);
        return this.get("/bid/bidDemand.do", params);
    }


    /**
     * 设计师投标
     *
     * @param bid
     * @param locale
     * @return
     */
    designerBid(bid: Bid): Promise<any> {
        return this.post("/bid/designerBid.do", bid);
    }

    /**
     * 提交给专家会签
     * @param demandStateForm
     * @return
     */
    commitExpertReview(demandStateForm: DemandStateForm): Promise<any> {
        return this.post("/bid/commitExpertReview.do", demandStateForm);
    }

    /**
     * 保存专家会签
     * @param expertReview
     * @return
     */
    saveExpertReview(expertReview: ExpertReview): Promise<any> {
        return this.post("/bid/saveExpertReview.do", expertReview);
    }
}
