import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {ForgetForm} from "../../form/ForgetForm";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {AuthorType} from "../../domain/enums";
import {FormPage} from "../../common/formPage";

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-reset-password',
    templateUrl: 'reset-password.html',
})
export class ResetPasswordPage extends FormPage {

    verifyUrl: string;
    time: number = 0;

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, private fb: FormBuilder, public customerServiceProvider: CustomerServiceProvider) {
        super();
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            smsCode: ["", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
            mobile: ["", Validators.compose([Validators.required, Validators.maxLength(11), Validators.minLength(11)])],
            authorType: [AuthorType.COMPANY, Validators.compose([Validators.required])],
            newPassword: ["", Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(8)])],
            rePassword: ["", Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(8)])],
        });
    }

    onSubmit() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            let forgetForm: ForgetForm = this.formGroup.value;
            this.customerServiceProvider.resetPassword(forgetForm).then(data => {
                    if (data == 'success') {
                        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getViews().length - 3));
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

    getVerificationCode() {
        let mobile = this.formGroup.value.mobile;
        this.customerServiceProvider.getVerificationPasswordCode(mobile, "FIND_PASSWORD").then(data => {
                if (data.result == "SUCCESS") {
                    this.time = 120;
                    this.setInterval();
                    this.toastCtrl.create({message: '发送成功', duration: 1000}).present();
                } else {
                    this.toastCtrl.create({message: data.message, duration: 1000}).present();
                }
            },
            error => {
                this.toastCtrl.create({message: error.error, duration: 1000}).present();

            });
    }

    setInterval() {
        let interval = setInterval(() => {
            if (this.time > 0) {
                this.time--;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }

    get message(): string {
        if (this.time == 0) {
            return "获取验证码";
        } else {
            return `${this.time}秒后重新获取`;
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ResetPasswordPage');
    }

}
