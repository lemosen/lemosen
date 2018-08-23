import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppealServiceProvider} from "../../providers/appeal-service/appeal-service";
import {PageQuery} from "../../common/PageQuery";
import {AppConfig} from "../../app/AppConfig";
import {Appeal} from "../../domain/Appeal";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the AppealsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appeals',
  templateUrl: 'appeals.html',
})
export class AppealsPage {
  query=new PageQuery();
  appeals:Appeal[]=[];
  imgUrl:string=AppConfig.imgUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,public appealServiceProvider:AppealServiceProvider,public customerServiceProvider:CustomerServiceProvider) {
    this.query.pushParamsRequests('companyId', CompanyServiceProvider.getLoginCompany().companyId);
  }

  ionViewWillEnter(){
    this.query.resetRequests();
    this.appealServiceProvider.listCompanyAppeals(this.query).then(data=>{
      this.appeals=data.content;
      this.query.covertResponses(data);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppealsPage');
  }

  openAppeal(appealId){
    this.navCtrl.push('AppealDetailPage', {"appealId": appealId});
  }

  doRefresh(refresher ) {
    this.query.resetRequests();
    this.appealServiceProvider.listCompanyAppeals(this.query).then(
        data => {
          this.appeals = data.content;
          this.query.covertResponses(data);
          refresher.complete();
        },
        err => refresher.complete()
    );
  }


  doInfinite(infiniteScroll ) {
    if (!this.query.isLast()) {
      this.query.plusPage();
      this.appealServiceProvider.listCompanyAppeals(this.query).then(
          data => {
            this.appeals = this.appeals.concat(data.content);
            this.query.covertResponses(data);
            infiniteScroll.complete();
          },
          err => infiniteScroll.complete()
      );
    } else {
      infiniteScroll.complete();
    }
  }

    addAppeal(){
        this.navCtrl.push('AddAppealPage')
    }
}
