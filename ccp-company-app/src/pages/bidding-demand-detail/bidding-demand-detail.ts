import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Bid} from "../../domain/Bid";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {Demand} from "../../domain/Demand";
import {AppConfig} from "../../app/AppConfig";
import {PageQuery} from "../../common/PageQuery";
import {InviteReview} from "../../domain/InviteReview";
import {DemandState, InviteState} from "../../domain/enums";

/**
 * Generated class for the BiddingDemandDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bidding-demand-detail',
    templateUrl: 'bidding-demand-detail.html',
})
export class BiddingDemandDetailPage {
    imgUrl: string = AppConfig.imgFace;
    demand: Demand;
    invites: InviteReview[] = [];
    bids: Bid[] = [];
    winBid: Bid = null;
    query: PageQuery = new PageQuery;


    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider) {
        this.query.pushParamsRequests('demandId', this.navParams.get('demandId'));
    }

    ngOnInit(): void {
        this.demandServiceProvider.detail(this.navParams.get('demandId')).then(data => {
            this.demand = data;
            if (this.demand.demandState.toString() == DemandState[DemandState.EDIT_CONTRACT]) {
                this.toastCtrl.create({message: '请到网页端创建合同', duration: 1000}).present();
            }
        })
        this.query.resetRequests();
        this.demandServiceProvider.listDemandBids(this.query).then(data => {
            this.bids = data.content;
        })
        this.demandServiceProvider.getWinBid(this.navParams.get('demandId')).then(data => {
            if (data != null) {
                this.winBid = data;
            }
        }).catch(e => {
            console.log('没人中标')
        })
        this.demandServiceProvider.getInviteExpert(this.navParams.get('demandId')).then(data => {
            if (data != null) {
                this.invites = data;
            }
        })
    }

    ionViewWillEnter() {
        this.demandServiceProvider.detail(this.navParams.get('demandId')).then(data => {
            this.demand = data;
        })
        this.query.resetRequests();
        this.demandServiceProvider.listDemandBids(this.query).then(data => {
            this.bids = data.content;
        })
        this.demandServiceProvider.getWinBid(this.navParams.get('demandId')).then(data => {
            if (data != null) {
                this.winBid = data;
            }
        }).catch(e => {
            console.log('没人中标')
        })
        this.demandServiceProvider.getInviteExpert(this.navParams.get('demandId')).then(data => {
            if (data != null) {
                this.invites = data;
            }
        })
    }

    get showAddExpert(): boolean {
        if (this.demand && this.demand.demandState.toString() != DemandState[DemandState.BIDDING]) {
            return true;
        }
        return false
    }

    inviteInfo(invite: InviteReview) {

        this.navCtrl.push('ExpertInfoPage', {demandId: this.demand.demandId, expert: invite.expert, cancel: invite.inviteState.toString() != InviteState[InviteState.JOIN]});
    }


    refresh() {
        this.query.resetRequests();
        this.demandServiceProvider.listDemandBids(this.query).then(data => {
            this.bids = data.content;
            this.query.covertResponses(data);
        })
    }

    doInfinite(infiniteScroll) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.demandServiceProvider.listDemandBids(this.query).then(
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

    get demandState(): boolean {
        if (this.demand != null) {
            return this.demand.demandState.toString() == DemandState[DemandState.DRAFT]
                || this.demand.demandState.toString() == DemandState[DemandState.PLATFORM_AUDIT]
                || this.demand.demandState.toString() == DemandState[DemandState.BIDDING]
                || this.demand.demandState.toString() == DemandState[DemandState.BIDDED]
                || this.demand.demandState.toString() == DemandState[DemandState.EDIT_CONTRACT];
        } else {
            console.log("wait")
            return true;
        }

    }

    openReserve(demandId, demandState) {
        this.navCtrl.push('BiddedReservesPage', {demandId: demandId, demandState: demandState})
    }

    designerInfo(bid: Bid) {
        this.navCtrl.push('DesignerInfoPage', {bid: bid});
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiddingDemandDetailPage');
    }

    addExpert(demand) {
        this.navCtrl.push('InviteExpertsPage', {demand: demand});
    }
}
