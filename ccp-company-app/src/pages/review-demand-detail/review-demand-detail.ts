import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Demand} from "../../domain/Demand";
import {BidServiceProvider} from "../../providers/bid-service/bid-service";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";

/**
 * Generated class for the ReviewDemandDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-demand-detail',
  templateUrl: 'review-demand-detail.html',
})
export class ReviewDemandDetailPage {
  demand:Demand;
  constructor(public navCtrl: NavController, public navParams: NavParams, public bidServiceProvider: BidServiceProvider, public customerServiceProvider: CustomerServiceProvider) {
  }

  ionViewWillEnter(){
    this.bidServiceProvider.viewDemandDetail(this.navParams.get('demandId')).then(data => {
      this.demand = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewDemandDetailPage');
  }

}
