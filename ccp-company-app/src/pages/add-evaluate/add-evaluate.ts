import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormPage} from "../../common/formPage";
import {FormBuilder, Validators} from "@angular/forms";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {InviteReview} from "../../domain/InviteReview";
import {Expert} from "../../domain/Expert";

/**
 * Generated class for the AddEvaluatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-evaluate',
    templateUrl: 'add-evaluate.html',
})
export class AddEvaluatePage extends FormPage {
    isExpert: boolean = false;
    invites: InviteReview[] = [];
    selectExpert: Expert;

    constructor(public alertCtrl: AlertController, public demandService: DemandServiceProvider, public fb: FormBuilder, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public demandServiceProvider: DemandServiceProvider) {
        super();
        if (this.navParams.get('isExpert')) {
            this.isExpert = this.navParams.get('isExpert');
        }
    }

    starMark: any = {
        star: 0,
        starMap: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ]
    };
    attitude: any = {
        star: 0,
        starMap: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ]
    };
    responsibility: any = {
        star: 0,
        starMap: [
            '1',
            '2',
            '3',
            '4',
            '5',
        ]
    }

    chooseStar(e, type) {
        let star = parseInt(e.target.dataset.index);
        if (type == 'starMark') {
            this.starMark.star = star;
            this.formGroup.patchValue({
                starMark: star
            })
        }
        if (type == 'attitude') {
            this.attitude.star = star;
            this.formGroup.patchValue({
                attitude: star
            })
        }
        if (type == 'responsibility') {
            this.responsibility.star = star;
            this.formGroup.patchValue({
                responsibility: star
            })
        }

    }

    ngOnInit(): void {
        if (this.isExpert) {
            this.formGroup = this.fb.group({
                demand: [this.navParams.data.demand, Validators.required],
                customerId: [],
                starMark: [0, Validators.compose([Validators.required, Validators.maxLength(1)])],
                attitude: [0, Validators.compose([Validators.required, Validators.maxLength(1)])],
                responsibility: [0, Validators.compose([Validators.required, Validators.maxLength(1)])],
                evaluateContent: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
            })
        } else {
            this.formGroup = this.fb.group({
                demand: [this.navParams.data.demand, Validators.required],
                companyId: [CompanyServiceProvider.getLoginCompany().companyId],
                starMark: [0, Validators.compose([Validators.required, Validators.maxLength(1)])],
                attitude: [0, Validators.compose([Validators.required, Validators.maxLength(1)])],
                responsibility: [0, Validators.compose([Validators.required, Validators.maxLength(1)])],
                evaluateContent: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
            })
        }
        this.demandService.getInviteExpert(this.navParams.get('demand').demandId).then(data => {
            if (data != null) {
                this.invites = data;
                this.invites.forEach(invite => {
                    invite.check = false;
                })
            }
        })
    }

    onSubmit() {
        if(this.isExpert&&this.selectExpert){
            this.toastCtrl.create({message: '请选择专家', duration: 1000}).present();
            return;
        }
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            this.submitted = true;
            if (this.isExpert) {
                this.demandService.saveExpertEvaluate(this.formGroup.value).then(
                    data => {
                        this.toastCtrl.create({message: '评价成功', duration: 1000}).present();
                        this.navCtrl.pop();
                        this.submitted = false;
                    },
                    error => {
                        this.toastCtrl.create({message: error.error, duration: 1000}).present();
                        this.submitted = false;
                    });
            } else {
                this.demandServiceProvider.saveDesignerEvaluate(this.formGroup.value).then(
                    data => {
                        this.toastCtrl.create({message: '评价成功', duration: 1000}).present();
                        this.navCtrl.pop();
                        this.submitted = false;
                    },
                    error => {
                        this.toastCtrl.create({message: error.error, duration: 1000}).present();
                        this.submitted = false;
                    });
            }
        }
    }

    chooseExport() {
        let alert = this.alertCtrl.create();
        alert.setTitle("请选择专家")
        this.invites.forEach(invite => {
            if (!invite.hasComment) {
                if (invite.check) {
                    alert.addInput({
                        value: invite.expert.customerId.toString(),
                        type: 'radio',
                        label: invite.expert.customerName,
                        checked: true,
                    });
                } else {
                    alert.addInput({
                        value: invite.expert.customerId.toString(),
                        type: 'radio',
                        label: invite.expert.customerName,
                        checked: false,
                    });
                }
            }
        })
        alert.addButton({
            text: '确定',
            handler: (value: any) => {
                if (this.invites.length != 0 && value) {
                    this.invites.forEach(invite => invite.check = false);
                    let invite = this.invites.filter(invite => invite.expert.customerId == value)[0];
                    if (invite) {
                        invite.check = true;
                    }
                    this.selectExpert = invite.expert;
                    this.formGroup.patchValue({
                        customerId: value
                    })
                }
            }
        })
        alert.present();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddEvaluatePage');
    }

}
