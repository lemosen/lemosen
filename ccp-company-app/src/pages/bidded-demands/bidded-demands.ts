import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BidServiceProvider} from "../../providers/bid-service/bid-service";
import {PageQuery} from "../../common/PageQuery";
import {Bid} from "../../domain/Bid";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the BiddedDemandsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bidded-demands',
    templateUrl: 'bidded-demands.html',
})
export class BiddedDemandsPage {
    query: PageQuery = new PageQuery();
    bids: Bid[] = [];
    imgUrl:string=AppConfig.imgUrl;
    constructor(public navCtrl: NavController, public navParams: NavParams, public bidServiceProvider: BidServiceProvider, public customerServiceProvider: CustomerServiceProvider) {
        this.query.pushParamsRequests('customerId', CompanyServiceProvider.getLoginCompany().companyId);
    }

    ionViewWillEnter() {
        this.initData();
    }

    private initData() {
        this.query.resetRequests();
        this.bidServiceProvider.listBiddeds(this.query).then(data => {
            this.bids = data.content;
            this.query.covertResponses(data);
        })
    }

    openDemandDetail(demandId) {
        this.navCtrl.push('BiddedDemandDetailPage', {"demandId": demandId});
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiddedDemandsPage');
    }
    doRefresh(refresher ) {
        this.query.resetRequests();
        this.bidServiceProvider.listBiddeds(this.query).then(
            data => {
                this.bids = data.content;
                this.query.covertResponses(data);
                refresher.complete();
            },
            err => refresher.complete()
        );
    }


    doInfinite(infiniteScroll ) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.bidServiceProvider.listBiddeds(this.query).then(
                data => {
                    this.bids = this.bids.concat(data.content);
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
