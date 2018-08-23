import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PageQuery} from "../../common/PageQuery";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {Demand} from "../../domain/Demand";

/**
 * Generated class for the FinishedDemandsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-finished-demands',
    templateUrl: 'finished-demands.html',
})
export class FinishedDemandsPage {

    query: PageQuery = new PageQuery();
    demands: Demand[] = [];
    imgUrl:string=AppConfig.imgUrl;
    constructor(public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider, public companyServiceProvider: CompanyServiceProvider) {
        this.query.pushParamsRequests('companyId', CompanyServiceProvider.getLoginCompany().companyId);
    }

    ionViewWillEnter(): void {
        this.initData();
    }

    private initData() {
        this.query.resetRequests();
        this.demandServiceProvider.listFinishedDemands(this.query).then(data => {
            this.demands = data.content;
            this.query.covertResponses(data);
        })
    }

    openDemandDetail(demandId) {
        this.navCtrl.push('FinishedDemandDetailPage', {"demandId": demandId});
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FinishedDemandsPage');
    }

    doRefresh(refresher) {
        this.query.resetRequests();
        this.demandServiceProvider.listFinishedDemands(this.query).then(
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
            this.demandServiceProvider.listFinishedDemands(this.query).then(
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
}
