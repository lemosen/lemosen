import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PageQuery} from "../../common/PageQuery";
import {Demand} from "../../domain/Demand";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";


/**
 * Generated class for the AuditDemandsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-audit-demands',
    templateUrl: 'audit-demands.html',
})
export class AuditDemandsPage {

    query: PageQuery = new PageQuery();
    demands: Demand[] = [];
    imgUrl: string = AppConfig.imgUrl;

    constructor(public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider, public companyServiceProvider: CompanyServiceProvider) {
        this.query.pushParamsRequests('companyId', CompanyServiceProvider.getLoginCompany().companyId);
    }

    ionViewWillEnter() {
        this.initData();
    }

    private initData() {
        this.query.resetRequests();
        this.demandServiceProvider.listAuditDemands(this.query).then(data => {
            this.demands = data.content;
            this.query.covertResponses(data);
        })
    }

    openDemandDetail(demandId) {
        this.navCtrl.push('AuditDemandDetailPage', {"demandId": demandId});
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiddedDemandsPage');
    }

    doRefresh(refresher) {
        this.query.resetRequests();
        this.demandServiceProvider.listAuditDemands(this.query).then(
            data => {
                this.demands = data.content;
                this.query.covertResponses(data);
                refresher.complete();
            },
            err => refresher.complete()
        );
    }


    doInfinite(infiniteScroll) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.demandServiceProvider.listAuditDemands(this.query).then(
                data => {
                    this.demands = this.demands.concat(data.content);
                    this.query.covertResponses(data);
                    infiniteScroll.complete();
                },
                err => infiniteScroll.complete()
            );
        } else {
            infiniteScroll.complete();
        }
    }

    addTask() {
        this.navCtrl.push('AddDemandPage');

    }

}
