import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AppConfig} from "../../app/AppConfig";
import {Bid} from "../../domain/Bid";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {WinBidForm} from "../../form/WinBidForm";
import {DemandStateForm} from "../../form/DemandStateForm";
import {DemandState} from "../../domain/enums";

/**
 * Generated class for the DesignerInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-designer-info',
    templateUrl: 'designer-info.html',
})
export class DesignerInfoPage {

    bid: Bid;

    imgUrl: string = AppConfig.imgFace;

    bidNotice:string;

    constructor(public navCtrl: NavController,public toastController:ToastController, public navParams: NavParams,public demandServiceProvider:DemandServiceProvider) {
        this.bid = this.navParams.data.bid;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DesignerInfoPage');
    }


    onSubmit(){
        let winBidForm = new WinBidForm;
        winBidForm.demandId=this.bid.demand.demandId;
        winBidForm.customerId=this.bid.customer.customerId;
        winBidForm.dealCycle=this.bid.bidCycle;
        winBidForm.dealPrice=this.bid.bidPrice;
        winBidForm.bidNotice=this.bidNotice;
        this.demandServiceProvider.winDesignerBid(winBidForm).then(data=>{
            if (data == 'success') {
                this.toastController.create({message:'设置成功',duration:1000}).present();
                this.navCtrl.pop();
            }
        },error=>{
            if (error != 'failure') {
                this.toastController.create({message:error.error,duration:1000}).present();
            }else {
                this.toastController.create({message:'设置失败',duration:1000}).present();
            }
        })
    }

    cancelBid(){
        let demandStateForm=new DemandStateForm();
        demandStateForm.demandState=DemandState.BIDDING;
        demandStateForm.demandId=this.bid.demand.demandId;
        demandStateForm.customerId=this.bid.customer.customerId;
        this.demandServiceProvider.cancelBid(demandStateForm).then(data=>{
            if (data == 'success') {
                this.toastController.create({message:'取消成功',duration:1000}).present();
                this.navCtrl.pop();
            }
        },error=>{
            if (error != 'failure') {
                this.toastController.create({message:error.error,duration:1000}).present();
            }else {
                this.toastController.create({message:'取消失败',duration:1000}).present();
            }
        })
    }

}
