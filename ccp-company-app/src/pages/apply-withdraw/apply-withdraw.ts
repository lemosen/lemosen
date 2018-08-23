import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {WalletVO} from "../../vo/WalletVO";
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {WithdrawForm} from "../../form/WithdrawForm";
import {TransactionServiceProvider} from "../../providers/transaction-service/transaction-service";
import {FormPage} from "../../common/formPage";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the ApplyWithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-apply-withdraw',
    templateUrl: 'apply-withdraw.html',
})
export class ApplyWithdrawPage extends FormPage {
    walletVO: WalletVO;

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public customerServiceProvider: CustomerServiceProvider,
                public transactionServiceProvider: TransactionServiceProvider, private fb: FormBuilder) {
        super();

    }

    ngOnInit(): void {

        this.formGroup = this.fb.group({
            debtBalance: ['', Validators.required],
            applyBalance: ['', Validators.required],
            customerId: [CompanyServiceProvider.getLoginCompany().companyId, Validators.required],
            withdrawalAccount: ['', Validators.required],
            detailContent: ['', Validators.compose([Validators.required, Validators.maxLength(512)])]
        })
        this.customerServiceProvider.myWallet(CompanyServiceProvider.getLoginCompany().companyId).then(data => {
            this.walletVO = data;
            this.formGroup.patchValue({
                debtBalance: this.walletVO.debtAccounts,
                applyBalance: this.walletVO.applyAccount
            })
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ApplyWithdrawPage');
    }

    onSubmit() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            let withdrawForm: WithdrawForm = this.formGroup.value;

            this.transactionServiceProvider.designerWithdrawalApply(withdrawForm).then(data => {
                    if (data == 'success') {
                        this.navCtrl.pop();
                        this.toastCtrl.create({message: '申请成功', duration: 1000}).present();
                    }
                    this.submitted = false;
                },
                error => {
                    this.toastCtrl.create({message: error.error, duration: 1000}).present();
                    this.submitted = false;
                })
        }
    }
}
