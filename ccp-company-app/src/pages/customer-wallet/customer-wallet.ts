import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {WalletVO} from "../../vo/WalletVO";
import {WithdrawalApply} from "../../domain/WithdrawalApply";
import {PageQuery} from "../../common/PageQuery";
import {TransactionServiceProvider} from "../../providers/transaction-service/transaction-service";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {INIT_WALLET} from "../../app/Constants";

/**
 * Generated class for the CustomerWalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-customer-wallet',
    templateUrl: 'customer-wallet.html',
})
export class CustomerWalletPage {
    query: PageQuery = new PageQuery();
    withdraws: WithdrawalApply[] = [];
    walletVO: WalletVO;

    constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, public companyServiceProvider: CompanyServiceProvider, public transactionServiceProvider: TransactionServiceProvider) {
        this.events.subscribe(INIT_WALLET, data => {
            this.ionViewWillEnter();
        })
    }

    openAlipay() {
        this.navCtrl.push('BindingAlipayPage');
    }

    openWeixin() {
        this.navCtrl.push('BindingWexinPage');
    }

    ionViewWillEnter() {
        this.companyServiceProvider.myWallet(CompanyServiceProvider.getLoginCompany().companyId).then(data => {
            this.walletVO = data;
        })

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CustomerWalletPage');
    }

    openBills() {
        this.navCtrl.push('BillsPage');
    }

    chooseNoneTicket() {
        this.navCtrl.push("PayModalPage")
    }

    applyWithdraw() {
        this.navCtrl.push('ApplyWithdrawPage');
    }

}
