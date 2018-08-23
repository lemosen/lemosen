import {Component} from '@angular/core';
import {AlertController, Events, NavController, NavParams, ToastController} from 'ionic-angular';
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {AppConfig} from "../../app/AppConfig";
import {NativeServiceProvider} from "../../providers/native-service/native-service";
import {FileServiceProvider} from "../../providers/file-service/file-service";
import {Company} from "../../domain/Company";
import {INIT_DATA} from "../../app/Constants";

/**
 * Generated class for the CustomerCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-customer-center',
    templateUrl: 'customer-center.html',
    providers: [CompanyServiceProvider]
})
export class CustomerCenterPage {
    company: Company;
    imgUrl: string = AppConfig.imgFace + 'company/';

    constructor(public alertCtrl: AlertController,public fileServiceProvider:FileServiceProvider,public nativeServiceProvider:NativeServiceProvider,public toastCtrl:ToastController,public navCtrl: NavController,
                public events: Events, public navParams: NavParams, public companyServiceProvider: CompanyServiceProvider) {
        this.events.subscribe(INIT_DATA, data => {
            this.ionViewWillEnter();
        })
    }

    ionViewDidLoad() {
    }

    ionViewWillEnter() {
        if (CompanyServiceProvider.isLogin()) {
            this.company = CompanyServiceProvider.getLoginCompany();
            this.companyServiceProvider.myWallet(CompanyServiceProvider.getLoginCompany().companyId).then(data => {
                this.company.totalBalance=data.totalBanlance;
            })
        }
    }

    ionViewDidEnter() {
        this.company = CompanyServiceProvider.getLoginCompany();
    }

    changeAvatar(){
        this.nativeServiceProvider.getPhoto().subscribe(data=>{
            this.fileServiceProvider.uploadFile(data,"/file/uploadCompanyFace.do").then(data=>{
                if (data.result == 'SUCCESS') {
                    this.company.portraitUrl=data.data;
                    this.toastCtrl.create({message:'修改头像成功',duration:1000}).present();
                } else {
                    this.toastCtrl.create({message:'修改头像失败',duration:1000}).present();
                }
            })
        })
    }


    openLogin() {
        this.navCtrl.push('LoginPage');
    }

    openProfile() {
        this.navCtrl.push('EditProfilePage');
    }

    openAuth() {
        this.navCtrl.push('AuthenticationPage');
    }

    openSecurity() {
        this.navCtrl.push('SecurityPage');
    }

    openWallet() {
        this.navCtrl.push('CustomerWalletPage');
    }

    openEvaluates() {
        this.navCtrl.push('EvaluatesPage');
    }

    openAppeals() {
        this.navCtrl.push('AppealsPage');
    }

    openSettings() {
        this.navCtrl.push('SettingsPage');
    }

    openHelp() {
        this.navCtrl.push('HelpCenterPage');
    }

    openSkill() {
        this.navCtrl.push('CustomerSkillPage');
    }

    openAbout() {
        this.navCtrl.push('AboutPage');
    }

    loginOut() {
        let alert = this.alertCtrl.create();
        alert.setTitle("确认退出？");
        alert.addButton({
            text: '确定',
            handler: () => {
                this.companyServiceProvider.loginOut();
                this.navCtrl.push('LoginPage', {}, {animate: false});
            }
        });
        alert.addButton({
            text: '取消',
            handler: () => {
            }
        });
        alert.present();
    }
}
