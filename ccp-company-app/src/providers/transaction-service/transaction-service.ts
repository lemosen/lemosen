import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {PageQuery} from "../../common/PageQuery";
import {WithdrawForm} from "../../form/WithdrawForm";

/*
 Generated class for the TransactionServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class TransactionServiceProvider extends HttpService {

    constructor(public http: HttpClient, public alertCtrl: AlertController, public storage: Storage) {
        super(http, alertCtrl);
    }

    /**
     * 提现记录
     * @param query tips:customerId
     * @returns {Promise<any>}
     */
    listWithdraws(query: PageQuery): Promise<any> {
        return this.post("/transaction/listWithdraws.do", query.toJsonString());
    }

    /**
     * 应收款列表
     * @param query tips:customerId
     * @returns {Promise<any>}
     */
    listDebtReceivables(query: PageQuery): Promise<any> {
        return this.post("/transaction/listDebtReceivables.do", query.toJsonString());
    }

    /**
     * 应付款列表
     * @param query tips:companyId
     * @returns {Promise<any>}
     */
    listDebtPays(query: PageQuery): Promise<any> {
        return this.post("/transaction/listDebtPays.do", query.toJsonString());
    }

    designerWithdrawalApply(withdrawForm: WithdrawForm): Promise<any> {
        return this.post("/transaction/designerWithdrawalApply.do", withdrawForm);
    }

    /**
     * 企业交易记录
     * @param query tips:companyId
     * @returns {Promise<any>}
     */
    listCompanyTransactions(query: PageQuery): Promise<any> {
        return this.post("/transaction/listCompanyTransactions.do", query.toJsonString());
    }

    /**
     * 企业交易付款记录
     * @param query tips:companyId
     * @returns {Promise<any>}
     */
    listDebtPayables(query: PageQuery): Promise<any> {
        return this.post("/transaction/listDebtPayables.do", query.toJsonString());
    }

}
