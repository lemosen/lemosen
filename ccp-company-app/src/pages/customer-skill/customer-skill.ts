import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SkillServiceProvider} from "../../providers/skill-service/skill-service";
import {CustomerSkillLevel} from "../../domain/CustomerSkillLevel";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the CustomerSkillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-customer-skill',
    templateUrl: 'customer-skill.html',
})
export class CustomerSkillPage {
    customerSkillLevels: CustomerSkillLevel[] = []

    constructor(public navCtrl: NavController, public navParams: NavParams, public skillServiceProvider: SkillServiceProvider) {
    }

    ionViewWillEnter() {
        this.initData();
    }

    private initData() {
        this.skillServiceProvider.listCustomerSkillLevelsPass(CompanyServiceProvider.getLoginCompany().companyId).then(data => {
            this.customerSkillLevels = data;
        })
    }


    openSkillLevelDetail(dslId) {
        this.navCtrl.push('CustomerSkillDetailPage', {dslId: dslId})
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad CustomerSkillPage');
    }

    listSkill() {
        this.navCtrl.push('ListSkillRecordPage')
    }
}
