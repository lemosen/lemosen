import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";
import {Contract} from "../../domain/Contract";
import {DemandStateForm} from "../../form/DemandStateForm";
import {Storage} from "@ionic/storage";

/*
 Generated class for the ContractServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ContractServiceProvider extends HttpService {

    constructor(public http: HttpClient, public alertCtrl: AlertController, public storage: Storage) {
        super(http, alertCtrl);
    }

    /**
     * 获取用户头像名称
     * @param demandId
     * @returns {Promise<any>}
     */
    getContactUserInfo(sender:string): Promise<any> {
        const params = new HttpParams().set("sender", sender);
        return this.get('/contact/getContactUserInfo.do', params);
    }

    /**
     * 查看合同列表
     * @param demandId
     * @returns {Promise<any>}
     */
    listContracts(demandId): Promise<any> {
        const params = new HttpParams().set("demandId", demandId);
        return this.get('/contract/listContracts.do', params);
    }

    /**
     * 查看合同
     * @param contractId
     * @returns {Promise<Contract>}
     */
    viewContract(contractId):Promise<Contract>{
        const params = new HttpParams().set("contractId",contractId);
        return this.get('/contract/viewContract.do',params);
    }

    /**
     * 确认合同
     * @param {DemandStateForm} demandStateForm
     * @returns {Promise<any>}
     */
    reviewContract(demandStateForm:DemandStateForm):Promise<any>{
        let body=JSON.stringify(demandStateForm);
        return this.post("/contract/reviewContract.do",body);
    }

}
