import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Expert} from "../../domain/Expert";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {AppConfig} from "../../app/AppConfig";

/**
 * Generated class for the ExpertInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-expert-info',
    templateUrl: 'expert-info.html',
})
export class ExpertInfoPage {
    expert: Expert;
    imgUrl: string = AppConfig.imgUrl;
    showSkillLevels: string = '';
    cancel: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider, public toastController: ToastController) {

    }

    ngOnInit(): void {
        this.expert = this.navParams.get("expert");
        this.cancel = this.navParams.get("cancel");
        this.expert.skillLevels.forEach(skillLevel => {
            this.showSkillLevels += skillLevel.levelName + '  '
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExpertInfoPage');
    }

    onSubmit() {
        this.demandServiceProvider.inviteExperts(this.navParams.get("demandId"), this.expert.customerId).then(data => {
            if (data.result == 'SUCCESS') {
                this.toastController.create({message: '操作成功', duration: 1000}).present();
                this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getViews().length - 3));
            } else {
                this.toastController.create({message: data.message, duration: 1000}).present();
            }
        }, error => {
            if (error != 'FAILURE') {
                this.toastController.create({message: error.error, duration: 1000}).present();
            } else {
                this.toastController.create({message: '操作失败', duration: 1000}).present();
            }
        })
    }

    onCancel() {
        this.demandServiceProvider.removeInviteExpert(this.navParams.get("demandId"), this.expert.customerId).then(data => {
                this.toastController.create({message: data, duration: 1000}).present();
                this.navCtrl.pop();
        },error=>{
            this.toastController.create({message: error.error, duration: 1000}).present();
        })
    }
}
