import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SkillServiceProvider} from "../../providers/skill-service/skill-service";
import {CustomerSkillLevel} from "../../domain/CustomerSkillLevel";
import {FormBuilder} from "@angular/forms";
import {SkillLevelState} from "../../domain/enums";
import {NativeServiceProvider} from "../../providers/native-service/native-service";
import {Customer} from "../../domain/Customer";
import {Expert} from "../../domain/Expert";

/**
 * Generated class for the ExpertSkillDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-expert-skill-detail',
    templateUrl: 'expert-skill-detail.html',
})
export class ExpertSkillDetailPage {
    customerSkillLevel: CustomerSkillLevel;
    certificationInfo:string;

    constructor(public nativeServiceProvider: NativeServiceProvider, public navCtrl: NavController, public fb: FormBuilder, public navParams: NavParams, public alertCtrl: AlertController, public skillServiceProvider: SkillServiceProvider) {
    }

    ionViewWillEnter() {
        this.initData();
    }

    private initData() {
        this.skillServiceProvider.viewCustomerSkillLevel(this.navParams.data.dslId).then(data => {
            this.customerSkillLevel = data;
            this.certificationInfo=this.customerSkillLevel.certificationInfo;
        })
    }

    alertChoose() {
        let alert = this.alertCtrl.create({
                title: '选择鉴定级别',
                buttons: [{
                    text: '合格',
                    handler: () => {
                        this.customerSkillLevel.excellent = false;
                    }
                },
                    {
                        text: '优秀',
                        handler: () => {
                            this.customerSkillLevel.excellent = true;
                        }
                    }
                ]
            })
        ;
        alert.present();
    }

    onSubmit(pass: boolean) {
        if (pass) {
            this.customerSkillLevel.skillLevelState = SkillLevelState.CERTIFICATION
        } else {
            this.customerSkillLevel.skillLevelState = SkillLevelState.CERTIFICATION_FAILURE
        }
        let customerSkillLevel: CustomerSkillLevel = new CustomerSkillLevel;
        customerSkillLevel.dslId = this.customerSkillLevel.dslId;
        customerSkillLevel.skillLevelState = this.customerSkillLevel.skillLevelState;
        customerSkillLevel.customer = new Customer;
        customerSkillLevel.expert = new Expert;
        customerSkillLevel.expert.customerId = this.customerSkillLevel.expert.customerId;
        customerSkillLevel.customer.customerId = this.customerSkillLevel.customer.customerId;
        customerSkillLevel.excellent = this.customerSkillLevel.excellent;
        customerSkillLevel.certificationInfo = this.certificationInfo;
        this.skillServiceProvider.certifyDesignerLevelSkill(customerSkillLevel).then(data => {
            if (data == 'success') {
                this.nativeServiceProvider.showToast("鉴定成功！")
                this.navCtrl.pop();
            } else {
                this.nativeServiceProvider.showToast("鉴定失败！")
            }
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CustomerSkillDetailPage');
    }

    showButton():boolean{
        if(this.customerSkillLevel==null){
            return false;
        }else {
            return this.customerSkillLevel.skillLevelState==SkillLevelState.TOBE_CERTIFIED||this.customerSkillLevel.skillLevelState==SkillLevelState.APPLY;
        }
    }
}
