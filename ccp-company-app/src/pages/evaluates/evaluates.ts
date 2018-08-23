import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PageQuery} from "../../common/PageQuery";
import {CustomerEvaluate} from "../../domain/CustomerEvaluate";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the EvaluatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-evaluates',
    templateUrl: 'evaluates.html',
})
export class EvaluatesPage {
    query = new PageQuery();
    customerEvaluates: CustomerEvaluate[] = [];
    imgUrl: string = AppConfig.imgUrl;

    constructor(public navCtrl: NavController, public navParams: NavParams, public companyServiceProvider: CompanyServiceProvider) {
        this.query.pushParamsRequests('companyId', CompanyServiceProvider.getLoginCompany().companyId);
    }

    ionViewWillEnter() {
        this.query.resetRequests();
        this.companyServiceProvider.comment(this.query).then(data => {
            this.customerEvaluates = data.content;
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EvaluatesPage');
    }

}
