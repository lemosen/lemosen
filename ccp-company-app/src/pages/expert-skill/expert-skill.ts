import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SkillServiceProvider} from "../../providers/skill-service/skill-service";
import {PageQuery} from "../../common/PageQuery";
import {CustomerSkillLevel} from "../../domain/CustomerSkillLevel";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the ExpertSkillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-expert-skill',
    templateUrl: 'expert-skill.html',
})
export class ExpertSkillPage {

    query: PageQuery = new PageQuery();
    customerSkillLevels: CustomerSkillLevel[] = [];
    imgUrl: string = AppConfig.imgUrl;

    constructor(public navCtrl: NavController, public navParams: NavParams, private skillServiceProvider: SkillServiceProvider) {
        this.query.pushParamsRequests("customerId",CompanyServiceProvider.getLoginCompany().companyId);
    }

    ionViewWillEnter() {
        this.initData();
    }

    private initData() {
        this.skillServiceProvider.listDesignerLevelSkills(this.query).then(data => {
            this.customerSkillLevels = data.content;
        })
    }


    openSkillLevelDetail(dslId) {
        this.navCtrl.push('ExpertSkillDetailPage', {dslId: dslId})
    }

    doRefresh(refresher) {
        this.query.resetRequests();
        this.skillServiceProvider.listDesignerLevelSkills(this.query).then(
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
            this.skillServiceProvider.listDesignerLevelSkills(this.query).then(
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

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExpertSkillPage');
    }

}
