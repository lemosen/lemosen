import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {Company} from "../../domain/Company";
import {PageQuery} from "../../common/PageQuery";
import {Sms} from "../../../../ccp-app/src/domain/Sms";
import {INIT_DATA} from "../../app/Constants";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    company: Company = null;
    workCounts: any;
    // sms: Sms[] = [];
    query:PageQuery = new PageQuery();
    constructor(public navCtrl: NavController, public companyServiceProvider: CompanyServiceProvider,public events:Events) {
        this.events.subscribe(INIT_DATA,data=>{
            this.ionViewWillEnter();
        })
    }

    ionViewWillEnter() {
        this.company = CompanyServiceProvider.getLoginCompany();
        if(CompanyServiceProvider.isLogin()){
            this.query.pushParamsRequests('accountName', CompanyServiceProvider.getLoginCompany().accountName);
            this.companyServiceProvider.getWorkCounts(this.company.companyId).then(data => {
                this.workCounts = data;
            })
            // this.companyServiceProvider.getSmsByAccountName(this.query).then(data=>{
            //     this.sms = data.content;
            // })
        }
    }

    openAuditDemands() {
        this.navCtrl.push('AuditDemandsPage');
    }
    openBidding() {
        this.navCtrl.push('BiddingDemandsPage');
    }

    openWorks() {
        this.navCtrl.push('WorkDemandsPage');
    }

    openExecuting() {
        this.navCtrl.push('ExecutingDemandsPage');
    }

    openFinished() {
        this.navCtrl.push('FinishedDemandsPage');
    }

    openNotifications() {
        this.navCtrl.push('NotificationsPage');
    }

    openBBS() {
        this.navCtrl.push('TopicsPage');
    }

    openSkill() {
        this.navCtrl.push('ExpertSkillPage');
    }

    openInviteDemands() {
        this.navCtrl.push('InviteDemandsPage');
    }

    openReviewDemands() {
        this.navCtrl.push('ReviewDemandsPage');
    }


}
