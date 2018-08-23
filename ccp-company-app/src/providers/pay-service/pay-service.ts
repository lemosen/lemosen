import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PaymentModel, WechatPay} from "../../domain/PaymentModel";
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";

/*
  Generated class for the PayServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PayServiceProvider extends HttpService {

    constructor(public http: HttpClient, public alertCtrl: AlertController) {
        super(http, alertCtrl);
    }

    /**
     * 银联支付接口
     * @param {string} authorName
     * @param {string} transactionPrice
     * @returns {Promise<any>}
     */
    unionpay(authorName: string,transactionPrice:string): Promise<any> {
        const params = new HttpParams().set("authorName", authorName).set("transactionPrice", transactionPrice);
        return this.get('/pay/addPayLog.do',params);
    }

    /**
     * 查询银联支付是否成功
     * @param {string} payLogId
     * @returns {Promise<any>}
     */
    unionpayPayed(payLogId: string): Promise<any> {
        const params = new HttpParams().set("payLogId", payLogId);
        return this.get('/pay/unionpayPayed.do',params);
    }

    /**
     * 微信支付接口
     * @param {PaymentModel} paymentModel
     * @returns {Promise<any>}
     */
    weChatPay(paymentModel: PaymentModel): Promise<WechatPay> {
        return this.post('/pay/weixinPay.do',JSON.stringify(paymentModel));
    }

    /**
     * 微信支付
     * @param params
     * @param onSuccess
     * @param onError
     */
    sendWechatPaymentRequest(params, onSuccess, onError){
        if (typeof window.Wechat === "undefined") {
            alert("设备上没有安装微信！");
            return false;
        }

        window.Wechat.sendPaymentRequest(params, onSuccess, onError);

        return true;
    }

    weChatPay2(paymentModel: PaymentModel, onSuccess, onError): Promise<any> {
        return this.post('/pay/weixinPay.do',JSON.stringify(paymentModel)).then(params=>{
            if (params) {
                if (typeof window.Wechat === "undefined") {
                    alert("设备上没有安装微信！");
                    return false;
                }
                window.Wechat.sendPaymentRequest(params, onSuccess, onError);
            }
        },erroe=>{
            console.log('system error');
            // alert('system error');
        });
    }

    /**
     * 微信分享
     * @param params
     * @param onSuccess
     * @param onError
     * @returns {boolean}
     */
    wechatShare(params, onSuccess, onError) {
        if (typeof window.Wechat === "undefined") {
            alert("设备上没有安装微信！");
            return false;
        }
        window.Wechat.share(params, onSuccess, onError);
        return true;
    }

    /**
     * 阿里支付接口
     * @param paymentModel
     */
    alipay(paymentModel: PaymentModel): Promise<any> {
        return this.post('/pay/alipay.do',JSON.stringify(paymentModel));
    }
}
