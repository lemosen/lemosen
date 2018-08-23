import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {Demand} from "../../domain/Demand";
import {ExpertReview} from "../../domain/ExpertReview";
import {DemandStateForm} from "../../form/DemandStateForm";
import {DemandState} from "../../domain/enums";

/**
 * Generated class for the ExecutingDemandDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-executing-demand-detail',
    templateUrl: 'executing-demand-detail.html',
})
export class ExecutingDemandDetailPage {

    demand: Demand;

    expertReviews: ExpertReview[] = []

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider) {
    }

    ngOnInit(): void {

    }

    ionViewWillEnter(){
        this.demandServiceProvider.detail(this.navParams.get('demandId')).then(data => {
            this.demand = data;
        })
        this.refresh();
    }

    refresh() {
        this.demandServiceProvider.getExpertReviews(this.navParams.get('demandId')).then(data => {
            this.expertReviews = data;
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExecutingDemandDetailPage');
    }

    onSubmit(state) {
        let demandStateForm = new DemandStateForm;
        demandStateForm.demandId = this.demand.demandId;
        if (state) {
            demandStateForm.demandState = DemandState.FINISH;

        } else {
            demandStateForm.demandState = DemandState.EXECUTING;
        }
        demandStateForm.stateInfo = '';
        // demandStateForm.customerId=CompanyServiceProvider.getLoginCompany().customerId;
        this.demandServiceProvider.completeDemand(demandStateForm).then(data => {
            if (data == 'commit_complete_demand'||data=='commit_executing') {
                this.toastCtrl.create({message: '提交成功', duration: 1000}).present();
                this.navCtrl.pop();
            }
        }, error => {
            this.toastCtrl.create({message: '提交失败', duration: 1000}).present();
        })


    }
}
