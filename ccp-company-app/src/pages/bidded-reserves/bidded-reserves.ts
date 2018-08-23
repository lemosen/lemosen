import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ContractServiceProvider} from "../../providers/contract-service/contract-service";
import {Contract} from "../../domain/Contract";
import {AppConfig} from "../../app/AppConfig";
import {DemandStateForm} from "../../form/DemandStateForm";
import {DemandState} from "../../domain/enums";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the BiddedReservesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bidded-reserves',
    templateUrl: 'bidded-reserves.html',
})
export class BiddedReservesPage {
    contracts: Contract[] = [];
    imgUrl: string = AppConfig.imgUrl;
    demandState='';

    constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, private contractServiceProvider: ContractServiceProvider) {
        this.demandState=this.navParams.data.demandState;
    }

    ionViewWillEnter(): void {
        this.contractServiceProvider.listContracts(this.navParams.data.demandId).then(data => {
            this.contracts = data;
        })
    }
    onSubmit(state){
        let demandStateForm = new DemandStateForm;
        demandStateForm.demandId=this.navParams.data.demandId;
        demandStateForm.customerId=CompanyServiceProvider.getLoginCompany().companyId;
        demandStateForm.stateInfo='';
        if(state){
            demandStateForm.demandState=DemandState.EXECUTING
        }else {
            demandStateForm.demandState=DemandState.EDIT_CONTRACT
        }
        this.contractServiceProvider.reviewContract(demandStateForm).then(data=>{
                this.navCtrl.pop();
                this.toastCtrl.create({message: data, duration: 2000}).present();

        })
    }

    openContractDetail(contractId) {
        this.navCtrl.push("BiddedReserveDetailPage", {contractId: contractId})
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiddedReservesPage');
    }

}
