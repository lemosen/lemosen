import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {SecurityForm} from "../../form/SecurityForm";
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {FormPage} from "../../common/formPage";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the UpdateMobilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-update-mobile',
    templateUrl: 'update-mobile.html',
})
export class UpdateMobilePage extends FormPage {

    time: number = 0;

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public customerServiceProvider: CustomerServiceProvider, public companyServiceProvider: CompanyServiceProvider, private fb: FormBuilder) {
        super()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UpdateMobilePage');
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            id: [CompanyServiceProvider.getLoginCompany().companyId, Validators.required],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern(this.phoneReg), Validators.maxLength(11)])],
            msmCode: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.minLength(4)])],
        })

    }

    getVerificationCode() {
        if (this.phoneReg.test(this.formGroup.value.mobile)) {
            let mobile = this.formGroup.value.mobile;
            if (mobile == '') {
                this.toastCtrl.create({message: '请填写手机号', duration: 1000}).present();
            } else {
                this.customerServiceProvider.getVerificationCode(mobile, "UPDATE_MOBILE").then(data => {
                        if (data.result == "SUCCESS") {
                            this.time = 120;
                            this.setInterval();
                            this.toastCtrl.create({message: '发送成功', duration: 1000}).present();
                            this.submitted = false;
                        } else {
                            this.toastCtrl.create({message: data.message, duration: 1000}).present();
                            this.submitted = false;
                        }
                    },
                    error => {
                        this.submitted = false;
                        this.toastCtrl.create({message: error.error, duration: 1000}).present();

                    });
            }
        } else {
            this.toastCtrl.create({message: '不符合输入要求', duration: 1000}).present();
        }
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

    onSubmit() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            let securityForm: SecurityForm = this.formGroup.value;

            this.companyServiceProvider.editMobile(securityForm).then(data => {
                    if (data == 'success') {
                        this.navCtrl.pop();
                        this.toastCtrl.create({message: '注册成功', duration: 1000}).present();
                    }
                },
                error => {
                    this.toastCtrl.create({message: error.error, duration: 1000}).present();

                })
        }
    }
}
