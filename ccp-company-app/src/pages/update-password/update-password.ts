import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {SecurityForm} from "../../form/SecurityForm";
import {FormPage} from "../../common/formPage";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the UpdatePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-update-password',
    templateUrl: 'update-password.html',
})
export class UpdatePasswordPage extends FormPage {


    constructor(public navCtrl: NavController, public navParams: NavParams, public companyServiceProvider: CompanyServiceProvider, private fb: FormBuilder, public toastCtrl: ToastController) {
        super();
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            id: [CompanyServiceProvider.getLoginCompany().companyId, Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(8)])],
            newPassword: ['', Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(8)])],
            rePassword: ['', Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(8)])]
        })
    }

    onSubmit() {
        if (this.formGroup.value.newPassword == this.formGroup.value.rePassword) {
            if (this.submitted) {
                return;
            }
            if (this.formGroup.valid) {
                let securityForm: SecurityForm = this.formGroup.value;
                this.companyServiceProvider.editPassWord(securityForm).then(data => {
                        if (data == 'success') {
                            this.navCtrl.pop();
                            this.toastCtrl.create({message: '修改成功', duration: 1000}).present();
                            this.submitted = false;
                        }
                    },
                    error => {
                        this.toastCtrl.create({message: error.error, duration: 1000}).present();
                        this.submitted = false;

                    })
            }
        } else {
            this.toastCtrl.create({message: '两次密码不一致', duration: 1000}).present();
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UpdatePasswordPage');
    }

}
