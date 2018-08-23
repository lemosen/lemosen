import {Component} from '@angular/core';
import {Events, IonicPage, ModalController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {FileOpener} from "@ionic-native/file-opener";
import {WechatServiceProvider} from "../../providers/wechat-service/wechat-service";
import {PaymentModel, PayType} from "../../domain/PaymentModel";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {Company} from "../../domain/Company";
import {AppAvailability} from "@ionic-native/app-availability";
// import {Alipay} from '@ionic-native/alipay';
import {PayServiceProvider} from "../../providers/pay-service/pay-service";
import {NativeServiceProvider} from "../../providers/native-service/native-service";
import {INIT_WALLET} from "../../app/Constants";

/**
 * Generated class for the PayModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-pay-modal',
    templateUrl: 'pay-modal.html',
})
export class PayModalPage {

    payTypes: any[] = PayType.payTypes;
    paymentModel: PaymentModel = new PaymentModel();

    get company(): Company {
        return CompanyServiceProvider.getLoginCompany();
    };

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public viewCtrl: ViewController, public events: Events,
                private appAvailability: AppAvailability,
                private platform: Platform,
                private payService: PayServiceProvider,
                private modalCtrl: ModalController,
                private nativeService: NativeServiceProvider,
                private fileOpener: FileOpener) {
        this.paymentModel.companyId = this.company.companyId;
        // this.checkWeChatAvailabe();//判断微信是否安装
        // this.checkAliPayAvailabe();//判断支付宝是否安装
    }

    ionViewDidLoad() {
        console.log('进入支付页面');
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    pay(): void {
        const paymentModel = this.paymentModel;//保留提交时的支付信息
        console.info("支付信息", paymentModel);
        if (paymentModel.payedMethod == PayType.ALIPAY) {
            this.payService.alipay(paymentModel).then(
                data => {
                    cordova.plugins.alipay.payment(data, function success(e) {
                            console.log(e);
                        },
                        function error(e) {
                            console.log(e);
                        });
                },
                error => {
                    alert("FAILURE");
                });
        } else if (paymentModel.payedMethod == PayType.WECHAT) {
            this.paymentModel.detailContent = '中车微信支付';
            this.payService.weChatPay2(this.paymentModel, () => {
                    this.events.publish(INIT_WALLET);
                    this.navCtrl.pop();
                },
                error => {
                    alert(error);
                });
        } else if (paymentModel.payedMethod == PayType.UNIONPAY) {
            this.payService.unionpay(this.company.accountName, this.paymentModel.transactionPrice + "").then(data => {
                let profileModal = this.modalCtrl.create('UnionpayPage', {payLogId: data.payLogId});
                profileModal.present();
                profileModal.onDidDismiss(data => {
                    if (data.payed) {
                        this.events.publish(INIT_WALLET)
                        this.navCtrl.pop();
                    }
                })
            })
        }

    }

    checkWeChatAvailabe(): void {
        let weChat;

        if (this.platform.is('ios')) {
            weChat = 'weixin://';

            this.appAvailability.check(weChat).then(value => {
                this.payTypes[2].disabled = !value;
                this.payTypes[2].display = value;
                this.defaultSelect();
            });
        } else if (this.platform.is('android')) {
            // weChat = 'com.tencent.mm';
            this.fileOpener.appIsInstalled("com.tencent.mm").then(res => {
                if (res.status === 0) {
                    this.payTypes[2].disabled = true;
                    this.payTypes[2].display = false;
                } else {
                    console.log('微信未安装.')
                }
            })
        }
    }

    checkAliPayAvailabe(): void {
        let alipay;

        if (this.platform.is('ios')) {
            alipay = 'alipay://';

            this.appAvailability.check(alipay).then(value => {
                this.payTypes[3].disabled = !value;
                this.payTypes[3].display = value;
                this.defaultSelect();
            });
        } else if (this.platform.is('android')) {
            // alipay = 'com.eg.android.AlipayGphone';
            this.fileOpener.appIsInstalled("com.eg.android.AlipayGphone").then(res => {
                if (res.status === 0) {
                    this.payTypes[3].disabled = true;
                    this.payTypes[3].display = false;
                } else {
                    console.log('支付宝未安装.')
                }
            })
        }
    }

    defaultSelect(): void {
        // // this.payTypes[3].disabled = true;
        // // this.payTypes[3].display = false;
        // const canSelected = this.payTypes.filter(item => !item.disabled);
        // if (canSelected.length > 0) {
        //     this.paymentModel.payType = canSelected[0].payType;
        // } else {
        //     this.paymentModel.payType = null;
        // }
    }

}
