import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {FormBuilder, Validators} from "@angular/forms";
import {Customer} from "../../domain/Customer";
import {RegisterForm} from "../../form/RegisterForm";
import {FormPage} from "../../common/formPage";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage extends FormPage {
    customer: Customer;

    time: number = 0;

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public companyServiceProvider: CompanyServiceProvider,
                public customerServiceProvider: CustomerServiceProvider, private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            accountName: ['', Validators.compose([Validators.required, Validators.pattern(/(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]/), Validators.minLength(2), Validators.maxLength(32)])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/), Validators.maxLength(64)])],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern(/^0?1[3|4|5|8][0-9]\d{8}$/), Validators.maxLength(11)])],
            msmCode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
            rePassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])]
        })

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    getVerificationCode() {
        let mobile = this.formGroup.value.mobile;
        this.customerServiceProvider.getVerificationCode(mobile, "REGISTER").then(data => {
                if (data.result == "SUCCESS") {
                    this.time = 120;
                    this.setInterval();
                    this.toastCtrl.create({message: '发送成功', duration: 1000}).present();
                    this.submitted = false;
                } else {
                    this.toastCtrl.create({message: data.message, duration: 1000}).present();
                }
            },
            error => {
                this.toastCtrl.create({message: error.error, duration: 1000}).present();
                this.submitted = false;
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

    onSubmit() {
        if (this.formGroup.value.rePassword != this.formGroup.value.password) {
            this.toastCtrl.create({message: '两次密码不一致', duration: 1000}).present();
        } else {
            if (this.submitted) {
                return;
            }
            if (this.formGroup.valid) {
                let registerForm: RegisterForm = this.formGroup.value;

                this.companyServiceProvider.registerCompany(registerForm).then(data => {
                        if (data == 'success') {
                            this.navCtrl.pop();
                            this.toastCtrl.create({message: '注册成功', duration: 1000}).present();
                            this.companyServiceProvider.setLoginCompany(data)
                        } else {
                            this.toastCtrl.create({message: data, duration: 1000}).present();
                        }
                    },
                    error => {
                        this.toastCtrl.create({message: error.error, duration: 1000}).present();

                    })
            }
        }
    }

}
