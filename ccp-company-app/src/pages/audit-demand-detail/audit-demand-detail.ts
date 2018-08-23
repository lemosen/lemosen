import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {Demand} from "../../domain/Demand";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";

/**
 * Generated class for the AuditDemandDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audit-demand-detail',
  templateUrl: 'audit-demand-detail.html',
})
export class AuditDemandDetailPage {

  demand: Demand;

  constructor(public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider, public customerServiceProvider: CustomerServiceProvider) {
  }

  ionViewWillEnter(){
    this.demandServiceProvider.detail(this.navParams.get('demandId')).then(data => {
      this.demand = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiddedDemandDetailPage');
  }
  openReserve(demandId,demandState){
    this.navCtrl.push('BiddedReservesPage',{demandId:demandId,demandState:demandState})
  }

  editDemand(demand:Demand){
    this.navCtrl.push('EditDemandPage',{demand:demand})
  }

}
