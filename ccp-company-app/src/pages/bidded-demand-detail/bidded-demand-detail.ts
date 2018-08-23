import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {BidServiceProvider} from "../../providers/bid-service/bid-service";
import {Bid} from "../../domain/Bid";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {DemandState} from "../../domain/enums";

/**
 * Generated class for the BiddedDemandDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bidded-demand-detail',
    templateUrl: 'bidded-demand-detail.html',
})
export class BiddedDemandDetailPage {
    bid: Bid;

    constructor(public navCtrl: NavController, public navParams: NavParams, public bidServiceProvider: BidServiceProvider, public customerServiceProvider: CustomerServiceProvider) {
    }

    ionViewWillEnter(){
        this.bidServiceProvider.viewBidded(this.navParams.get('demandId'), CompanyServiceProvider.getLoginCompany().companyId).then(data => {
            this.bid = data;
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiddedDemandDetailPage');
    }
    openReserve(demandId,demandState){
        this.navCtrl.push('BiddedReservesPage',{demandId:demandId,demandState:demandState})
    }

    get demandState(): boolean {
        if (this.bid != null) {
            return this.bid.demand.demandState.toString() == DemandState[DemandState.DRAFT]
                || this.bid.demand.demandState.toString() == DemandState[DemandState.PLATFORM_AUDIT]
                || this.bid.demand.demandState.toString() == DemandState[DemandState.BIDDING]
                || this.bid.demand.demandState.toString() == DemandState[DemandState.BIDDED]
                || this.bid.demand.demandState.toString() == DemandState[DemandState.EDIT_CONTRACT];
        } else {
            console.log("wait")
            return true;
        }

    }

}
