import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {PageQuery} from "../../common/PageQuery";
import {DesignerSkillLevelForm} from "../../form/DesignerSkillLevelForm";
import {CustomerSkillLevel} from "../../domain/CustomerSkillLevel";

/*
 Generated class for the SkillServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class SkillServiceProvider extends HttpService {

    constructor(public http: HttpClient, public alertCtrl: AlertController, public storage: Storage) {
        super(http, alertCtrl);
    }

    /**
     * 查询设计师技能等级申请记录
     * @param query
     * @returns {Promise<any>}
     */
    listCustomerSkillLevels(query: PageQuery): Promise<any> {
        return this.post("/skill/listCustomerSkillLevels.do", query.toJsonString());
    }

    /**
     * 查询设计师已有技能等级列表
     * @returns {Promise<any>}
     */
    listCustomerSkillLevelsPass(customerId): Promise<any> {
        const params = new HttpParams().set("customerId", customerId);
        return this.get("/skill/listCustomerSkillLevelsPass.do", params);
    }

    /**
     * 查询技能等级详情
     * @returns {Promise<any>}
     */
    viewCustomerSkillLevel(dslId): Promise<any> {
        const params = new HttpParams().set("dslId", dslId);
        return this.get("/skill/viewCustomerSkillLevel.do", params);
    }

    /**
     * 申请技能
     */
    toAddDesignerSkillLevel(): Promise<any> {
        return this.get("/skill/addDesignerSkillLevel.do");
    }

    /**
     * 提交技能申请
     */
    saveCustomerSkillLevel(designerSkillLevelForm: DesignerSkillLevelForm): Promise<any> {
        return this.post("/skill/saveCustomerSkillLevel.do", designerSkillLevelForm);
    }

    /**
     * 待审核的技能等级列表
     * customerId
     * @return
     */
    listDesignerLevelSkills(query:PageQuery):Promise<any>{
        return this.post("/skill/listDesignerLevelSkills.do",query.toJsonString());
    }

    /**
     * 对设计师的技能等级申请进行鉴定
     * @param customerSkillLevel
     * @return
     */
    certifyDesignerLevelSkill(customerSkillLevel:CustomerSkillLevel):Promise<any>{
        let body = JSON.stringify(customerSkillLevel);
        return this.post("/skill/certifyDesignerLevelSkill.do",body);
    }

    /**
     * 根据技能获得技能等级列表
     */
    listSkillLevelsBySkill(skillId){
        const params = new HttpParams().set("skillId",skillId);
        return this.get("/skill/listSkillLevelsBySkill.do",params);
    }

    /**
     * 根据技能获得技能等级列表
     */
    listSkillsByDemandCategory(categoryId){
        const params = new HttpParams().set("categoryId",categoryId);
        return this.get("/skill/listSkillsByDemandCategory.do",params);
    }
}
