import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {FormPage} from "../../common/formPage";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {Company} from "../../domain/Company";

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfilePage extends FormPage {
    companyScope: any[] = [{
        itemLabel: "铁路运输设备制造及金属制品加工",
        itemValue: "MANUFACTURINGOFRAILWAYEQUIPMENT",
        check: false
    }, {
        itemLabel: "市轨道交通装备及其零部件的研发",
        itemValue: "RESEARCHOFURBANRAILEQUIPMENT",
        check: false
    }, {
        itemLabel: "铁路机车、客车、城市轨道交通设备的设计",
        itemValue: "DESIGNOFRAILWAYBUSEQUIPMENT",
        check: false
    }, {
        itemLabel: "机车车辆、城市轨道车辆及配件研发、设计",
        itemValue: "URBANRAILVEHICLEANDACCESSORIES",
        check: false
    }];
    gender: any[] = [{
        itemLabel: "男",
        itemValue: "true",
        check: false
    }, {
        itemLabel: "女",
        itemValue: "false",
        check: false
    }];

    company: Company;

    constructor(public alertCtrl: AlertController, public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, private fb: FormBuilder, public companyServiceProvider: CompanyServiceProvider) {
        super();
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            accountName: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9a-zA-Z]*$/g), Validators.minLength(1), Validators.maxLength(32)])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/), Validators.maxLength(64)])],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern(/^0?1[3|4|5|8][0-9]\d{8}$/), Validators.maxLength(11)])],
            companyScope: ['', Validators.required],
            introduce: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
            summary: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
        })
        this.companyServiceProvider.viewCompany(CompanyServiceProvider.getLoginCompany().companyId).then(data => {
            this.company = data;
            this.formGroup.patchValue(data);
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditProfilePage');
    }

    onSubmit() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            let company: Company = CompanyServiceProvider.getLoginCompany();
            company.email = this.formGroup.value.email;
            company.companyScope = this.formGroup.value.companyScope;
            company.introduce = this.formGroup.value.introduce;
            company.summary = this.formGroup.value.summary;
            this.companyServiceProvider.editCompany(company).then(data => {
                    if (data.customerId != 0) {
                        this.navCtrl.pop();
                        this.toastCtrl.create({message: '修改成功', duration: 1000}).present();
                        this.companyServiceProvider.setLoginCompany(data)
                        this.submitted = false;
                    }
                },
                error => {
                    this.toastCtrl.create({message: error.error, duration: 1000}).present();
                    this.submitted = false;
                })
        }
    }

    presentEducation() {
        let alert = this.alertCtrl.create({
            title: '请选择经营范围',
            buttons: [{
                text: '取消',
                handler: data => {
                }
            }, {
                text: '确定',
                handler: data => {
                    this.formGroup.patchValue({companyScope: data})
                }
            }],
        });
        for (let item of this.companyScope) {
            if (item.check) {
                alert.addInput({
                    label: item.itemLabel,
                    type: 'radio',
                    checked: true,
                    value: item.itemValue
                });
            } else {
                alert.addInput({
                    label: item.itemLabel,
                    type: 'radio',
                    value: item.itemValue
                });
            }
        }
        alert.present()
    }

    presentGender() {
        let alert = this.alertCtrl.create({
            title: '请选择性别',
            buttons: [{
                text: '取消',
                handler: data => {
                }
            }, {
                text: '确定',
                handler: data => {
                    this.formGroup.patchValue({gender: data})
                }
            }],
        });
        for (let item of this.gender) {
            if (item.check) {
                alert.addInput({
                    label: item.itemLabel,
                    type: 'radio',
                    checked: true,
                    value: item.itemValue
                });
            } else {
                alert.addInput({
                    label: item.itemLabel,
                    type: 'radio',
                    value: item.itemValue
                });
            }
        }
        alert.present()
    }
}
