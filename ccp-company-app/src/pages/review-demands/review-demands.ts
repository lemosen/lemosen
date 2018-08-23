import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {InviteReview} from "../../domain/InviteReview";
import {PageQuery} from "../../common/PageQuery";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {BidServiceProvider} from "../../providers/bid-service/bid-service";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the ReviewDemandsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-review-demands',
    templateUrl: 'review-demands.html',
})
export class ReviewDemandsPage {
    query: PageQuery = new PageQuery();
    inviteReviews: InviteReview[] = [];
    imgUrl:string=AppConfig.imgUrl;
    constructor(public navCtrl: NavController, public bidServiceProvider: BidServiceProvider, public customerServiceProvider: CustomerServiceProvider, public navParams: NavParams) {
        this.query.pushParamsRequests('companyId', CompanyServiceProvider.getLoginCompany().companyId);
    }

    ionViewWillEnter() {
        this.initData();
    }

    private initData() {
        this.query.resetRequests();
        this.bidServiceProvider.listConfirmedDemands(this.query).then(data => {
            this.inviteReviews = data.content;
            this.query.covertResponses(data);
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReviewDemandsPage');
    }

    openDemandDetail(demandId) {
        this.navCtrl.push('ReviewDemandDetailPage', {"demandId": demandId});
    }

    doRefresh(refresher ) {
        this.query.resetRequests();
        this.bidServiceProvider.listConfirmedDemands(this.query).then(
            data => {
                this.inviteReviews = data.content;
                this.query.covertResponses(data);
                refresher.complete();
            },
            err => refresher.complete()
        );
    }


    doInfinite(infiniteScroll ) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.bidServiceProvider.listConfirmedDemands(this.query).then(
                data => {
                    this.inviteReviews = this.inviteReviews.concat(data.content);
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
