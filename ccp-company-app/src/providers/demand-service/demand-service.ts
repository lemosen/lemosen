import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";
import {Demand} from "../../domain/Demand";
import {PageQuery} from "../../common/PageQuery";
import {Storage} from "@ionic/storage";
import {DemandStateForm} from "../../form/DemandStateForm";
import {EvaluateForm} from "../../form/EvaluateForm";
import {WinBidForm} from "../../form/WinBidForm";
import {RecommendDesignerForm} from "../../form/RecommendDesignerForm";

/*
 Generated class for the DemandServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class DemandServiceProvider extends HttpService {

    constructor(public http: HttpClient, public alertCtrl: AlertController, public storage: Storage) {
        super(http, alertCtrl);
    }


    /**
     * 任务列表显示
     *
     * @return
     */
    demands(query: PageQuery): Promise<any> {
        return this.post("/demand/demands.do", query.toJsonString());
    }


    listDemandCategories(): Promise<any> {
        return this.get("/demand/listDemandCategories.do");
    }

    /**
     * qy分页显示 正在招标的任务
     * @param {PageQuery} query
     * @returns {Promise<any>}
     */
    listBiddingDemands(query: PageQuery): Promise<any> {
        return this.post('/demand/listBiddingDemands.do', query.toJsonString());
    }

    /**
     * qy查看投标设计师列表
     * @param {PageQuery} query
     * @returns {Promise<any>}
     */
    listDemandBids(query: PageQuery): Promise<any> {
        return this.post('/demand/listDemandBids.do', query.toJsonString());
    }


    /**
     * 任务详情显示
     *
     * @param demandId
     * @return
     */
    detail(demandId): Promise<Demand> {
        const params = new HttpParams().set("demandId", demandId);
        return this.get("/demand/detail.do", params);
    }


    /**
     * 列出执行任务列表
     *
     * @return
     */
    listExecutingDemands(query: PageQuery): Promise<any> {
        return this.post("/demand/listExecutingDemands.do", query.toJsonString());
    }

    /**
     * 企业确认完成任务
     * @param demandStateForm
     */
    completeDemand(demandStateForm: DemandStateForm): Promise<any> {
        return this.post("/demand/completeDemand.do", demandStateForm);
    }

    /**
     * 查询专家评审列表
     */
    getExpertReviews(demandId): Promise<any> {
        const params = new HttpParams().set("demandId", demandId);
        return this.get("/demand/getExpertReviews.do", params);
    }

    /**
     * 完成的任务列表
     */
    listFinishedDemands(query: PageQuery): Promise<any> {
        return this.post("/demand/listFinishedDemands.do", query.toJsonString());
    }

    /**
     * 分页显示发布的任务
     */
    listAuditDemands(query: PageQuery): Promise<any> {
        return this.post("/demand/listAuditDemands.do", query.toJsonString());
    }


    /**
     * 保存任务第一步
     * @return
     */
    createDemand(demand: Demand): Promise<any> {
        return this.post("/demand/createDemand.do", demand);
    }

    /**
     * 保存草稿OR提交审核
     */
    updateDemand(demand: Demand): Promise<any> {
        return this.post("/demand/updateDemand.do", demand);
    }

    /**
     * 列出企业所有可申诉任务
     */
    getBidsByCompanyId(companyId): Promise<any> {
        const params = new HttpParams().set("companyId", companyId);
        return this.get("/demand/getBidsByCompanyId.do", params);
    }

    /**
     * 保存设计师的任务评价
     * @return
     */
    saveDesignerEvaluate(evaluateForm: EvaluateForm): Promise<any> {
        return this.post("/demand/saveDesignerEvaluate.do", evaluateForm);
    }

    /**
     * 保存专家的任务评价
     */
    saveExpertEvaluate(evaluateForm: EvaluateForm): Promise<any> {
        return this.post("/demand/saveExpertEvaluate.do", evaluateForm);
    }

    /**
     * 邀请设计师投标
     * @return ResponseResult
     */
    inviteDesignerForBid(recommendDesignerForm: RecommendDesignerForm): Promise<any> {
        return this.post("/demand/inviteDesignerForBid.do", recommendDesignerForm);
    }

    /**
     * 设置为中标
     * @return
     */
    winDesignerBid(winBidForm: WinBidForm): Promise<any> {
        return this.post("/demand/winDesignerBid.do", winBidForm);
    }

    /**
     * 发布中标公示
     * @param publicityForm
     */
    publicityBid(demandStateForm: DemandStateForm): Promise<any> {
        return this.post("/demand/publicityBid.do", demandStateForm);
    }


    /**
     * 取消中标
     * @return
     */
    cancelBid(demandStateForm: DemandStateForm): Promise<any> {
        return this.post("/demand/cancelBid.do", demandStateForm);
    }

    getWinBid(demandId): Promise<any> {
        const params = new HttpParams().set("demandId", demandId);
        return this.get("/demand/getWinBid.do", params);
    }

    /**
     * 获得专家的列表
     * @return
     */
    listExperts(query:PageQuery):Promise<any>{
        return this.post("/demand/listExperts.do",query.toJsonString());
    }

    /**
     * 邀请专家
     * @return
     */
    inviteExperts(demandId,expertId):Promise<any>{
        const params = new HttpParams().set("demandId",demandId).set("expertId",expertId);
        return this.get("/demand/inviteExperts.do",params);
    }

    /**
     * 取消
     * @param demandId
     * @param expertId
     * @returns {Promise<any>}
     */
    removeInviteExpert(demandId,expertId):Promise<any>{
        const params = new HttpParams().set("demandId",demandId).set("expertId",expertId);
        return this.get("/demand/removeInviteExpert.do",params);
    }

    /**
     * 查询专家邀请记录
     */
     getInviteExpert(demandId):Promise<any>{
        const params = new HttpParams().set("demandId",demandId);
        return this.get("/demand/getInvites.do",params);
    }

    /**
     * 根据任务Id 获取任务中包含的设计师以及企业 专家
     */
    listAllUsersByDemand(demandId):Promise<any>{
        const params = new HttpParams().set("demandId",demandId);
        return this.get("/demand/listAllUsersByDemand.do",params);
    }
    /**
     * 根据企业id列出所有任务
     */
    listAllDemandsByCompany(companyId):Promise<any>{
        const params = new HttpParams().set("companyId",companyId);
        return this.get("/demand/listAllDemandsByCompany.do",params);
    }
}
