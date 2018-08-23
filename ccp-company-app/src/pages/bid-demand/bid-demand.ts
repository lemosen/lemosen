import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Demand} from "../../domain/Demand";
import {FormBuilder, Validators} from "@angular/forms";
import {Bid} from "../../domain/Bid";
import {BidServiceProvider} from "../../providers/bid-service/bid-service";
import {Customer} from "../../domain/Customer";
import {NativeServiceProvider} from "../../providers/native-service/native-service";
import {FormPage} from "../../common/formPage";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the BidDemandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bid-demand',
    templateUrl: 'bid-demand.html',
})
export class BidDemandPage extends FormPage {
    demand: Demand;


    constructor(public navCtrl: NavController, public toastCtrl: ToastController, private nativeServiceProvider: NativeServiceProvider, private fb: FormBuilder, public navParams: NavParams, private bidServiceProvider: BidServiceProvider) {
        super();
        this.demand = this.navParams.data.demand;
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            bidPrice: [1000, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(7)])],
            bidCycle: [1, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(3)])],
            detailInfo: ['', Validators.compose([Validators.required,Validators.maxLength(1024)])]
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BidDemandPage');
    }

    submitBid() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            let bid: Bid = new Bid;
            bid.bidCycle = this.formGroup.value.bidCycle;
            bid.bidPrice = this.formGroup.value.bidPrice;
            bid.detailInfo = this.formGroup.value.detailInfo;
            bid.demand = new Demand;
            bid.demand.demandId = this.demand.demandId;
            bid.customer = new Customer;
            bid.customer.customerId = CompanyServiceProvider.getLoginCompany().companyId;
            this.bidServiceProvider.designerBid(bid).then(data => {
                    if (data == 'success') {
                        this.navCtrl.pop();
                        this.toastCtrl.create({message: '提交成功', duration: 1000}).present();
                    }
                    this.submitted = false;
                },
                error => {
                    this.toastCtrl.create({message: error.error, duration: 1000}).present();
                    this.submitted = false;
                })
        }
    }
}
