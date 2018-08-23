import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Demand} from "../../domain/Demand";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";

/**
 * Generated class for the DemandDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-demand-detail',
    templateUrl: 'demand-detail.html',
})
export class DemandDetailPage {

    demand: Demand;

    constructor(public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider) {
        this.demandServiceProvider.detail(this.navParams.get('demandId')).then(data => {
            this.demand = data;
        })
    }

    ionViewWillEnter() {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DemandDetailPage');
    }

    createDemandBid(demand) {
        this.navCtrl.push('BidDemandPage',{demand:demand});
    }

}
