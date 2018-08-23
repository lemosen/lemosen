import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {SkillServiceProvider} from "../../providers/skill-service/skill-service";
import {CustomerSkillLevel} from "../../domain/CustomerSkillLevel";
import {PageQuery} from "../../common/PageQuery";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the ListSkillRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-list-skill-record',
    templateUrl: 'list-skill-record.html',
})
export class ListSkillRecordPage {

    customerSkillLevels: CustomerSkillLevel[] = [];
    query: PageQuery = new PageQuery();

    constructor(public navCtrl: NavController, public navParams: NavParams, public customerServiceProvider: CustomerServiceProvider, public skillServiceProvider: SkillServiceProvider) {
        this.query.pushParamsRequests('companyId', CompanyServiceProvider.getLoginCompany().companyId);
    }

    ionViewWillEnter() {
        this.initData();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ListSkillRecordPage');
    }

    private initData() {
        this.query.resetRequests();

        this.skillServiceProvider.listCustomerSkillLevels(this.query).then(data => {
            this.customerSkillLevels = data.content;
            this.query.covertResponses(data);
        })
    }

    openSkillLevelDetail(dslId) {
        this.navCtrl.push('CustomerSkillDetailPage', {dslId: dslId})
    }

    addSkill() {
        this.navCtrl.push('AddCustomerSkillPage')
    }

    doRefresh(refresher) {
        this.query.resetRequests();
        this.skillServiceProvider.listCustomerSkillLevels(this.query).then(
            data => {
                this.customerSkillLevels = data.content;
                this.query.covertResponses(data);
                refresher.complete();
            },
            err => refresher.complete()
        );
    }


    doInfinite(infiniteScroll) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.skillServiceProvider.listCustomerSkillLevels(this.query).then(
                data => {
                    this.customerSkillLevels = this.customerSkillLevels.concat(data.content);
                    this.query.covertResponses(data);
                    infiniteScroll.complete();
                },
                err => infiniteScroll.complete()
            );
        } else {
            infiniteScroll.complete();
        }
    }
}
