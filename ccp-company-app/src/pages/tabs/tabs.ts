import {Component} from '@angular/core';

import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {CustomerCenterPage} from "../customer-center/customer-center";
import {DemandListPage} from "../demand-list/demand-list";
import {AlertController, NavController} from "ionic-angular";
import {NativeServiceProvider} from "../../providers/native-service/native-service";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = DemandListPage;
    tab3Root = ContactPage;
    tab4Root = CustomerCenterPage;


    constructor(public navCtrl: NavController ,public nativeServiceProvider:NativeServiceProvider,public alertCtrl: AlertController ,private companyServiceProvider: CompanyServiceProvider) {
        this.companyServiceProvider.initLoginSession();
    }

    tabChanged(event){
        if(event.tabTitle!="发现"){
            if(!CompanyServiceProvider.isLogin()){
                this.nativeServiceProvider.showToast("请先登录!",1000);
                this.navCtrl.push('LoginPage',{}, {animate: false});
            }
        }
    }
}
