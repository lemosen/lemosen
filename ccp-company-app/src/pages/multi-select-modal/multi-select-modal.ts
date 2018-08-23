import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AppConfig} from "../../app/AppConfig";

/**
 * Generated class for the MultiSelectModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-multi-select-modal',
    templateUrl: 'multi-select-modal.html',
})
export class MultiSelectModalPage {

    title: string = '选择成员';
    choiceItems: any = [];
    imgUrl: string = AppConfig.imgFace;
    items: any = [];
    checkName:string

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        this.items = this.navParams.data.items;
        this.choiceItems = this.navParams.data.select;
        this.checkName=this.navParams.data.checkName;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MultiSelectModalPage');
    }

    goBack() {
        this.viewCtrl.dismiss();
    }

    confirmChose() {
        this.viewCtrl.dismiss(this.choiceItems);
    }

    onChecked(item) {
        if (this.checked(item)) {
            this.choiceItems.splice(this.choiceItems.indexOf(this.checked(item)), 1);
        } else {
            this.choiceItems.push(item);
        }
    }

    checked(item) {
        return this.choiceItems.find(choiceItem => {
            return choiceItem[this.checkName]== item[this.checkName];
        })
    }


}
