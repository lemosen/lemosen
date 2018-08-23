import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PageQuery} from "../../common/PageQuery";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {Expert} from "../../domain/Expert";
import {AppConfig} from "../../app/AppConfig";

/**
 * Generated class for the InviteExpertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-invite-experts',
    templateUrl: 'invite-experts.html',
})
export class InviteExpertsPage {
    query: PageQuery = new PageQuery();
    experts: Expert[] = [];
    imgUrl: string = AppConfig.imgUrl;

    constructor(public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider) {
        this.query.pushParamsRequests('demandId', this.navParams.get('demand').demandId);
    }

    ionViewWillEnter() {
        this.query.resetRequests();
        this.demandServiceProvider.listExperts(this.query).then(data => {
            this.experts = data.content;
            this.query.covertResponses(data);
        })
    }

    doRefresh(refresher) {
        this.query.resetRequests();
        this.demandServiceProvider.listExperts(this.query).then(
            data => {
                this.experts = data.content;
                this.query.covertResponses(data);
                refresher.complete();
            },
            err => refresher.complete()
        );
    }


    doInfinite(infiniteScroll) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.demandServiceProvider.listExperts(this.query).then(
                data => {
                    this.experts = this.experts.concat(data.content);
                    this.query.covertResponses(data);
                    infiniteScroll.complete();
                },
                err => infiniteScroll.complete()
            );
        } else {
            infiniteScroll.complete();
        }
    }

    expertInfo(expert:Expert){
        this.navCtrl.push('ExpertInfoPage', {"expert": expert,"demandId":this.navParams.get('demand').demandId});
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad InviteExpertsPage');
    }

}
