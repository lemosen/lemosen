import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormPage} from "../../common/formPage";
import {AppConfig} from "../../app/AppConfig";
import {FormBuilder, Validators} from "@angular/forms";
import {ForgetForm} from "../../form/ForgetForm";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-forget-password',
    templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage extends FormPage {

    verifyUrl: string;

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public fb: FormBuilder, public customerServiceProvider: CompanyServiceProvider) {
        super();
        this.reloadVerifyImage();
    }

    reloadVerifyImage() {
        this.verifyUrl = AppConfig.base + "/customer/getVerify.do?rad=" + Math.random();
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            accountName: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(/(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]/)])],
            figureCode: ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])]
        });
    }

    onSubmit() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            let forgetForm: ForgetForm = this.formGroup.value;
            this.customerServiceProvider.accountChecks(forgetForm).then(data => {
                    if (data == 'success') {
                        this.navCtrl.push('ResetPasswordPage');
                        this.toastCtrl.create({message: '验证成功', duration: 1000}).present();
                        this.submitted = false;
                    }
                },
                error => {
                    this.toastCtrl.create({message: error.error, duration: 1000}).present();
                    this.submitted = false;
                })
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ForgetPasswordPage');
    }

}
