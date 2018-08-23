import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppConfig} from "../../app/AppConfig";

/**
 * Generated class for the BindingWexinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-binding-wexin',
  templateUrl: 'binding-wexin.html',
})
export class BindingWexinPage {
    imgUrl:string=AppConfig.imgUrl
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BindingWexinPage');
  }

}
