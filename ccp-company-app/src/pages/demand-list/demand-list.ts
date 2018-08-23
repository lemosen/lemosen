import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {PageQuery} from "../../common/PageQuery";
import {Demand} from "../../domain/Demand";
import {DemandCategory} from "../../domain/DemandCategory";
import {AppConfig} from "../../app/AppConfig";

/**
 * Generated class for the DemandListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-demand-list',
    templateUrl: 'demand-list.html',
    providers: [DemandServiceProvider]
})
export class DemandListPage {
    sort: any[] = [{
        itemLabel: "中标时间",
        itemValue: "time",
        check:false
    }, {
        itemLabel: "价格",
        itemValue: "price",
        check:false
    }, {
        itemLabel: "周期",
        itemValue: "cycle",
        check:false
    }, {
        itemLabel: "截止时间",
        itemValue: "abort",
        check:false
    }];
    query = new PageQuery();
    demands: Demand[] = [];
    categories: DemandCategory[] = []
    imgUrl: string = AppConfig.imgUrl;

    constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider) {
        this.demandServiceProvider.listDemandCategories().then(data => {
            this.categories = data
        })
        this.query.pushParamsRequests('categoryId', null);
        this.query.pushParamsRequests('sort', null);
    }

    ionViewWillEnter() {
        this.query.resetRequests();
        this.presentFilter();
    }

    private presentFilter() {
        this.demandServiceProvider.demands(this.query).then(data => {
            this.demands = data.content;
        })
    }

    presentCategory() {
        let alert = this.alertCtrl.create({
            title: '请选择类别',
            buttons: [{
                text: '取消',
                handler: data => {
                }
            }, {
                text: '确定',
                handler: data => {
                    console.log(data)
                    this.query.pushParamsRequests('categoryId', data);
                    this.presentFilter();
                    this.categories.forEach(category => category.check = false);
                    this.categories.filter(category => data == category.categoryId)[0].check = true;
                    // this.addCategory(data);
                }
            }],
        });
        for (let item of this.categories) {
            if (item.check) {
                alert.addInput({
                    label: item.categoryName,
                    type: 'radio',
                    checked: true,
                    value: item.categoryId.toString()
                });
            } else {
                alert.addInput({
                    label: item.categoryName,
                    type: 'radio',
                    value: item.categoryId.toString()
                });
            }
        }
        alert.present()
    }

    presentSortOrder() {
        let alert = this.alertCtrl.create({
            title: '请选择排序',
            buttons: [{
                text: '取消',
                handler: data => {
                }
            }, {
                text: '确定',
                handler: data => {
                    console.log(data)
                    this.query.pushParamsRequests('sort', data);
                    this.presentFilter();
                    this.sort.forEach(sort => sort.check = false);
                    this.sort.filter(sort => data == sort.itemValue)[0].check = true;
                    // this.addCategory(data);
                }
            }],
        });
        for (let item of this.sort) {
            if (item.check) {
                alert.addInput({
                    label: item.itemLabel,
                    type: 'radio',
                    checked: true,
                    value: item.itemValue
                });
            } else {
                alert.addInput({
                    label: item.itemLabel,
                    type: 'radio',
                    value: item.itemValue
                });
            }
        }
        alert.present()
    }
    presentClear(){
        this.query.resetRequests();
        this.query.pushParamsRequests('categoryId', null);
        this.query.pushParamsRequests('sort', null);
        this.presentFilter();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DemandListPage');
    }

    openDemandDetail(demandId) {
        this.navCtrl.push('DemandDetailPage', {demandId: demandId});
    }

    openSearch() {
        this.navCtrl.push('DemandSearchPage');
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


}
