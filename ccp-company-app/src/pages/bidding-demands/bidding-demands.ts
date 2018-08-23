import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PageQuery} from "../../common/PageQuery";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {AppConfig} from "../../app/AppConfig";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {Demand} from "../../domain/Demand";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the BiddingDemandsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bidding-demands',
    templateUrl: 'bidding-demands.html',
})
export class BiddingDemandsPage {
    query: PageQuery = new PageQuery();
    demands: Demand[] = [];
    imgUrl:string=AppConfig.imgUrl;
    constructor(public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider, public customerServiceProvider: CustomerServiceProvider) {
        this.query.pushParamsRequests('companyId', CompanyServiceProvider.getLoginCompany().companyId);
    }

    ionViewWillEnter(){
        this.query.resetRequests();
        this.demandServiceProvider.listBiddingDemands(this.query).then(data => {
            this.demands = data.content;
            this.query.covertResponses(data);
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiddingDemandsPage');
    }

    openDemandDetail(demandId) {
        this.navCtrl.push('BiddingDemandDetailPage', {"demandId": demandId});
    }

    doRefresh(refresher) {
        this.query.resetRequests();
        this.demandServiceProvider.listBiddingDemands(this.query).then(
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
            this.demandServiceProvider.listBiddingDemands(this.query).then(
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
