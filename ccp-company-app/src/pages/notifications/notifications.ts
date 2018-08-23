import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PageQuery} from "../../common/PageQuery";
import {Notification} from "../../domain/Notification";
import {NotificationServiceProvider} from "../../providers/notification-service/notification-service";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-notifications',
    templateUrl: 'notifications.html',
    providers:[NotificationServiceProvider]
})
export class NotificationsPage {

    dynamicNotices: Notification[] = [];


    query: PageQuery = new PageQuery;

    constructor(public navCtrl: NavController, public navParams: NavParams,public notificationServiceProvider:NotificationServiceProvider) {
        this.query.pushParamsRequests("accountName",'qy')
        /*CompanyServiceProvider.getLoginCompany().accountName*/
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NotificationsPage');
    }
    ionViewWillEnter(){
        this.initData();
    }

    private initData() {
        this.query.resetRequests();
        this.notificationServiceProvider.listNotifications(this.query).then(data => {
            this.dynamicNotices = data.content;
        })
    }


    doRefresh(refresher) {
        this.query.resetRequests();
        this.notificationServiceProvider.listNotifications(this.query).then(
            data => {
                this.dynamicNotices = data.content;
                this.query.covertResponses(data);
                refresher.complete();
            },
            err => refresher.complete()
        );
    }


    doInfinite(infiniteScroll) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.notificationServiceProvider.listNotifications(this.query).then(
                data => {
                    this.dynamicNotices = this.dynamicNotices.concat(data.content);
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
