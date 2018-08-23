import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormPage} from "../../common/formPage";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {FormBuilder, Validators} from "@angular/forms";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the BindingAlipayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-binding-alipay',
    templateUrl: 'binding-alipay.html',
})
export class BindingAlipayPage extends FormPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public customerServiceProvider: CustomerServiceProvider,public toastCtrl: ToastController,private fb: FormBuilder) {
        super();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BindingAlipayPage');
    }

    ngOnInit ():void{
        this.formGroup = this.fb.group({
            alipayAccount: ['', Validators.compose([Validators.required, Validators.pattern(/^0?1[3|4|5|8][0-9]\d{8}$/), Validators.maxLength(11)])],
        })
        this.customerServiceProvider.viewCustomer(CompanyServiceProvider.getLoginCompany().companyId).then(data => {
            this.formGroup.patchValue(data);
        });

    }

    onSubmit() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            // let customer: Company = CompanyServiceProvider.getLoginCompany();
            // this.customerServiceProvider.bingAlipayAccount(customer.customerId,this.formGroup.value.alipayAccount).then(data => {
            //         if (data.customerId != 0) {
            //             this.navCtrl.pop();
            //             this.toastCtrl.create({message: '绑定成功', duration: 1000}).present();
            //             this.submitted = false;
            //         }
            //     },
            //     error => {
            //         this.toastCtrl.create({message: error.error, duration: 1000}).present();
            //         this.submitted = false;
            //     })
        }
    }
}
