import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PageQuery} from "../../common/PageQuery";
import {BidServiceProvider} from "../../providers/bid-service/bid-service";
import {InviteReview} from "../../domain/InviteReview";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the InviteDemandsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-invite-demands',
    templateUrl: 'invite-demands.html',
    providers:[BidServiceProvider]
})
export class InviteDemandsPage {
    query=new PageQuery();
    inviteReviews:InviteReview[]=[];
    imgUrl:string=AppConfig.imgUrl;
    constructor(public navCtrl: NavController, public navParams: NavParams,public bidServiceProvider:BidServiceProvider) {
        this.query.pushParamsRequests('companyId', CompanyServiceProvider.getLoginCompany().companyId);
    }
    ionViewWillEnter(){
        this.initData();
    }

    private initData() {
        this.bidServiceProvider.listInviteDemands(this.query).then(data => {
            this.inviteReviews = data.content;
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InviteDemandsPage');
    }

    openDemandDetail(inviteReview) {
        this.navCtrl.push('InviteDemandDetailPage', {"inviteReview": inviteReview});
    }

    doRefresh(refresher) {
        this.query.resetRequests();
        this.bidServiceProvider.listInviteDemands(this.query).then(
            data => {
                this.inviteReviews = data.content;
                this.query.covertResponses(data);
                refresher.complete();
            },
            err => refresher.complete()
        );
    }


    doInfinite(infiniteScroll) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.bidServiceProvider.listInviteDemands(this.query).then(
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
