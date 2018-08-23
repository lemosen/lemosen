import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AlertController} from "ionic-angular";
import {HttpService} from "../HttpService";
import {PageQuery} from "../../common/PageQuery";
import {Appeal} from "../../domain/Appeal";
import {Arbitrate} from "../../domain/Arbitrate";
import {Storage} from "@ionic/storage";

/*
 Generated class for the AppealServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class AppealServiceProvider extends HttpService {

    constructor(public http: HttpClient, public alertCtrl: AlertController, public storage: Storage) {
        super(http, alertCtrl);
    }

    /**
     * 查询申诉列表
     * @param query tips:customerId
     * @returns {Promise<any>}
     */
    listAppeals(query: PageQuery): Promise<any> {
        return this.post('/appeal/listAppeals.do', query.toJsonString());
    }

    /**
     * 分页显示企业发布的申诉
     * @return
     */

    listCompanyAppeals(query: PageQuery): Promise<any> {
        return this.post("/appeal/listCompanyAppeals.do", query.toJsonString());
    }

    viewAppeal(appealId): Promise<Appeal> {
        const params = new HttpParams().set("appealId", appealId);
        return this.get('/appeal/viewAppeal.do', params);
    }

    saveAppeal(appeal: Appeal): Promise<any> {
        let body = JSON.stringify(appeal);
        return this.post('/appeal/saveAppeal.do', body);
    }

    showArbitrateInfo(arbitrateId): Promise<Arbitrate> {
        const params = new HttpParams().set("arbitrateId", arbitrateId);
        return this.get('/appeal/showArbitrateInfo.do', params);
    }
}
