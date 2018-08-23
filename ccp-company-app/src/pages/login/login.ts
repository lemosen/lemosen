import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {FormPage} from "../../common/formPage";
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {INIT_DATA} from "../../app/Constants";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [CustomerServiceProvider]
})
export class LoginPage extends FormPage {

    verifyUrl:string;

    constructor(public viewCtrl:ViewController,public events:Events,public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,
                public companyServiceProvider: CompanyServiceProvider,public toastCtrl:ToastController) {
        super();
    }

    reloadVerifyImage() {
        this.verifyUrl = AppConfig.base + "/customer/getVerify.do?rad=" + Math.random();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    ionViewWillEnter() {
        this.reloadVerifyImage();
    }

    ngOnInit(){
        this.formGroup = this.fb.group({
            account: ["qy", Validators.compose([Validators.required, Validators.minLength(2),Validators.maxLength(32)])],
            password: ["12345678", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(32)])],
            validCode: ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
        });
    }

    openRegister() {
        this.navCtrl.push('RegisterPage', {}, {animate: false});
    }

    openForgetPassword() {
        this.navCtrl.push('ForgetPasswordPage', {}, {animate: false});
    }

    login() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            this.submitted = true;

            this.companyServiceProvider.login(this.formGroup.value.account, this.formGroup.value.password, this.formGroup.value.validCode).then(
                data => {
                    this.toastCtrl.create({message: '登录成功', duration: 1000}).present();
                    this.companyServiceProvider.setLoginCompany(data).then(
                        data => {
                            this.navCtrl.pop();
                            this.events.publish(INIT_DATA);
                        }
                    );
                    this.submitted = false;
                },
                error =>  {
                    this.toastCtrl.create({message: error.error, duration: 1000}).present();
                    this.submitted = false;
                });
        }
    }

}
