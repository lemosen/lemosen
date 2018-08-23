export class PayType {
    static readonly UNIONPAY: string = "UNIONPAY";
    static readonly WECHAT: string = "WECHAT";
    static readonly ALIPAY: string = "ALIPAY";
    static readonly payTypes: string[] = [PayType.UNIONPAY, PayType.WECHAT, PayType.ALIPAY];
}


export class PaymentModel {

    companyId: number = 0;

    payedMethod: string = '';//支付方式

    transactionPrice: number = 1;

    detailContent: string = '';

    constructor() {

    }
}

export class WechatPay {
    partnerid: string = ''; // merchant id
    prepayid: string = ''; // prepay id
    noncestr: string = ''; // nonce
    timestamp: string = ''; // timestamp
    sign: string = ''; // signed string

    constructor() {

    }
}