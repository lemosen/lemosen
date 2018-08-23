import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SkillServiceProvider} from "../../providers/skill-service/skill-service";
import {CustomerSkillLevel} from "../../domain/CustomerSkillLevel";

/**
 * Generated class for the CustomerSkillDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-customer-skill-detail',
    templateUrl: 'customer-skill-detail.html',
})
export class CustomerSkillDetailPage {

    customerSkillLevel: CustomerSkillLevel;

    constructor(public navCtrl: NavController, public navParams: NavParams, public skillServiceProvider: SkillServiceProvider) {
    }

    ionViewWillEnter() {
        this.initData();
    }

    private initData() {
        this.skillServiceProvider.viewCustomerSkillLevel(this.navParams.data.dslId).then(data => {
            this.customerSkillLevel = data;
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CustomerSkillDetailPage');
    }

}
