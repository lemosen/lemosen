import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {BidServiceProvider} from "../../providers/bid-service/bid-service";
import {InviteReview} from "../../domain/InviteReview";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the InviteDemandDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-invite-demand-detail',
    templateUrl: 'invite-demand-detail.html',
})
export class InviteDemandDetailPage {
    inviteReview:InviteReview;

    ionViewDidLoad() {
        console.log('ionViewDidLoad InviteDemandDetailPage');
    }

    constructor(public navCtrl: NavController, public navParams: NavParams, public bidServiceProvider: BidServiceProvider,public toastCtrl:ToastController) {
        this.inviteReview=this.navParams.get('inviteReview');
    }

    ngOnInit(): void {
        this.bidServiceProvider.viewDemandDetail(this.inviteReview.demandId).then(data => {
            this.inviteReview.demand = data;
        })
    }

    onSubmit(state){
        if(state){
            this.bidServiceProvider.joinInviteDemand(this.inviteReview.demand.demandId,CompanyServiceProvider.getLoginCompany().companyId).then(data=>{
                this.toastCtrl.create({message: '加入成功', duration: 1000}).present();
                this.navCtrl.pop();
            })
        }else {
            this.bidServiceProvider.refuseInviteDemand(this.inviteReview.demand.demandId,CompanyServiceProvider.getLoginCompany().companyId).then(data=>{
                this.toastCtrl.create({message: '拒绝成功', duration: 1000}).present();
                this.navCtrl.pop();
            })
        }
    }

}
