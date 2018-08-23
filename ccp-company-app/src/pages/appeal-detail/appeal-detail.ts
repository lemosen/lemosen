import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Appeal} from "../../domain/Appeal";
import {AppealServiceProvider} from "../../providers/appeal-service/appeal-service";
import {AppConfig} from "../../app/AppConfig";

/**
 * Generated class for the AppealDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appeal-detail',
  templateUrl: 'appeal-detail.html',
})
export class AppealDetailPage {
  appeal:Appeal;
    imgUrl:string=AppConfig.imgUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,public appealServiceProvider:AppealServiceProvider) {
  }

  ionViewWillEnter(){
    this.appealServiceProvider.viewAppeal(this.navParams.get('appealId')).then(data => {
      this.appeal = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppealDetailPage');
  }

}
