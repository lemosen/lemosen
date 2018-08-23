import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PageQuery} from "../../common/PageQuery";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {Demand} from "../../domain/Demand";
import {AppConfig} from "../../app/AppConfig";

/**
 * Generated class for the DemandSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-demand-search',
    templateUrl: 'demand-search.html',
})
export class DemandSearchPage {
    queryName: string = '';
    query: PageQuery = new PageQuery;
    demands:Demand[]=[];
    imgUrl: string = AppConfig.imgUrl;

    constructor(public navCtrl: NavController, public navParams: NavParams,public demandServiceProvider:DemandServiceProvider) {
        this.query.pushParamsRequests('categoryId', null);
        this.query.pushParamsRequests('sort', null);
    }

    search() {
        this.query.pushParamsRequests('queryName',this.queryName);
        this.demandServiceProvider.demands(this.query).then(data => {
            this.demands = data.content;
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DemandSearchPage');
    }

    doRefresh(refresher) {
        this.query.resetRequests();
        this.demandServiceProvider.demands(this.query).then(
            data => {
                this.demands = data.content;
                this.query.covertResponses(data);
                refresher.complete();
            },
            err => refresher.complete()
        );
    }


    doInfinite(infiniteScroll) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.demandServiceProvider.demands(this.query).then(
                data => {
                    this.demands = this.demands.concat(data.content);
                    this.query.covertResponses(data);
                    infiniteScroll.complete();
                },
                err => infiniteScroll.complete()
            );
        } else {
            infiniteScroll.complete();
        }
    }

    openDemandDetail(demandId) {
        this.navCtrl.push('DemandDetailPage', {demandId: demandId});
    }



}
