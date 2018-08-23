import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ContractServiceProvider} from "../../providers/contract-service/contract-service";
import {Contract} from "../../domain/Contract";
import {AppConfig} from "../../app/AppConfig";

/**
 * Generated class for the BiddedReserveDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bidded-reserve-detail',
    templateUrl: 'bidded-reserve-detail.html',
})
export class BiddedReserveDetailPage {
    contract: Contract;
    imgUrl:string=AppConfig.imgUrl;

    constructor(public navCtrl: NavController, public navParams: NavParams, private contractServiceProvider: ContractServiceProvider) {
    }

    ngOnInit(): void {
        this.contractServiceProvider.viewContract(this.navParams.data.contractId).then(data => {
            this.contract = data;
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiddedReserveDetailPage');
    }

}
