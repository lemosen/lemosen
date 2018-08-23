import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TransactionServiceProvider} from "../../providers/transaction-service/transaction-service";
import {PageQuery} from "../../common/PageQuery";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {CompanyTransaction} from "../../domain/CompanyTransaction";
import {DebtPayable} from "../../domain/DebtPayable";

/**
 * Generated class for the BillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bills',
    templateUrl: 'bills.html',
})
export class BillsPage {
    query: PageQuery = new PageQuery();
    debtQuery: PageQuery = new PageQuery();
    withdraws: CompanyTransaction[] = [];
    debtPayables:DebtPayable[]=[];
    billType: string = 'withdraws';

    constructor(public navCtrl: NavController, public navParams: NavParams, public transactionServiceProvider: TransactionServiceProvider) {
        this.query.pushParamsRequests('companyId', CompanyServiceProvider.getLoginCompany().companyId);
        this.debtQuery.pushParamsRequests('companyId', CompanyServiceProvider.getLoginCompany().companyId);
    }


    ionViewWillEnter() {
        this.transactionServiceProvider.listCompanyTransactions(this.query).then(data => {
            this.withdraws = data.content;
            this.query.covertResponses(data);
        })
        this.transactionServiceProvider.listDebtPayables(this.debtQuery).then(data => {
            this.debtPayables = data.content;
            this.debtQuery.covertResponses(data);
        })
    }


    doRefresh(refresher) {
        if(this.billType=='withdraws'){
            this.query.resetRequests();
            this.transactionServiceProvider.listCompanyTransactions(this.query).then(
                data => {
                    this.withdraws = data.content;
                    this.query.covertResponses(data);
                    refresher.complete();
                },
                err => refresher.complete()
            );
        }else {
            this.debtQuery.resetRequests();
            this.transactionServiceProvider.listDebtPayables(this.debtQuery).then(
                data => {
                    this.debtPayables = data.content;
                    this.debtQuery.covertResponses(data);
                    refresher.complete();
                },
                err => refresher.complete()
            );
        }

    }


    doInfinite(infiniteScroll) {
        if(this.billType=='withdraws') {
            if (!this.query.isLast()) {
                this.query.plusPage();
                this.transactionServiceProvider.listCompanyTransactions(this.query).then(
                    data => {
                        this.withdraws = this.withdraws.concat(data.content);
                        this.query.covertResponses(data);
                        infiniteScroll.complete();
                    },
                    err => infiniteScroll.complete()
                );
            } else {
                infiniteScroll.complete();
            }
        }else{
            if (!this.debtQuery.isLast()) {
                this.debtQuery.plusPage();
                this.transactionServiceProvider.listDebtPayables(this.debtQuery).then(
                    data => {
                        this.debtPayables = this.debtPayables.concat(data.content);
                        this.debtQuery.covertResponses(data);
                        infiniteScroll.complete();
                    },
                    err => infiniteScroll.complete()
                );
            } else {
                infiniteScroll.complete();
            }
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BillsPage');
    }

}
