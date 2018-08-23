import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PageQuery} from "../../common/PageQuery";
import {AppConfig} from "../../app/AppConfig";
import {Demand} from "../../domain/Demand";
import {DemandState} from "../../domain/enums";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";

/**
 * Generated class for the WorkDemandsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-work-demands',
    templateUrl: 'work-demands.html',
})
export class WorkDemandsPage {
    query: PageQuery = new PageQuery();
    demands: Demand[] = [];
    imgUrl: string = AppConfig.imgUrl;

    constructor(public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider,public companyServiceProvider:CompanyServiceProvider) {
        this.query.pushParamsRequests('companyId', CompanyServiceProvider.getLoginCompany().companyId);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WorkDemandsPage');
    }

    ionViewWillEnter() {
        this.initData();
    }

    initData() {
        this.query.resetRequests();
        this.companyServiceProvider.getWorks(this.query).then(data => {
            // this.demands = data.content;
            this.demands = data;
            this.query.covertResponses(data);
        })

    }

    openDemandDetail(demand) {
        if (demand.demandState == DemandState[DemandState.EXECUTING] || demand.demandState == DemandState[DemandState.EXPERT_REVIEW] || demand.demandState == DemandState[DemandState.CONFIRM_COMPLETE]) {
            this.navCtrl.push('ExecutingDemandDetailPage', {"demandId": demand.demandId});
        } else if (demand.demandState == DemandState[DemandState.EDIT_CONTRACT] || demand.demandState == DemandState[DemandState.BIDDED] || demand.demandState == DemandState[DemandState.REVIEW_CONTRACT]
            || demand.demandState == DemandState[DemandState.CONFIRM_CONTRACT]) {
            this.navCtrl.push('BiddedDemandDetailPage', {"demandId": demand.demandId});
        } else {
            this.navCtrl.push('BiddingDemandDetailPage', {"demandId": demand.demandId});
        }
    }

    doRefresh(refresher) {
        this.query.resetRequests();
        this.companyServiceProvider.getWorks(this.query).then(
            data => {
                // this.demands = data.content;
                this.demands = data;
                this.query.covertResponses(data);
                refresher.complete();
            },
            err => refresher.complete()
        );
    }


    doInfinite(infiniteScroll) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.companyServiceProvider.getWorks(this.query).then(
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
