import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {Demand} from "../../domain/Demand";

/**
 * Generated class for the FinishedDemandDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-finished-demand-detail',
    templateUrl: 'finished-demand-detail.html',
})
export class FinishedDemandDetailPage {

    demand: Demand;

    score: any = {
        star: 0,
        starMap: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ]
    }
    expertEnabled:boolean=false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider, public customerServiceProvider: CustomerServiceProvider) {
    }

    ionViewWillEnter() {
        this.demandServiceProvider.detail(this.navParams.get('demandId')).then(data => {
            this.demand = data;
            this.expertEnabled= false;
            this.score.star = this.demand.overallComment;
                this.demand.inviteEvaluates.forEach(inviteEvaluate => {
                    if (!inviteEvaluate.hasComment) {
                        this.expertEnabled= true;
                    }
                })
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FinishedDemandDetailPage');
    }

    evaluate(demand, type) {
        if (type == 'design') {
            this.navCtrl.push('AddEvaluatePage', {demand: demand})
        } else if (type == 'export') {
            this.navCtrl.push('AddEvaluatePage', {demand: demand, isExpert: true})
        }
    }
}
