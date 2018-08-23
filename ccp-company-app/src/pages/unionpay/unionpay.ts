import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AppConfig} from "../../app/AppConfig";
import {DomSanitizer} from "@angular/platform-browser";
import {PayServiceProvider} from "../../providers/pay-service/pay-service";

/**
 * Generated class for the UnionpayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-unionpay',
    templateUrl: 'unionpay.html',
})
export class UnionpayPage {
    url: any = '';
    interval: any;

    constructor(public payService: PayServiceProvider, public viewCtrl: ViewController, public navCtrl: NavController, private domSanitizer: DomSanitizer, public navParams: NavParams) {
    }

    ngOnInit(): void {
        this.interval = setInterval(() => {
            //轮询后台接口查询订单状态
            this.payService.unionpayPayed(this.navParams.data.payLogId).then(data => {
                if (data != null && data.payed) {
                    this.destroy()
                    this.viewCtrl.dismiss({payed: true})
                }
            })
        }, 800);
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(AppConfig.imgURL + '/company/appUnionpay.htm?payLogId=' + this.navParams.data.payLogId);
    }

    destroy() { // 清除定时器
        clearInterval(this.interval);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UnionpayPage');
    }

    goBack() {
        this.viewCtrl.dismiss({payed: false})
        this.destroy()
    }

}
