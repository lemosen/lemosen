import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormPage} from "../../common/formPage";
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {Author} from "../../domain/Author";
import {BidServiceProvider} from "../../providers/bid-service/bid-service";
import {Demand} from "../../domain/Demand";
import {AppealServiceProvider} from "../../providers/appeal-service/appeal-service";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";

/**
 * Generated class for the AddAppealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-appeal',
    templateUrl: 'add-appeal.html',
})
export class AddAppealPage extends FormPage {

    demands: Demand[] = []

    constructor(public demandServiceProvider:DemandServiceProvider,public alertCtrl: AlertController, public fb: FormBuilder, public toastCtrl: ToastController, public navCtrl: NavController, public bidService: BidServiceProvider, public navParams: NavParams, public customerServiceProvider: CustomerServiceProvider, public appealServiceProvider: AppealServiceProvider) {
        super();
    }

    ngOnInit(): void {
        let author: Author = new Author()
        author.accountName = CompanyServiceProvider.getLoginCompany().accountName;
        this.formGroup = this.fb.group({
            demand: [null, Validators.required],
            company: [CompanyServiceProvider.getLoginCompany()],
            author: [author],
            appealContent: ['', Validators.required],
            appealTitle: ['', Validators.compose([Validators.required, Validators.maxLength(128)])],
        })
        //todo choose demand by companyId
        this.demandServiceProvider.getBidsByCompanyId(CompanyServiceProvider.getLoginCompany().companyId).then(data => {
            if (data != null) {
                data.forEach(bid => {
                    this.demands.push(bid.demand);
                })
            } else {
                this.toastCtrl.create({message: '没有相关任务', duration: 1000}).present();
            }
        })
    }

    onSubmit() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            this.submitted = true;

            this.appealServiceProvider.saveAppeal(this.formGroup.value).then(
                data => {
                    this.toastCtrl.create({message: '操作成功', duration: 1000}).present();
                    this.navCtrl.pop();
                    this.submitted = false;
                },
                error => {
                    this.toastCtrl.create({message: error.error, duration: 1000}).present();
                    this.submitted = false;
                });
        }
    }

    presentDemand() {
        let alert = this.alertCtrl.create();
        alert.setTitle("请选择任务")
        this.demands.forEach(demand => {
            if (demand.check) {
                alert.addInput({
                    value: demand.demandId.toString(),
                    type: 'radio',
                    label: demand.demandName,
                    checked: true,
                });
            } else {
                alert.addInput({
                    value: demand.demandId.toString(),
                    type: 'radio',
                    label: demand.demandName,
                    checked: false,
                });
            }
        })
        alert.addButton({
            text: '确定',
            handler: (value: any) => {
                this.demands.forEach(demand => demand.check = false);
                let demand = this.demands.filter(demand => demand.demandId == value)[0];
                demand.check = true;
                this.formGroup.patchValue({
                    demand: demand
                })
            }
        })
        alert.present();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddAppealPage');
    }

}
