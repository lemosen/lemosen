import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ContractServiceProvider} from "../../providers/contract-service/contract-service";
import {Author} from "../../domain/Author";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {CHAT_ITEM} from "../../app/Constants";
import {Storage} from "@ionic/storage";
/**
 * Generated class for the CustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-customer-detail',
    templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {

    imgUrl: string = AppConfig.imgFace;

    author: Author;

    constructor(public storage: Storage,public contractService: ContractServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.contractService.getContactUserInfo(this.navParams.get('accountName')).then(author => {
            this.author = author;
        })
    }

    removeContact(){
        this.storage.get(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName).then(chatItems => {
            chatItems.forEach(chatItem => {
                if (chatItem.accountName == this.author.accountName) {
                    chatItems.remove(chatItems.indexOf(chatItem));
                }
            })
            this.storage.set(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName, chatItems);
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CustomerDetailPage');
    }

}
